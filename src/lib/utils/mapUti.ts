import { districts, stations } from '$lib/stores/mapData';
import maplibregl from 'maplibre-gl';
import { z } from 'zod';

export function getPopupHtml({ title, content }: { title: string; content: string }) {
	const isDifferent = title.toLowerCase().trim() !== content.toLowerCase().trim();
	return `
    <div class="flex flex-col relative">
      <h3 class="font-bold">${title}</h3>
      ${isDifferent ? `<p>${titleCase(content)}</p>` : ``}
    </div>
  `;
}

function titleCase(str: string) {
	return str
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

export function initMap({
	defaultLat,
	defaultLng,
	defaultZoom,
	style
}: {
	defaultLat: number;
	defaultLng: number;
	defaultZoom: number;
	style: maplibregl.StyleSpecification;
}) {
	style.sources.openmaptiles = {
		type: 'vector',
		tiles: [`${location.origin}/openmaptiles/{z}/{x}/{y}.pbf`],
		maxzoom: 14
	};

	const bounds: maplibregl.LngLatBoundsLike = [
		[7.090650277147461, 51.400616267063896],
		[7.826598237576263, 51.61374377792475]
	];

	return new maplibregl.Map({
		container: 'map',
		style,
		center: { lng: defaultLng, lat: defaultLat },
		zoom: defaultZoom,
		maxBounds: bounds,
		attributionControl: false
	});
}

function addWmsLayer({
	hour,
	layerType,
	map
}: {
	hour: string | number;
	layerType?: string | null;
	map: maplibregl.Map;
}) {
	const validatedLayerType = getValidatedLayerType({ layerType });
	const layerId = getWMSLayerId({ layerType: validatedLayerType, hour });
	const sourceId = `${layerId}-source`;
	const newTilesURL = `http://34.175.150.40:8080/geoserver/RUBochum/wms?service=WMS&version=1.1.0&request=GetMap&layers=RUBochum%3AUTCI_pytherm_3m_v0.6.0_2024_177_${hour}&bbox={bbox-epsg-3857}&width=768&height=703&srs=EPSG%3A3857&styles=&format=image%2Fpng%3B%20mode%3D8bit&transparent=true`;

	if (!map.getSource(sourceId)) {
		try {
			map.addSource(sourceId, {
				type: 'raster',
				tiles: [newTilesURL],
				tileSize: 256
			});
		} catch (error) {
			console.warn(`Error adding source and layer for layerId: ${layerId}. Skipping...`, error);
		}
	}

	if (!map.getLayer(layerId)) {
		try {
			map.addLayer({
				id: layerId,
				type: 'raster',
				source: sourceId,
				paint: {}
			});
		} catch (error) {
			console.warn(`Error adding source and layer for layerId: ${layerId}. Skipping...`, error);
		}
	}
}

export function addWmsLayers({ map }: { map: maplibregl.Map }) {
	LayerTypesSchema.options.forEach((layerType) => {
		Array.from(Array(24)).forEach((_, idx) => {
			addWmsLayer({ hour: idx, layerType, map });
		});
	});
}
export function setLayerVisibility({
	layerId,
	visible,
	map
}: {
	layerId: string;
	visible: boolean;
	map: maplibregl.Map;
}) {
	if (!map.getLayer(layerId)) return;
	try {
		map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none');
	} catch (error) {
		console.warn(`Error setting layer visibility for layerId: ${layerId}. Skipping...`, error);
	}
}

const LayerTypesSchema = z.enum(['utci', 'utci_category', 'pet', 'mrt']);
export type LayerType = z.infer<typeof LayerTypesSchema>;

const PagesWithMapSchema = z.enum(['thermal-comfort', 'measurements']);
export type PageWithMapType = z.infer<typeof PagesWithMapSchema>;

function hideAllWMSLayers({ map, layerType }: { map: maplibregl.Map; layerType: LayerType }) {
	Array.from(Array(24)).forEach((_, idx) => {
		setLayerVisibility({
			layerId: getWMSLayerId({ layerType, hour: idx }),
			map,
			visible: false
		});
	});
}

function hideStationsLayer({ map }: { map: maplibregl.Map }) {
	setLayerVisibility({
		layerId: 'stations',
		map,
		visible: false
	});
}

function hideAllLayers({ map }: { map: maplibregl.Map }) {
	LayerTypesSchema.options.forEach((layerType) => hideAllWMSLayers({ map, layerType }));
	hideStationsLayer({ map });
}

function showLayer({ layerId, map }: { layerId: string; map: maplibregl.Map }) {
	hideAllLayers({ map });
	setLayerVisibility({ layerId, map, visible: true });
}

export function updateLayersVisibilityByPage({
	map,
	page,
	visibleLayerType = 'utci',
	hour = '12'
}: {
	map: maplibregl.Map;
	page?: string | null;
	visibleLayerType?: string | null;
	hour?: string | number;
}) {
	const validatedPage = getValidatedPage({ page });
	const validatedLayerType = getValidatedLayerType({ layerType: visibleLayerType });

	if (validatedPage === 'thermal-comfort') {
		showLayer({ layerId: getWMSLayerId({ layerType: validatedLayerType, hour }), map });
	} else {
		showLayer({ layerId: 'stations', map });
	}
}

function getWMSLayerId({ layerType, hour }: { layerType: LayerType; hour: string | number }) {
	const paddedHour = `${hour}`.padStart(2, '0');
	return `wms-${layerType}-${paddedHour}`;
}

function getValidatedPage({ page = 'thermal-comfort' }: { page?: string | null }) {
	const parsedPage = PagesWithMapSchema.safeParse(page);
	return parsedPage.success ? parsedPage.data : 'thermal-comfort';
}

function getValidatedLayerType({ layerType = 'utci' }: { layerType?: string | null }) {
	const parsedLayerType = LayerTypesSchema.safeParse(layerType);
	return parsedLayerType.success ? parsedLayerType.data : 'utci';
}

export function addDistrictsLayer({ map }: { map: maplibregl.Map }) {
	map.addSource('districts', {
		type: 'geojson',
		data: districts
	});
	map.addLayer({
		id: 'districts',
		source: 'districts',
		type: 'line',
		paint: {
			'line-color': 'black',
			'line-width': 0.5
		}
	});
}

export function addStationsLayer({ map }: { map: maplibregl.Map }) {
	map.addSource('stations', {
		type: 'geojson',
		data: stations
	});
	map.addLayer({
		id: 'stations',
		source: 'stations',
		type: 'circle',
		paint: {
			'circle-radius': 3
		}
	});
}

export function cleanupMap({
	map,
	layerIds,
	sourceIds,
	onCleanupComplete = () => {}
}: {
	map: maplibregl.Map;
	layerIds: string[];
	sourceIds: string[];
	onCleanupComplete?: () => void;
}) {
	layerIds.forEach((layerId) => {
		if (map.getLayer(layerId)) {
			map.removeLayer(layerId);
		}
	});

	sourceIds.forEach((sourceId) => {
		if (map.getSource(sourceId)) {
			map.removeSource(sourceId);
		}
	});

	onCleanupComplete();
}

export function getAllPopups(mp: maplibregl.Map) {
	return stations.features.reduce((acc, station) => {
		const stationId = station.properties.id;
		const popup = new maplibregl.Popup({
			closeButton: false,
			closeOnClick: false,
			closeOnMove: false,
			focusAfterOpen: true
		});
		popup.setLngLat(station.geometry.coordinates as maplibregl.LngLatLike);
		popup.setHTML(
			getPopupHtml({ title: station.properties.Label, content: station.properties.Strasse })
		);
		popup.addTo(mp);
		popup.addClassName('!hidden');
		acc.set(stationId, popup);
		return acc;
	}, new Map<string, maplibregl.Popup>());
}

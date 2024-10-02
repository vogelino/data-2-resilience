import { stations } from '$lib/stores/mapData';
import type { RawStationMetadata } from '$lib/utils/api';
import { json } from '@sveltejs/kit';

export function GET() {
	return json({
		data: stations.features.map(
			(station) =>
				({
					name: station.properties.id,
					long_name: station.properties.Label,
					station_type: Math.random() > 0.5 ? 'biomet' : 'temprh',
					latitude: station.geometry.coordinates[1],
					longitude: station.geometry.coordinates[0],
					altitude: Math.random() * 3000,
					district: station.properties.Strasse,
					lcz: Math.random() * 10
				}) satisfies RawStationMetadata
		)
	});
}

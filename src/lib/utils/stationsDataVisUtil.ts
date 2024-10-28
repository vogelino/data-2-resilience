import type { TranslationFunctions } from '$i18n/i18n-types';
import type { StationsGeoJSONType } from '$lib/stores/mapData';

export function isNoStationSupported({
	ids,
	unsupportedIds
}: {
	ids: string[];
	unsupportedIds: string[];
}) {
	return ids.length === unsupportedIds.length;
}

export function getMessageForUnsupportedStations({
	ids,
	unsupportedIds,
	LL,
	unit,
	stations
}: {
	ids: string[];
	unsupportedIds: string[];
	LL: TranslationFunctions;
	unit: string;
	stations: StationsGeoJSONType['features'];
}) {
	if (unsupportedIds.length === 0) return null;
	const noneSupportedData = isNoStationSupported({ ids, unsupportedIds });
	const unitLongLabel =
		LL.pages.measurements.unitSelect.units[
			unit as keyof typeof LL.pages.measurements.unitSelect.units
		].label();
	const unsupportedDataStations = stations
		.filter((f) => unsupportedIds.includes(f.properties.id))
		.sort((a, b) => a.properties.longName.localeCompare(b.properties.longName));
	if (noneSupportedData) {
		return LL.pages.measurements.allUnsupportedStations({
			unit: unitLongLabel
		});
	}
	if (unsupportedIds.length === 1) {
		return LL.pages.measurements.singleUnsupportedStation({
			unit: unitLongLabel,
			station: unsupportedDataStations[0].properties.longName
		});
	}
	return LL.pages.measurements.someUnsupportedStations({
		unit: unitLongLabel,
		stations: unsupportedDataStations.map(({ properties }) => properties.longName).join(', ')
	});
}

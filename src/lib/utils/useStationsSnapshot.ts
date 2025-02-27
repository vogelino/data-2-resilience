import type { StationsGeoJSONType } from '$lib/stores/mapData';
import { useStations } from '$lib/stores/stationsStore';
import { dayEndDate, hour, hourKey, scale, unitWithMinMaxAvg } from '$lib/stores/uiStore';
import { addHours, format, isFuture, setHours } from 'date-fns';
import { derived, type Readable } from 'svelte/store';
import { api } from './api';
import type { WeatherMeasurementKey } from './schemas';

export type SnapshotDataType = {
	[key: string]: number | string;
	id: string;
};

const date = derived([dayEndDate, hour], ([endDate, h]) => setHours(endDate, h));

const dateKey = derived(
	[date, scale],
	([d, s]) => date && (s === 'hourly' ? d.toISOString() : format(d, 'yyyy-MM-dd'))
);

let ids: undefined | ReturnType<typeof useStations>;
let config:
	| undefined
	| Readable<{
			queryKey: (string | number | undefined)[];
			queryFn: () => Promise<SnapshotDataType[]>;
			enabled: boolean;
	  }>;

export function useStationsSnapshotConfig({
	initialStationIds = [],
	stations
}: {
	initialStationIds?: string[];
	stations: StationsGeoJSONType
}) {
	ids = typeof ids === 'undefined' ? useStations({ initialStationIds, stations }) : ids;
	if (config) return config;
	config = derived(
		[unitWithMinMaxAvg, scale, date, dateKey, hourKey],
		([unitWithMinMaxAvgVal, scaleVal, dateVal, dateKeyVal, hourKeyVal]) => {
			return {
				queryKey: [
					'stations-snapshot',
					dateKeyVal,
					unitWithMinMaxAvgVal,
					scaleVal,
				],
				queryFn: async () => {
					if (!dateVal || !unitWithMinMaxAvgVal || !scaleVal) return [];
					const timeZoneOffsetInHours = dateVal.getTimezoneOffset() / 60;
					const dateWithHour = addHours(`${format(dateVal, 'yyyy-MM-dd')}T${String(hourKeyVal || 0).padStart(2, '0')}:00:00.000Z`, timeZoneOffsetInHours);
					if (typeof hourKeyVal !== 'undefined') {
						if (isFuture(dateWithHour)) return [];
					}
					const itemResults = await api().getStationsSnapshot({
						date: new Date(dateWithHour),
						param: unitWithMinMaxAvgVal as unknown as WeatherMeasurementKey,
						scale: scaleVal
					});
					return ((itemResults || []) as SnapshotDataType[]).filter((s) => {
						const station = stations.features.find((f) => f.properties.id === s.id);
						return !!station;
					});
				},
				enabled: Boolean(dateVal && unitWithMinMaxAvgVal)
			};
		}
	);
	return config;
}

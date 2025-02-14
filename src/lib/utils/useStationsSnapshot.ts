import { useStations } from '$lib/stores/stationsStore';
import { dayEndDate, hour, hourKey, scale, unitWithMinMaxAvg } from '$lib/stores/uiStore';
import { format, isFuture, setHours, setMinutes } from 'date-fns';
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

export function useStationsSnapshotConfig(initialStationIds: string[] = []) {
	ids = typeof ids === 'undefined' ? useStations(initialStationIds) : ids;
	if (config) return config;
	config = derived(
		[ids, unitWithMinMaxAvg, scale, date, dateKey, hourKey],
		([idsVal, unitWithMinMaxAvgVal, scaleVal, dateVal, dateKeyVal, hourKeyVal]) => {
			return {
				queryKey: [
					'stations-snapshot',
					idsVal.join('-'),
					dateKeyVal,
					unitWithMinMaxAvgVal,
					scaleVal
				],
				queryFn: async () => {
					if (!dateVal || !unitWithMinMaxAvgVal || !scaleVal) return [];
					if (hourKeyVal) {
						const dateWithTime = setMinutes(setHours(dateVal, hourKeyVal - 1), 0);
						if (isFuture(dateWithTime)) return [];
					}
					const itemResults = await api().getStationsSnapshot({
						date: dateVal,
						param: unitWithMinMaxAvgVal as unknown as WeatherMeasurementKey,
						scale: scaleVal
					});
					return (itemResults || []) as SnapshotDataType[];
				},
				enabled: Boolean(idsVal.length > 0 && dateVal && unitWithMinMaxAvgVal)
			};
		}
	);
	return config;
}

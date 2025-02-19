import { useStations } from '$lib/stores/stationsStore';
import { dayEndDate, hour, hourKey, scale, unitWithMinMaxAvg } from '$lib/stores/uiStore';
import { format, isFuture, setHours } from 'date-fns';
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
		[unitWithMinMaxAvg, scale, date, dateKey, hourKey],
		([unitWithMinMaxAvgVal, scaleVal, dateVal, dateKeyVal, hourKeyVal]) => {
			return {
				queryKey: [
					'stations-snapshot',
					dateKeyVal,
					unitWithMinMaxAvgVal,
					scaleVal
				],
				queryFn: async () => {
					if (!dateVal || !unitWithMinMaxAvgVal || !scaleVal) return [];
					const dateWithHour = `${format(dateVal, 'yyyy-MM-dd')}T${String(hourKeyVal || 0).padStart(2, '0')}:00:00.000Z`
					if (hourKeyVal) {
						if (isFuture(dateWithHour)) return [];
					}
					const itemResults = await api().getStationsSnapshot({
						date: new Date(dateWithHour),
						param: unitWithMinMaxAvgVal as unknown as WeatherMeasurementKey,
						scale: scaleVal
					});
					console.log({ hourKeyVal, itemResults })
					return (itemResults || []) as SnapshotDataType[];
				},
				enabled: Boolean(dateVal && unitWithMinMaxAvgVal)
			};
		}
	);
	return config;
}

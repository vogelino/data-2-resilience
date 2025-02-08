import { useStations } from '$lib/stores/stationsStore';
import { dayEndDate, hour, scale, unitWithMinMaxAvg } from '$lib/stores/uiStore';
import { format, setHours } from 'date-fns';
import { derived } from 'svelte/store';
import { api } from './api';
import type { WeatherMeasurementKey } from './schemas';

const ids = useStations();

const date = derived([dayEndDate, hour], ([endDate, h]) => setHours(endDate, h));

const dateKey = derived(
	[date, scale],
	([d, s]) => date && (s === 'hourly' ? d.toISOString() : format(d, 'yyyy-MM-dd'))
);

export const stationsSnapshotQueryConfig = derived(
	[ids, unitWithMinMaxAvg, scale, date, dateKey],
	([idsVal, unitWithMinMaxAvgVal, scaleVal, dateVal, dateKeyVal]) => {
		return {
			queryKey: ['stations-snapshot', idsVal.join('-'), dateKeyVal, unitWithMinMaxAvgVal, scaleVal],
			queryFn: async () => {
				if (!dateVal || !unitWithMinMaxAvgVal || !scaleVal) return [];
				const itemResults = await api().getStationsSnapshot({
					date: dateVal,
					param: unitWithMinMaxAvgVal as unknown as WeatherMeasurementKey,
					scale: scaleVal
				});
				return itemResults || [];
			},
			enabled: Boolean(idsVal.length > 0 && dateVal && unitWithMinMaxAvgVal)
		};
	}
);

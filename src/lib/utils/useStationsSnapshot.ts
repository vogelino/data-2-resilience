import type { StationsGeoJSONType } from '$lib/stores/mapData';
import { useStations } from '$lib/stores/stationsStore';
import {
	datavisType,
	dayEndDate,
	hour,
	hourKey,
	rangeEndDate,
	scale,
	unitWithMinMaxAvg
} from '$lib/stores/uiStore';
import { endOfDay, format, setHours } from 'date-fns';
import { derived, type Readable } from 'svelte/store';
import { api } from './api';
import { limitDateBoundsToToday } from './dateUtil';
import type { WeatherMeasurementKey } from './schemas';

export type SnapshotDataType = {
	[key: string]: number | string;
	id: string;
};

const date = derived(
	[dayEndDate, rangeEndDate, hour, datavisType],
	([endDate, rangeEndD, h, type]) => (type === 'range' ? endOfDay(rangeEndD) : setHours(endDate, h))
);

const dateKey = derived(
	[date, scale, datavisType],
	([d, s, dvt]) =>
		date && (s === 'hourly' && dvt !== 'range' ? d.toISOString() : format(d, 'yyyy-MM-dd'))
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
	stations: StationsGeoJSONType;
}) {
	ids = typeof ids === 'undefined' ? useStations({ initialStationIds, stations }) : ids;
	if (config) return config;
	config = derived(
		[unitWithMinMaxAvg, scale, date, dateKey, hourKey, datavisType],
		([unitWithMinMaxAvgVal, scaleVal, dateVal, dateKeyVal, hourKeyVal, datavisTypeVal]) => {
			return {
				queryKey: ['stations-snapshot', dateKeyVal, unitWithMinMaxAvgVal, scaleVal],
				queryFn: async () => {
					if (!dateVal || !unitWithMinMaxAvgVal || !scaleVal || !datavisTypeVal) return [];
					const dateWithHour = limitDateBoundsToToday({
						date: dateVal,
						hour: datavisTypeVal !== 'range' ? hourKeyVal : 23
					});
					const itemResults = await api().getStationsSnapshot({
						date: dateWithHour,
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

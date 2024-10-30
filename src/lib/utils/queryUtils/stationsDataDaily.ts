import { createQuery } from '@tanstack/svelte-query';
import { addDays, format } from 'date-fns';
import { api } from '../api';
import type { WeatherMeasurementKeyNoMinMax } from '../schemas';
import { type StationsGeoJSONType } from './../../stores/mapData';

export type DataRecord = {
	id: string;
	label: string;
	value: number | undefined;
	supported: boolean;
};

export function useDailyStationsData({
	ids: unsortedIds = [],
	date,
	unit,
	stations
}: {
	ids?: string[];
	date: Date | undefined;
	unit: string;
	stations: StationsGeoJSONType;
}) {
	const ids = unsortedIds.filter(Boolean).toSorted();
	const dateKey = date && format(date, 'yyyy-MM-dd');
	return createQuery({
		queryKey: ['stationsData-daily', ids.join('-'), dateKey, unit],
		queryFn: async () => {
			if (ids.length === 0 || !date || !unit) return [];
			const promises = ids.map(async (id) => {
				if (ids.length === 0 || !date || !unit) return;
				const startDate = addDays(date, -1).toISOString();
				const endDate = date?.toISOString() || '';
				const itemResults = await api().getStationData({
					id,
					start_date: startDate,
					end_date: endDate,
					param: unit as unknown as WeatherMeasurementKeyNoMinMax,
					scale: 'daily'
				});
				const label =
					stations.features.find((f) => f.properties.id === id)?.properties.longName || id;
				if (itemResults === null) {
					return {
						id,
						label,
						value: undefined,
						supported: false
					};
				}
				const i = itemResults[0];
				return {
					id,
					label,
					value: i ? (i[unit as keyof typeof i] as unknown as number) : undefined,
					supported: true
				};
			});

			const results = await Promise.all(promises);
			return results as DataRecord[];
		},
		enabled: Boolean(ids.length > 0 && date && unit)
	});
}

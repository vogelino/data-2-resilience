import { createQuery } from '@tanstack/svelte-query';
import { format } from 'date-fns';
import { api } from '../api';
import type { WeatherMeasurementKeyNoMinMax } from '../schemas';

export function useSationsSnapshotData({
	date,
	unit,
	scale = 'hourly'
}: {
	date: Date | undefined;
	unit: string;
	scale: 'daily' | 'hourly';
}) {
	const dateKey = date && format(date, 'yyyy-MM-dd');
	return createQuery({
		queryKey: ['stations-snapshot', dateKey, unit],
		queryFn: async () => {
			if (!date || !unit) return;
			const itemResults = await api().getStationsSnapshot({
				date,
				param: unit as unknown as WeatherMeasurementKeyNoMinMax,
				scale
			});
			if (itemResults === null) return {};
			return itemResults.reduce(
				(acc, item) => ({ ...acc, ...(item.id ? { [item.id]: item } : {}) }),
				{} as Record<string, (typeof itemResults)[0]>
			);
		},
		enabled: Boolean(date && unit)
	});
}

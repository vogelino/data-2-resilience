import type { StationsGeoJSONType } from '$lib/stores/mapData';
import { createQuery } from '@tanstack/svelte-query';
import { getStationDataFetcher } from 'components/StationsLineChart/stationsLineChartUtil';
import { format } from 'date-fns';

export function useSationsRangeData({
	ids: unsortedIds = [],
	start_date,
	end_date,
	unit,
	stations
}: {
	ids?: string[];
	start_date: Date | undefined;
	end_date: Date | undefined;
	unit: string;
	stations: StationsGeoJSONType;
}) {
	const ids = unsortedIds.filter(Boolean).toSorted();
	const startDateKey = start_date && format(start_date, 'yyyy-MM-dd');
	const endDateKey = end_date && format(end_date, 'yyyy-MM-dd');
	const queryFn = getStationDataFetcher({
		ids,
		start_date,
		end_date,
		unit: unit,
		stations: stations.features
	});
	return createQuery({
		queryKey: ['stationsData-range', ids?.join('-'), startDateKey, endDateKey, unit, stations],
		queryFn,
		enabled: Boolean(
			ids?.length > 0 && stations?.features?.length > 0 && start_date && end_date && unit
		)
	});
}

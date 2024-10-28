import type { StationsGeoJSONType } from '$lib/stores/mapData';
import { api } from '$lib/utils/api';
import type { WeatherMeasurementKeyNoMinMax } from '$lib/utils/schemas';
import { compareAsc, format, isValid, parseISO } from 'date-fns';

type ParsedValueType = {
	id: string;
	measured_at?: string;
	value: string;
};

export const getStationDataFetcher =
	({
		ids,
		start_date,
		end_date,
		unit,
		stations
	}: {
		ids: string[];
		start_date?: Date;
		end_date?: Date;
		unit: string | null;
		stations: StationsGeoJSONType['features'];
	}) =>
	async () => {
		if (ids.length === 0 || !start_date || !end_date || !unit) return;
		const promises = ids.map(async (id) => {
			const startDate = start_date?.toISOString() || '';
			const endDate = end_date?.toISOString() || '';
			const itemResults = await api().getStationData({
				id,
				start_date: startDate,
				end_date: endDate,
				param: unit as unknown as WeatherMeasurementKeyNoMinMax,
				scale: 'hourly'
			});

			if (itemResults === null) return { id, supported: false };
			return { supported: true, data: mapStationDataResults({ id, unit, results: itemResults }) };
		});

		const results = (await Promise.all(promises)) as PromiseResult<ParsedValueType>[];
		const onlyWithSupported = results
			.filter(notEmptyAndNotUnsupported)
			.map(({ data }) => data)
			.flat();
		const onlyUnsupported = results
			.filter((item) => !notEmptyAndNotUnsupported(item))
			.flat()
			.map(({ id }) => id)
			.filter(notEmpty);
		return {
			lineChartData: mapDataToLineChartData({
				data: onlyWithSupported,
				unsupportedIds: onlyUnsupported,
				stations
			}),
			data: onlyWithSupported,
			unsupportedIds: onlyUnsupported
		};
	};

type PromiseResult<T> =
	| { id: string; supported: false }
	| { supported: true; data: T; id: undefined };
function notEmptyAndNotUnsupported<T>(
	item: PromiseResult<T>
): item is { supported: true; data: T; id: undefined } {
	if ('supported' in item && item.supported) return notEmpty(item.data);
	return false;
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
	return value !== null && value !== undefined;
}

function mapStationDataResults<
	T extends (Record<string, unknown> & {
		measured_at?: string;
	})[]
>({ id, unit, results = [] as unknown as T }: { id: string; unit: string; results?: T }) {
	return results.map((i) => {
		const value = i[unit as keyof typeof i] as string;
		return {
			id,
			measured_at: i.measured_at,
			value
		} satisfies ParsedValueType;
	});
}

type StationsDataItem = Record<string, unknown> & {
	id: string;
	measured_at?: string;
	date: Date;
};
function mapDataToLineChartData({
	data,
	stations,
	unsupportedIds
}: {
	data: ParsedValueType[];
	stations: StationsGeoJSONType['features'];
	unsupportedIds: string[];
}) {
	if (!data) return [] as StationsDataItem[];
	const dateToObjects = data.reduce((acc, item) => {
		const date = parseISO(item?.measured_at || '');
		if (!item?.measured_at || !isValid(date)) return acc;

		const key = format(date, 'yyyy-MM-dd-HH');
		const existingItem =
			acc.get(key) || createDefaultValue({ item, unsupportedIds, key, stations, date });
		acc.set(key, { ...existingItem, ...createItem({ item, stations }) });
		return acc;
	}, new Map<string, StationsDataItem>());

	return [...dateToObjects.values()].sort((a, b) => compareAsc(a.date, b.date));
}

function createDefaultValue({
	item,
	unsupportedIds = [],
	key,
	stations,
	date
}: {
	item: ParsedValueType;
	unsupportedIds: string[];
	key: string;
	stations: StationsGeoJSONType['features'];
	date: Date;
}) {
	return unsupportedIds.reduce(
		(acc, id) => ({
			...acc,
			...createItem({ item: { id, value: null }, stations })
		}),
		{
			id: key,
			measured_at: item.measured_at,
			date
		}
	);
}

function createItem({
	item,
	stations
}: {
	item: { id: string; value: string | null };
	stations: StationsGeoJSONType['features'];
}) {
	const relatedStation = stations.find((f) => f.properties.id === item.id);
	const stationName = relatedStation?.properties.longName || item.id;
	return {
		[item.id]: item.value,
		[`${item.id}_label`]: stationName
	};
}

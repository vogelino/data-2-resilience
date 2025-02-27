import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { format, startOfDay, startOfHour } from 'date-fns';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';
import {
	ParsedStationMetadataSchema,
	weatherMeasurementSchemas,
	weatherMeasurementSchemasNoMinMax,
	type StationMetadata,
	type WeatherMeasurementKey,
	type WeatherMeasurementKeyNoMinMax
} from './schemas';

export const api = (customFetch = fetch) => ({
	getStationsMetadata: async () => {
		const response = await customFetch(`${PUBLIC_API_BASE_URL}/v1/stations/metadata`);
		const data = await parseData(response, ParsedStationMetadataSchema);
		return data satisfies StationMetadata[];
	},
	getStationsLatestData: async (param: WeatherMeasurementKeyNoMinMax) => {
		const response = await customFetch(
			`${PUBLIC_API_BASE_URL}/stations/latest_data?param=${param}`
		);
		const schema = weatherMeasurementSchemasNoMinMax[param];
		const data = await parseData(response, schema);
		return data;
	},
	getStationData: async (params: {
		id: string;
		start_date: Date;
		end_date: Date;
		param: WeatherMeasurementKey;
		scale?: 'hourly' | 'daily' | 'max';
		hour?: string;
	}) => {
		const normalizedStartDate = normalizeDateByScale(params.start_date, params.scale);
		const normalizedEndDate = normalizeDateByScale(params.end_date, params.scale);
		const urlParams = new URLSearchParams({
			...params,
			start_date: normalizedStartDate.toISOString(),
			end_date: normalizedEndDate.toISOString()
		});
		const response = await customFetch(`${PUBLIC_API_BASE_URL}/v1/data/${params.id}?${urlParams}`);

		if (!response.ok && response.status === 422) return null;

		const schema = weatherMeasurementSchemas[params.param];
		const data = await parseData(response, schema);
		return data;
	},
	getStationsSnapshot: async (params: {
		date: Date;
		param: WeatherMeasurementKey;
		scale?: 'hourly' | 'daily';
	}) => {
		const normalizedDate = normalizeDateByScale(params.date, params.scale);
		const urlParams = new URLSearchParams({
			...params,
			date:
				params.scale === 'daily'
					? format(normalizedDate, 'yyyy-MM-dd')
					: normalizedDate.toISOString()
		});
		const response = await customFetch(`${PUBLIC_API_BASE_URL}/v1/network-snapshot?${urlParams}`);

		if (!response.ok && response.status === 422) return null;

		const schema = weatherMeasurementSchemas[params.param];
		const data = await parseData(response, schema);
		return data;
	}
});

async function parseData<S extends z.ZodSchema>(response: Response, schema: S) {
	try {
		const json = await response.json();
		const { data } = z.object({ data: z.array(schema) }).parse(json);
		return data;
	} catch (e) {
		if (e instanceof z.ZodError) {
			throw fromError(e);
		} else if (e instanceof Error) {
			throw new Error(e.message);
		}
		throw e;
	}
}

function normalizeDateByScale(date: Date, scale: 'hourly' | 'daily' | 'max' | undefined) {
	switch (scale) {
		case 'hourly':
			return startOfHour(date);
		case 'daily':
			return startOfDay(date);
		default:
			return date;
	}
}

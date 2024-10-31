import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';
import { parseStationMetadata } from './parsingUtil';
import {
	ParsedStationMetadataSchema,
	RawStationMetadataSchema,
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
		const weatherMeasurementSchema = weatherMeasurementSchemasNoMinMax[param];
		const schema =
			RawStationMetadataSchema.merge(weatherMeasurementSchema).transform(parseStationMetadata);
		const data = await parseData(response, schema);
		return data;
	},
	getStationData: async (params: {
		id: string;
		start_date: string;
		end_date: string;
		param: WeatherMeasurementKey;
		scale?: 'hourly' | 'daily' | 'max';
		hour?: string;
	}) => {
		const urlParams = new URLSearchParams(params);
		const response = await customFetch(`${PUBLIC_API_BASE_URL}/v1/data/${params.id}?${urlParams}`);

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

import { z } from 'zod';
import { fromError } from 'zod-validation-error';
import { parseStationMetadata } from './parsingUtil';
import {
	ParsedStationMetadataSchema,
	RawStationMetadataSchema,
	weatherMeasurementSchemasNoMinMax,
	type StationMetadata,
	type WeatherMeasurementKeyNoMinMax
} from './schemas';

export const api = (customFetch = fetch) => ({
	getStationsMetadata: async () => {
		const response = await customFetch('http://localhost:5173/placeholder_api/stations_metadata');
		const data = await parseData(response, ParsedStationMetadataSchema);
		return data satisfies StationMetadata[];
	},
	getStationsLatestData: async (param: WeatherMeasurementKeyNoMinMax) => {
		const response = await customFetch(
			`http://localhost:5173/placeholder_api/stations_latest_data?param=${param}`
		);
		const weatherMeasurementSchema = weatherMeasurementSchemasNoMinMax[param];
		const schema =
			RawStationMetadataSchema.merge(weatherMeasurementSchema).transform(parseStationMetadata);
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

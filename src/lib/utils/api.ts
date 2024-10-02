import { z } from 'zod';
import { fromError } from 'zod-validation-error';

const RawStationMetadataSchema = z.object({
	name: z.string(),
	long_name: z.string(),
	latitude: z.number(),
	longitude: z.number(),
	altitude: z.number(),
	district: z.string(),
	lcz: z.number(),
	station_type: z.enum(['biomet', 'temprh'])
});
export type RawStationMetadata = z.infer<typeof RawStationMetadataSchema>;

const ParsedStationMetadataSchema = RawStationMetadataSchema.transform(
	({ name, long_name, station_type, ...rest }) => ({
		...rest,
		id: name,
		longName: long_name,
		stationType: station_type
	})
);
export type StationMetadata = z.infer<typeof ParsedStationMetadataSchema>;

export const api = (customFetch = fetch) => ({
	getStationsMetadata: async () => {
		const response = await customFetch('http://localhost:5173/placeholder_api/stations_metadata');
		const data = await parseData(response, ParsedStationMetadataSchema);
		return data satisfies StationMetadata[];
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

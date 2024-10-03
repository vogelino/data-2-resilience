import { z } from 'zod';
import { fromError } from 'zod-validation-error';

const weatherMeasurementSchemas = {
	absolute_humidity: z.object({ absolute_humidity: z.number() }),
	atmospheric_pressure: z.object({ atmospheric_pressure: z.number() }),
	atmospheric_pressure_reduced: z.object({ atmospheric_pressure_reduced: z.number() }),
	air_temperature: z.object({ air_temperature: z.number() }),
	dew_point: z.object({ dew_point: z.number() }),
	heat_index: z.object({ heat_index: z.number() }),
	lightning_average_distance: z.object({ lightning_average_distance: z.number() }),
	lightning_strike_count: z.object({ lightning_strike_count: z.number() }),
	mrt: z.object({ mrt: z.number() }),
	pet: z.object({ pet: z.number() }),
	pet_category: z.object({ pet_category: z.string() }),
	precipitation_sum: z.object({ precipitation_sum: z.number() }),
	relative_humidity: z.object({ relative_humidity: z.number() }),
	solar_radiation: z.object({ solar_radiation: z.number() }),
	utci: z.object({ utci: z.number() }),
	utci_category: z.object({ utci_category: z.string() }),
	vapor_pressure: z.object({ vapor_pressure: z.number() }),
	wet_bulb_temperature: z.object({ wet_bulb_temperature: z.number() }),
	wind_direction: z.object({ wind_direction: z.number() }),
	wind_speed: z.object({ wind_speed: z.number() }),
	maximum_wind_speed: z.object({ maximum_wind_speed: z.number() })
};
export const weatherMeasurementKeys = Object.keys(
	weatherMeasurementSchemas
) as WeatherMeasurementKey[];
export type WeatherMeasurementKey = keyof typeof weatherMeasurementSchemas;

const StationTypeSchema = z.enum(['biomet', 'temprh']);

const RawStationMetadataSchema = z.object({
	name: z.string(),
	long_name: z.string(),
	latitude: z.number(),
	longitude: z.number(),
	altitude: z.number(),
	district: z.string(),
	lcz: z.number(),
	station_type: StationTypeSchema
});
export type RawStationMetadata = z.infer<typeof RawStationMetadataSchema>;

const ParsedStationMetadataSchema = RawStationMetadataSchema.transform(parseStationMetadata);
export type StationMetadata = z.infer<typeof ParsedStationMetadataSchema>;

export const api = (customFetch = fetch) => ({
	getStationsMetadata: async () => {
		const response = await customFetch('http://localhost:5173/placeholder_api/stations_metadata');
		const data = await parseData(response, ParsedStationMetadataSchema);
		return data satisfies StationMetadata[];
	},
	getStationsLatestData: async (param: WeatherMeasurementKey) => {
		const response = await customFetch(
			`http://localhost:5173/placeholder_api/stations_latest_data?param=${param}`
		);
		const weatherMeasurementSchema = weatherMeasurementSchemas[param];
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

function parseStationMetadata({ name, long_name, station_type, ...rest }: RawStationMetadata) {
	return {
		...rest,
		id: name,
		longName: long_name,
		stationType: station_type
	};
}

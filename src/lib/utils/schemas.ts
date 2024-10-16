import { z } from 'zod';
import { parseStationMetadata } from './parsingUtil';

const meadurementDateSchema = z.object({
	measured_at: z.string()
});
const mD = meadurementDateSchema;

const numSchema = z
	.number()
	.nullable()
	.transform((val) => (val === null ? undefined : val));

// MEASUREMENTS
const numberSchemas = {
	absolute_humidity_max: mD.extend({ absolute_humidity_max: numSchema }),
	absolute_humidity_min: mD.extend({ absolute_humidity_min: numSchema }),
	absolute_humidity: mD.extend({ absolute_humidity: numSchema }),
	air_temperature_max: mD.extend({ air_temperature_max: numSchema }),
	air_temperature_min: mD.extend({ air_temperature_min: numSchema }),
	air_temperature: mD.extend({ air_temperature: numSchema }),
	atmospheric_pressure_max: mD.extend({ atmospheric_pressure_max: numSchema }),
	atmospheric_pressure_min: mD.extend({ atmospheric_pressure_min: numSchema }),
	atmospheric_pressure_reduced_max: mD.extend({
		atmospheric_pressure_reduced_max: numSchema
	}),
	atmospheric_pressure_reduced_min: mD.extend({
		atmospheric_pressure_reduced_min: numSchema
	}),
	atmospheric_pressure_reduced: mD.extend({ atmospheric_pressure_reduced: numSchema }),
	atmospheric_pressure: mD.extend({ atmospheric_pressure: numSchema }),
	dew_point_max: mD.extend({ dew_point_max: numSchema }),
	dew_point_min: mD.extend({ dew_point_min: numSchema }),
	dew_point: mD.extend({ dew_point: numSchema }),
	heat_index_max: mD.extend({ heat_index_max: numSchema }),
	heat_index_min: mD.extend({ heat_index_min: numSchema }),
	heat_index: mD.extend({ heat_index: numSchema }),
	lightning_average_distance_max: mD.extend({
		lightning_average_distance_max: numSchema
	}),
	lightning_average_distance_min: mD.extend({
		lightning_average_distance_min: numSchema
	}),
	lightning_average_distance: mD.extend({ lightning_average_distance: numSchema }),
	lightning_strike_count_max: mD.extend({ lightning_strike_count_max: numSchema }),
	lightning_strike_count_min: mD.extend({ lightning_strike_count_min: numSchema }),
	lightning_strike_count: mD.extend({ lightning_strike_count: numSchema }),
	maximum_wind_speed_max: mD.extend({ maximum_wind_speed_max: numSchema }),
	maximum_wind_speed_min: mD.extend({ maximum_wind_speed_min: numSchema }),
	maximum_wind_speed: mD.extend({ maximum_wind_speed: numSchema }),
	mrt_max: mD.extend({ mrt_max: numSchema }),
	mrt_min: mD.extend({ mrt_min: numSchema }),
	mrt: mD.extend({ mrt: numSchema }),
	pet_category: mD.extend({ pet_category: numSchema }),
	pet_max: mD.extend({ pet_max: numSchema }),
	pet_min: mD.extend({ pet_min: numSchema }),
	pet: mD.extend({ pet: numSchema }),
	precipitation_sum_max: mD.extend({ precipitation_sum_max: numSchema }),
	precipitation_sum_min: mD.extend({ precipitation_sum_min: numSchema }),
	precipitation_sum: mD.extend({ precipitation_sum: numSchema }),
	relative_humidity_max: mD.extend({ relative_humidity_max: numSchema }),
	relative_humidity_min: mD.extend({ relative_humidity_min: numSchema }),
	relative_humidity: mD.extend({ relative_humidity: numSchema }),
	solar_radiation_max: mD.extend({ solar_radiation_max: numSchema }),
	solar_radiation_min: mD.extend({ solar_radiation_min: numSchema }),
	solar_radiation: mD.extend({ solar_radiation: numSchema }),
	utci_category: mD.extend({ utci_category: numSchema }),
	utci_max: mD.extend({ utci_max: numSchema }),
	utci_min: mD.extend({ utci_min: numSchema }),
	utci: mD.extend({ utci: numSchema }),
	vapor_pressure_max: mD.extend({ vapor_pressure_max: numSchema }),
	vapor_pressure_min: mD.extend({ vapor_pressure_min: numSchema }),
	vapor_pressure: mD.extend({ vapor_pressure: numSchema }),
	wet_bulb_temperature_max: mD.extend({ wet_bulb_temperature_max: numSchema }),
	wet_bulb_temperature_min: mD.extend({ wet_bulb_temperature_min: numSchema }),
	wet_bulb_temperature: mD.extend({ wet_bulb_temperature: numSchema }),
	wind_direction_max: mD.extend({ wind_direction_max: numSchema }),
	wind_direction_min: mD.extend({ wind_direction_min: numSchema }),
	wind_direction: mD.extend({ wind_direction: numSchema }),
	wind_speed_max: mD.extend({ wind_speed_max: numSchema }),
	wind_speed_min: mD.extend({ wind_speed_min: numSchema }),
	wind_speed: mD.extend({ wind_speed: numSchema })
};

const strSchema = z
	.string()
	.nullable()
	.transform((val) => (val === null ? undefined : val));
const stringSchemas = {
	pet_category: mD.extend({ pet_category: strSchema }),
	utci_category: mD.extend({ utci_category: strSchema })
};
export const weatherMeasurementSchemas = {
	...numberSchemas,
	...stringSchemas
};
export type WeatherMeasurementKey = keyof typeof weatherMeasurementSchemas;
export const weatherMeasurementKeys = Object.keys(
	weatherMeasurementSchemas
) as WeatherMeasurementKey[];

export const weatherMeasurementSchemasNoMinMax = {
	absolute_humidity: weatherMeasurementSchemas.absolute_humidity,
	atmospheric_pressure: weatherMeasurementSchemas.atmospheric_pressure,
	atmospheric_pressure_reduced: weatherMeasurementSchemas.atmospheric_pressure_reduced,
	air_temperature: weatherMeasurementSchemas.air_temperature,
	dew_point: weatherMeasurementSchemas.dew_point,
	heat_index: weatherMeasurementSchemas.heat_index,
	lightning_average_distance: weatherMeasurementSchemas.lightning_average_distance,
	lightning_strike_count: weatherMeasurementSchemas.lightning_strike_count,
	mrt: weatherMeasurementSchemas.mrt,
	pet: weatherMeasurementSchemas.pet,
	precipitation_sum: weatherMeasurementSchemas.precipitation_sum,
	relative_humidity: weatherMeasurementSchemas.relative_humidity,
	solar_radiation: weatherMeasurementSchemas.solar_radiation,
	utci: weatherMeasurementSchemas.utci,
	vapor_pressure: weatherMeasurementSchemas.vapor_pressure,
	wet_bulb_temperature: weatherMeasurementSchemas.wet_bulb_temperature,
	wind_direction: weatherMeasurementSchemas.wind_direction,
	wind_speed: weatherMeasurementSchemas.wind_speed,
	maximum_wind_speed: weatherMeasurementSchemas.maximum_wind_speed,
	pet_category: stringSchemas.pet_category,
	utci_category: stringSchemas.utci_category
};
export type WeatherMeasurementKeyNoMinMax = keyof typeof weatherMeasurementSchemasNoMinMax;
export const weatherMeasurementSchemasNoMinMaxKeys = Object.keys(
	weatherMeasurementSchemasNoMinMax
) as WeatherMeasurementKeyNoMinMax[];

// STATIONS
export const StationTypeSchema = z.enum(['biomet', 'temprh']);

export const RawStationMetadataSchema = z.object({
	name: z.string(),
	long_name: z.string(),
	latitude: z.number(),
	longitude: z.number(),
	altitude: z.number(),
	district: z.string(),
	lcz: z.number().nullable(),
	measured_at: z.string().optional(),
	station_type: StationTypeSchema
});
export type RawStationMetadata = z.infer<typeof RawStationMetadataSchema>;

export const ParsedStationMetadataSchema = RawStationMetadataSchema.transform(parseStationMetadata);
export type StationMetadata = z.infer<typeof ParsedStationMetadataSchema>;

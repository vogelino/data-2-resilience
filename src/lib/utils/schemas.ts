import { z } from 'zod';
import { parseStationMetadata } from './parsingUtil';

const meadurementDateSchema = z.object({
	measured_at: z.string()
});
const mD = meadurementDateSchema;

// MEASUREMENTS
const numberSchemas = {
	absolute_humidity_max: mD.extend({ absolute_humidity_max: z.number() }),
	absolute_humidity_min: mD.extend({ absolute_humidity_min: z.number() }),
	absolute_humidity: mD.extend({ absolute_humidity: z.number() }),
	air_temperature_max: mD.extend({ air_temperature_max: z.number() }),
	air_temperature_min: mD.extend({ air_temperature_min: z.number() }),
	air_temperature: mD.extend({ air_temperature: z.number() }),
	atmospheric_pressure_max: mD.extend({ atmospheric_pressure_max: z.number() }),
	atmospheric_pressure_min: mD.extend({ atmospheric_pressure_min: z.number() }),
	atmospheric_pressure_reduced_max: mD.extend({ atmospheric_pressure_reduced_max: z.number() }),
	atmospheric_pressure_reduced_min: mD.extend({ atmospheric_pressure_reduced_min: z.number() }),
	atmospheric_pressure_reduced: mD.extend({ atmospheric_pressure_reduced: z.number() }),
	atmospheric_pressure: mD.extend({ atmospheric_pressure: z.number() }),
	dew_point_max: mD.extend({ dew_point_max: z.number() }),
	dew_point_min: mD.extend({ dew_point_min: z.number() }),
	dew_point: mD.extend({ dew_point: z.number() }),
	heat_index_max: mD.extend({ heat_index_max: z.number() }),
	heat_index_min: mD.extend({ heat_index_min: z.number() }),
	heat_index: mD.extend({ heat_index: z.number() }),
	lightning_average_distance_max: mD.extend({ lightning_average_distance_max: z.number() }),
	lightning_average_distance_min: mD.extend({ lightning_average_distance_min: z.number() }),
	lightning_average_distance: mD.extend({ lightning_average_distance: z.number() }),
	lightning_strike_count_max: mD.extend({ lightning_strike_count_max: z.number() }),
	lightning_strike_count_min: mD.extend({ lightning_strike_count_min: z.number() }),
	lightning_strike_count: mD.extend({ lightning_strike_count: z.number() }),
	maximum_wind_speed_max: mD.extend({ maximum_wind_speed_max: z.number() }),
	maximum_wind_speed_min: mD.extend({ maximum_wind_speed_min: z.number() }),
	maximum_wind_speed: mD.extend({ maximum_wind_speed: z.number() }),
	mrt_max: mD.extend({ mrt_max: z.number() }),
	mrt_min: mD.extend({ mrt_min: z.number() }),
	mrt: mD.extend({ mrt: z.number() }),
	pet_category: mD.extend({ pet_category: z.number() }),
	pet_max: mD.extend({ pet_max: z.number() }),
	pet_min: mD.extend({ pet_min: z.number() }),
	pet: mD.extend({ pet: z.number() }),
	precipitation_sum_max: mD.extend({ precipitation_sum_max: z.number() }),
	precipitation_sum_min: mD.extend({ precipitation_sum_min: z.number() }),
	precipitation_sum: mD.extend({ precipitation_sum: z.number() }),
	relative_humidity_max: mD.extend({ relative_humidity_max: z.number() }),
	relative_humidity_min: mD.extend({ relative_humidity_min: z.number() }),
	relative_humidity: mD.extend({ relative_humidity: z.number() }),
	solar_radiation_max: mD.extend({ solar_radiation_max: z.number() }),
	solar_radiation_min: mD.extend({ solar_radiation_min: z.number() }),
	solar_radiation: mD.extend({ solar_radiation: z.number() }),
	utci_category: mD.extend({ utci_category: z.number() }),
	utci_max: mD.extend({ utci_max: z.number() }),
	utci_min: mD.extend({ utci_min: z.number() }),
	utci: mD.extend({ utci: z.number() }),
	vapor_pressure_max: mD.extend({ vapor_pressure_max: z.number() }),
	vapor_pressure_min: mD.extend({ vapor_pressure_min: z.number() }),
	vapor_pressure: mD.extend({ vapor_pressure: z.number() }),
	wet_bulb_temperature_max: mD.extend({ wet_bulb_temperature_max: z.number() }),
	wet_bulb_temperature_min: mD.extend({ wet_bulb_temperature_min: z.number() }),
	wet_bulb_temperature: mD.extend({ wet_bulb_temperature: z.number() }),
	wind_direction_max: mD.extend({ wind_direction_max: z.number() }),
	wind_direction_min: mD.extend({ wind_direction_min: z.number() }),
	wind_direction: mD.extend({ wind_direction: z.number() }),
	wind_speed_max: mD.extend({ wind_speed_max: z.number() }),
	wind_speed_min: mD.extend({ wind_speed_min: z.number() }),
	wind_speed: mD.extend({ wind_speed: z.number() })
};
const stringSchemas = {
	pet_category: mD.extend({ pet_category: z.string() }),
	utci_category: mD.extend({ utci_category: z.string() })
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
	lcz: z.number(),
	station_type: StationTypeSchema
});
export type RawStationMetadata = z.infer<typeof RawStationMetadataSchema>;

export const ParsedStationMetadataSchema = RawStationMetadataSchema.transform(parseStationMetadata);
export type StationMetadata = z.infer<typeof ParsedStationMetadataSchema>;

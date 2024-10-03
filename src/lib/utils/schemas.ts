import { z } from 'zod';
import { parseStationMetadata } from './parsingUtil';

// MEASUREMENTS
const numberSchemas = {
	absolute_humidity: z.object({ absolute_humidity: z.number() }),
	absolute_humidity_max: z.object({ absolute_humidity_max: z.number() }),
	absolute_humidity_min: z.object({ absolute_humidity_min: z.number() }),
	atmospheric_pressure: z.object({ atmospheric_pressure: z.number() }),
	atmospheric_pressure_max: z.object({ atmospheric_pressure_max: z.number() }),
	atmospheric_pressure_min: z.object({ atmospheric_pressure_min: z.number() }),
	atmospheric_pressure_reduced: z.object({ atmospheric_pressure_reduced: z.number() }),
	atmospheric_pressure_reduced_max: z.object({ atmospheric_pressure_reduced_max: z.number() }),
	atmospheric_pressure_reduced_min: z.object({ atmospheric_pressure_reduced_min: z.number() }),
	air_temperature: z.object({ air_temperature: z.number() }),
	air_temperature_max: z.object({ air_temperature_max: z.number() }),
	air_temperature_min: z.object({ air_temperature_min: z.number() }),
	dew_point: z.object({ dew_point: z.number() }),
	dew_point_max: z.object({ dew_point_max: z.number() }),
	dew_point_min: z.object({ dew_point_min: z.number() }),
	heat_index: z.object({ heat_index: z.number() }),
	heat_index_max: z.object({ heat_index_max: z.number() }),
	heat_index_min: z.object({ heat_index_min: z.number() }),
	lightning_average_distance: z.object({ lightning_average_distance: z.number() }),
	lightning_average_distance_max: z.object({ lightning_average_distance_max: z.number() }),
	lightning_average_distance_min: z.object({ lightning_average_distance_min: z.number() }),
	lightning_strike_count: z.object({ lightning_strike_count: z.number() }),
	mrt: z.object({ mrt: z.number() }),
	mrt_max: z.object({ mrt_max: z.number() }),
	mrt_min: z.object({ mrt_min: z.number() }),
	pet: z.object({ pet: z.number() }),
	pet_max: z.object({ pet_max: z.number() }),
	pet_min: z.object({ pet_min: z.number() }),
	pet_category: z.object({ pet_category: z.number() }),
	precipitation_sum: z.object({ precipitation_sum: z.number() }),
	relative_humidity: z.object({ relative_humidity: z.number() }),
	relative_humidity_max: z.object({ relative_humidity_max: z.number() }),
	relative_humidity_min: z.object({ relative_humidity_min: z.number() }),
	solar_radiation: z.object({ solar_radiation: z.number() }),
	solar_radiation_max: z.object({ solar_radiation_max: z.number() }),
	solar_radiation_min: z.object({ solar_radiation_min: z.number() }),
	utci: z.object({ utci: z.number() }),
	utci_max: z.object({ utci_max: z.number() }),
	utci_min: z.object({ utci_min: z.number() }),
	utci_category: z.object({ utci_category: z.number() }),
	vapor_pressure: z.object({ vapor_pressure: z.number() }),
	vapor_pressure_max: z.object({ vapor_pressure_max: z.number() }),
	vapor_pressure_min: z.object({ vapor_pressure_min: z.number() }),
	wet_bulb_temperature: z.object({ wet_bulb_temperature: z.number() }),
	wet_bulb_temperature_max: z.object({ wet_bulb_temperature_max: z.number() }),
	wet_bulb_temperature_min: z.object({ wet_bulb_temperature_min: z.number() }),
	wind_direction: z.object({ wind_direction: z.number() }),
	wind_speed: z.object({ wind_speed: z.number() }),
	wind_speed_max: z.object({ wind_speed_max: z.number() }),
	wind_speed_min: z.object({ wind_speed_min: z.number() }),
	maximum_wind_speed: z.object({ maximum_wind_speed: z.number() }),
	maximum_wind_speed_max: z.object({ maximum_wind_speed_max: z.number() }),
	maximum_wind_speed_min: z.object({ maximum_wind_speed_min: z.number() })
};
const stringSchemas = {
	pet_category: z.object({ pet_category: z.string() }),
	utci_category: z.object({ utci_category: z.string() })
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

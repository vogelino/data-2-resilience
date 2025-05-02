import { z } from 'zod';
import { parseRawStationNameToId, parseStationMetadata } from './parsingUtil';

// STATIONS
export const StationTypeSchema = z.enum(['biomet', 'temprh', 'double']);
export type StationType = z.infer<typeof StationTypeSchema>;

export const RawStationMetadataSchema = z.object({
	station_id: z.string(),
	long_name: z.string(),
	latitude: z.number(),
	longitude: z.number(),
	altitude: z.number(),
	district: z.string(),
	lcz: z.string().nullable(),
	measured_at: z.string().optional(),
	station_type: StationTypeSchema
});
export type RawStationMetadata = z.infer<typeof RawStationMetadataSchema>;

export const ParsedStationMetadataSchema = RawStationMetadataSchema.transform(parseStationMetadata);
export type StationMetadata = z.infer<typeof ParsedStationMetadataSchema>;

// UNITS
const meadurementDateSchema = z.object({
	measured_at: z.string().optional(),
	station_id: z.string().optional(),
	station_type: StationTypeSchema.optional()
});
const mD = meadurementDateSchema;

const numSchema = z.number().nullable();

// MEASUREMENTS
const numberSchemas = {
	absolute_humidity_max: mD
		.extend({ absolute_humidity_max: numSchema })
		.transform(parseRawStationNameToId),
	absolute_humidity_min: mD
		.extend({ absolute_humidity_min: numSchema })
		.transform(parseRawStationNameToId),
	absolute_humidity: mD.extend({ absolute_humidity: numSchema }).transform(parseRawStationNameToId),
	air_temperature_max: mD
		.extend({ air_temperature_max: numSchema })
		.transform(parseRawStationNameToId),
	air_temperature_min: mD
		.extend({ air_temperature_min: numSchema })
		.transform(parseRawStationNameToId),
	air_temperature: mD.extend({ air_temperature: numSchema }).transform(parseRawStationNameToId),
	atmospheric_pressure_max: mD
		.extend({ atmospheric_pressure_max: numSchema })
		.transform(parseRawStationNameToId),
	atmospheric_pressure_min: mD
		.extend({ atmospheric_pressure_min: numSchema })
		.transform(parseRawStationNameToId),
	atmospheric_pressure_reduced_max: mD
		.extend({
			atmospheric_pressure_reduced_max: numSchema
		})
		.transform(parseRawStationNameToId),
	atmospheric_pressure_reduced_min: mD
		.extend({
			atmospheric_pressure_reduced_min: numSchema
		})
		.transform(parseRawStationNameToId),
	atmospheric_pressure_reduced: mD
		.extend({ atmospheric_pressure_reduced: numSchema })
		.transform(parseRawStationNameToId),
	atmospheric_pressure: mD
		.extend({ atmospheric_pressure: numSchema })
		.transform(parseRawStationNameToId),
	dew_point_max: mD.extend({ dew_point_max: numSchema }).transform(parseRawStationNameToId),
	dew_point_min: mD.extend({ dew_point_min: numSchema }).transform(parseRawStationNameToId),
	dew_point: mD.extend({ dew_point: numSchema }).transform(parseRawStationNameToId),
	heat_index_max: mD.extend({ heat_index_max: numSchema }).transform(parseRawStationNameToId),
	heat_index_min: mD.extend({ heat_index_min: numSchema }).transform(parseRawStationNameToId),
	heat_index: mD.extend({ heat_index: numSchema }).transform(parseRawStationNameToId),
	lightning_average_distance_max: mD
		.extend({
			lightning_average_distance_max: numSchema
		})
		.transform(parseRawStationNameToId),
	lightning_average_distance_min: mD
		.extend({
			lightning_average_distance_min: numSchema
		})
		.transform(parseRawStationNameToId),
	lightning_average_distance: mD
		.extend({ lightning_average_distance: numSchema })
		.transform(parseRawStationNameToId),
	lightning_strike_count_max: mD
		.extend({ lightning_strike_count_max: numSchema })
		.transform(parseRawStationNameToId),
	lightning_strike_count_min: mD
		.extend({ lightning_strike_count_min: numSchema })
		.transform(parseRawStationNameToId),
	lightning_strike_count: mD
		.extend({ lightning_strike_count: numSchema })
		.transform(parseRawStationNameToId),
	maximum_wind_speed_max: mD
		.extend({ maximum_wind_speed_max: numSchema })
		.transform(parseRawStationNameToId),
	maximum_wind_speed_min: mD
		.extend({ maximum_wind_speed_min: numSchema })
		.transform(parseRawStationNameToId),
	maximum_wind_speed: mD
		.extend({ maximum_wind_speed: numSchema })
		.transform(parseRawStationNameToId),
	mrt_max: mD.extend({ mrt_max: numSchema }).transform(parseRawStationNameToId),
	mrt_min: mD.extend({ mrt_min: numSchema }).transform(parseRawStationNameToId),
	mrt: mD.extend({ mrt: numSchema }).transform(parseRawStationNameToId),
	pet_category: mD.extend({ pet_category: numSchema }).transform(parseRawStationNameToId),
	pet_max: mD.extend({ pet_max: numSchema }).transform(parseRawStationNameToId),
	pet_min: mD.extend({ pet_min: numSchema }).transform(parseRawStationNameToId),
	pet: mD.extend({ pet: numSchema }).transform(parseRawStationNameToId),
	precipitation_sum_max: mD
		.extend({ precipitation_sum_max: numSchema })
		.transform(parseRawStationNameToId),
	precipitation_sum_min: mD
		.extend({ precipitation_sum_min: numSchema })
		.transform(parseRawStationNameToId),
	precipitation_sum: mD.extend({ precipitation_sum: numSchema }).transform(parseRawStationNameToId),
	relative_humidity_max: mD
		.extend({ relative_humidity_max: numSchema })
		.transform(parseRawStationNameToId),
	relative_humidity_min: mD
		.extend({ relative_humidity_min: numSchema })
		.transform(parseRawStationNameToId),
	relative_humidity: mD.extend({ relative_humidity: numSchema }).transform(parseRawStationNameToId),
	solar_radiation_max: mD
		.extend({ solar_radiation_max: numSchema })
		.transform(parseRawStationNameToId),
	solar_radiation_min: mD
		.extend({ solar_radiation_min: numSchema })
		.transform(parseRawStationNameToId),
	solar_radiation: mD.extend({ solar_radiation: numSchema }).transform(parseRawStationNameToId),
	utci_category: mD.extend({ utci_category: numSchema }).transform(parseRawStationNameToId),
	utci_max: mD.extend({ utci_max: numSchema }).transform(parseRawStationNameToId),
	utci_min: mD.extend({ utci_min: numSchema }).transform(parseRawStationNameToId),
	utci: mD.extend({ utci: numSchema }).transform(parseRawStationNameToId),
	vapor_pressure_max: mD
		.extend({ vapor_pressure_max: numSchema })
		.transform(parseRawStationNameToId),
	vapor_pressure_min: mD
		.extend({ vapor_pressure_min: numSchema })
		.transform(parseRawStationNameToId),
	vapor_pressure: mD.extend({ vapor_pressure: numSchema }).transform(parseRawStationNameToId),
	wet_bulb_temperature_max: mD
		.extend({ wet_bulb_temperature_max: numSchema })
		.transform(parseRawStationNameToId),
	wet_bulb_temperature_min: mD
		.extend({ wet_bulb_temperature_min: numSchema })
		.transform(parseRawStationNameToId),
	wet_bulb_temperature: mD
		.extend({ wet_bulb_temperature: numSchema })
		.transform(parseRawStationNameToId),
	wind_direction_max: mD
		.extend({ wind_direction_max: numSchema })
		.transform(parseRawStationNameToId),
	wind_direction_min: mD
		.extend({ wind_direction_min: numSchema })
		.transform(parseRawStationNameToId),
	wind_direction: mD.extend({ wind_direction: numSchema }).transform(parseRawStationNameToId),
	wind_speed_max: mD.extend({ wind_speed_max: numSchema }).transform(parseRawStationNameToId),
	wind_speed_min: mD.extend({ wind_speed_min: numSchema }).transform(parseRawStationNameToId),
	wind_speed: mD.extend({ wind_speed: numSchema }).transform(parseRawStationNameToId)
};

const strSchema = z.string().nullable();
const stringSchemas = {
	pet_category: mD.extend({ pet_category: strSchema }).transform(parseRawStationNameToId),
	utci_category: mD.extend({ utci_category: strSchema }).transform(parseRawStationNameToId)
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

const HeatStressMetadataKeysSchema = z.object({
	doy: z.coerce.number(),
	hour: z.coerce.number(),
	param: z.enum(['UTCI', 'PET', 'RH', 'TA']).transform((v) => v.toLowerCase()),
	year: z.coerce.number()
});
export const HeatStressMetadataSchema = z.object({
	bounds: z.tuple([z.number(), z.number(), z.number(), z.number()]),
	convex_hull: z.object({
		coordinates: z.array(z.tuple([z.number(), z.number()])).array(),
		type: z.string()
	}),
	keys: HeatStressMetadataKeysSchema,
	mean: z.number(),
	metadata: HeatStressMetadataKeysSchema.extend({
		city: z.string().nullable(),
		method: z.string().nullable(),
		resolution: z.string().nullable(),
		version: z.string().nullable()
	}).nullable(),
	percentiles: z.array(z.number()),
	range: z.tuple([z.number(), z.number()]),
	stdev: z.number(),
	valid_percentage: z.number()
});
export type HeatStressMetadata = z.infer<typeof HeatStressMetadataSchema>;

export const HeatStressColormapItemSchema = z.object({
	rgba: z.tuple([z.number(), z.number(), z.number(), z.number()]),
	value: z.number()
});
export type HeatStressColormapItem = z.infer<typeof HeatStressColormapItemSchema>;

export const RasterLayerInfoSchema = z.object({
	doy: z.coerce.number(),
	hour: z.coerce.number(),
	param: z.string(),
	year: z.coerce.number()
});
export type RasterLayerInfo = z.infer<typeof RasterLayerInfoSchema>;

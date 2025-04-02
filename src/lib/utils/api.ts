import { PUBLIC_API_BASE_URL } from '$env/static/public';
import { format, getDayOfYear, getYear, startOfDay, startOfHour } from 'date-fns';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';
import {
	HeatStressColormapItemSchema,
	HeatStressMetadataSchema,
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
		const data = await parseArrayData(response, ParsedStationMetadataSchema);
		return data satisfies StationMetadata[];
	},
	getStationsLatestData: async (param: WeatherMeasurementKeyNoMinMax) => {
		const response = await customFetch(
			`${PUBLIC_API_BASE_URL}/stations/latest_data?param=${param}`
		);
		const schema = weatherMeasurementSchemasNoMinMax[param];
		const data = await parseArrayData(response, schema);
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
		const data = await parseArrayData(response, schema);
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
		const data = await parseArrayData(response, schema);
		return data;
	},
	getHeatStressMetadata: async (params: { date: Date; unit: string }) => {
		let year = getYear(params.date);
		let dayOfYear = getDayOfYear(params.date);
		let unit = params.unit.toUpperCase() === 'PET' ? 'PET' : 'UTCI';
		const hour = params.date.getHours();
		dayOfYear = 177;
		year = 2024;
		unit = 'UTCI';
		const response = await customFetch(
			`${PUBLIC_API_BASE_URL}/tms/metadata/${unit}/${year}/${dayOfYear}/${hour}`
		);
		if (!response.ok && response.status === 422) return null;
		const data = await parseData(response, HeatStressMetadataSchema);
		return data;
	},
	getHeatStressColormap: async (params: { rangeStart: number; rangeEnd: number }) => {
		const response = await customFetch(
			`${PUBLIC_API_BASE_URL}/tms/colormap?stretch_range=%5B${params.rangeStart},${params.rangeEnd}%5D&colormap=turbo`
		);

		if (!response.ok && response.status === 422) return null;
		return await parseArrayData(response, HeatStressColormapItemSchema, 'colormap');
	}
});

async function parseData<S extends z.ZodSchema>(
	response: Response,
	schema: S
): Promise<z.infer<S>> {
	try {
		const json = await response.json();
		return schema.parse(json);
	} catch (e) {
		if (e instanceof z.ZodError) {
			throw fromError(e);
		} else if (e instanceof Error) {
			throw new Error(e.message);
		}
		throw e;
	}
}

async function parseArrayData<S extends z.ZodSchema>(
	response: Response,
	schema: S,
	baseKey = 'data'
): Promise<z.infer<S>[]> {
	const adaptedSchema = z.object({ [baseKey]: z.array(schema) });
	const validated = await parseData(response, adaptedSchema);
	return validated[baseKey];
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

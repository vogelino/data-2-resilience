import { weatherMeasurementKeys, type WeatherMeasurementKey } from '$lib/utils/schemas';
import { json } from '@sveltejs/kit';
import { isValid } from 'date-fns';
import fakeData from './fakeData';

export function GET({ url }) {
	const id = url.pathname.split('/').pop();
	const param = url.searchParams.get('param');
	const start_date = url.searchParams.get('start_date');
	const end_date = url.searchParams.get('end_date');
	const scale = url.searchParams.get('scale') || 'daily';
	if (!id) throw new Error('id is required');
	if (!param) throw new Error('param is required');
	if (!start_date) throw new Error('start_date is required');
	if (!isValid(new Date(start_date))) throw new Error('start_date is not a valid date');
	if (!end_date) throw new Error('end_date is required');
	if (!isValid(new Date(end_date))) throw new Error('end_date is not a valid date');
	if (scale !== 'hourly' && scale !== 'daily') {
		throw new Error('scale must be either "hourly" or "daily"');
	}
	const parsedParam = param as WeatherMeasurementKey;
	const paramValid = weatherMeasurementKeys.includes(parsedParam);
	if (!paramValid) {
		throw new Error(
			'param must be an one of the following values: ' + weatherMeasurementKeys.join(', ')
		);
	}
	return json({
		data: fakeData[parsedParam]?.data ?? []
	});
}

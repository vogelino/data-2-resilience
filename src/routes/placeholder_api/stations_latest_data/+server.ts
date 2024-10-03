import { stations } from '$lib/stores/mapData';
import {
	weatherMeasurementSchemasNoMinMaxKeys,
	type RawStationMetadata,
	type WeatherMeasurementKeyNoMinMax
} from '$lib/utils/schemas';
import { json } from '@sveltejs/kit';
import fakeData from './fakeData';

export function GET({ url }) {
	const param = url.searchParams.get('param');
	if (!param) throw new Error('param is required');
	const parsedParams = param.split(',') as WeatherMeasurementKeyNoMinMax[];
	const allParamsValid = parsedParams.every((param) =>
		weatherMeasurementSchemasNoMinMaxKeys.includes(param)
	);
	if (!allParamsValid) {
		throw new Error(
			'param must be an array of one or many of the following values: ' +
				weatherMeasurementSchemasNoMinMaxKeys.join(', ')
		);
	}
	return json({
		data: stations.features.map(
			(station) =>
				({
					...parsedParams.reduce((acc, p) => {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-ignore
						const value = fakeData[p].data[0][p] as number;
						return {
							...acc,
							[p]: value
						};
					}, {}),
					name: station.properties.id,
					long_name: station.properties.Label,
					station_type: Math.random() > 0.5 ? 'biomet' : 'temprh',
					latitude: station.geometry.coordinates[1],
					longitude: station.geometry.coordinates[0],
					altitude: Math.random() * 3000,
					district: station.properties.Strasse,
					lcz: Math.random() * 10
				}) satisfies RawStationMetadata
		)
	});
}

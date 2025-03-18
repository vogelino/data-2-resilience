import { z } from 'zod';
import type { RawStationMetadata } from './schemas';

export function parseStationMetadata({
	station_id,
	long_name,
	station_type,
	...rest
}: RawStationMetadata) {
	return {
		...rest,
		id: station_id,
		longName: long_name,
		stationType: station_type
	};
}

export function parseRawStationNameToId({ station_id, ...rest }: { station_id?: string }) {
	return {
		...rest,
		id: station_id
	};
}

const datavisSchema = z.enum(['day', 'hour', 'range']).default('day');
type DatavisType = z.infer<typeof datavisSchema>;
export function parseDatavisType(type: unknown) {
	const parsedValue = datavisSchema.safeParse(type);
	return (parsedValue.success ? parsedValue.data : 'day') satisfies DatavisType;
}

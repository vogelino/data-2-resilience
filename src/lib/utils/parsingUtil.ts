import { z } from 'zod';
import type { RawStationMetadata } from './schemas';

export function parseStationMetadata({
	name,
	long_name,
	station_type,
	...rest
}: RawStationMetadata) {
	return {
		...rest,
		id: name,
		longName: long_name,
		stationType: station_type
	};
}

const datavisSchema = z.enum(['day', 'hour', 'range']).default('day');
type DatavisType = z.infer<typeof datavisSchema>;
export function parseDatavisType(type: unknown) {
	const parsedValue = datavisSchema.safeParse(type);
	return (parsedValue.success ? parsedValue.data : 'day') satisfies DatavisType;
}

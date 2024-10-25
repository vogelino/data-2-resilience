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

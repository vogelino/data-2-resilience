import type { Locales } from "$i18n/i18n-types";
import type { StationsGeoJSONType } from "$lib/stores/mapData";
import type { StationMetadata } from "$lib/utils/schemas";

export const load = async ({
	parent,
}: {
	parent: () => Promise<{
		stationsGeoJson: StationsGeoJSONType;
		stationsMetadata: StationMetadata[];
		locale: Locales;
	}>;
}) => {
	const { stationsGeoJson, locale, stationsMetadata } = await parent();
	return { stationsGeoJson, locale, stationsMetadata };
};

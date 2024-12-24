import type { Locales } from "$i18n/i18n-types";
import type { StationsGeoJSONType } from "$lib/stores/mapData";

export const load = async ({
	parent,
}: {
	parent: () => Promise<{
		stationsGeoJson: StationsGeoJSONType;
		locale: Locales;
	}>;
}) => {
	const { stationsGeoJson, locale } = await parent();
	return { stationsGeoJson, locale };
};

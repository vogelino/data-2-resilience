export const load = async ({ parent }) => {
	const { stationsGeoJson, locale } = await parent();

	return { stationsGeoJson, locale };
};

export const load = async ({ parent }) => {
	const { stationsGeoJson } = await parent();

	return { stationsGeoJson };
};

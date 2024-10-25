import { fetchStations } from '$lib/stores/mapData';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { locale, LL } }) => {
	console.info(LL.log({ fileName: '+layout.server.ts' }));
	const stationsGeoJson = await fetchStations();

	// pass locale information from "server-context" to "shared server + client context"
	return { locale, stationsGeoJson };
};

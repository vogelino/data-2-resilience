import { fetchStations } from "$lib/stores/mapData";
import { api } from "$lib/utils/api";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals: { locale, LL } }) => {
	console.info(LL.log({ fileName: "+layout.server.ts" }));
	const [stationsGeoJson, stationsMetadata] = await Promise.all([
		fetchStations(),
		api().getStationsMetadata(),
	]);

	// pass locale information from "server-context" to "shared server + client context"
	return { locale, stationsGeoJson, stationsMetadata };
};

import { fetchStations } from "$lib/stores/mapData";
import { api } from "$lib/utils/api";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals: { locale }, url }) => {
	const [stationsGeoJson, stationsMetadata] = await Promise.all([
		fetchStations(),
		api().getStationsMetadata()
	]);

	const initialStationIds =
		url.searchParams.get('selectedStations')?.split(',').filter(Boolean) || [];
	// pass locale information from "server-context" to "shared server + client context"
	return { locale, stationsGeoJson, stationsMetadata, initialStationIds };
};

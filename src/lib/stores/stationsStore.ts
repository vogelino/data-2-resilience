import { browser } from "$app/environment";
import { writable } from "svelte/store";
import { queryParam, ssp } from "sveltekit-search-params";

const defaultStations = ["DEC005304", "DEC005476", "DEC00546E"];
const urlStations = writable(defaultStations);
const queryParamStations = queryParam(
	"selectedStations",
	ssp.string(defaultStations.join(",")),
);
let initialized = false;

export function useStations(initialData: string[] = []) {
	if (!browser) return writable(initialData);
	if (browser) {
		queryParamStations.subscribe((value) => {
			if (!initialized) {
				const parsedIds = parseUrlStations(value);
				urlStations.set(parsedIds.filter(Boolean).toSorted());
				initialized = true;
			}
		});
	}
	return urlStations;
}

export function toggleStationSelection(stationId?: string) {
	if (!stationId) return;
	urlStations.update((stations) => {
		const alreadySelected = stations.includes(stationId);
		const newStations = alreadySelected
			? stations.filter((id) => id !== stationId)
			: [...stations, stationId];
		const parsedNewStations = parseStations(newStations);
		queryParamStations.set(parsedNewStations.join(","));
		return parsedNewStations;
	});
}

export function selectStation(stationId?: string) {
	if (!stationId) return;
	urlStations.update((stations) => {
		const newIds = [...stations, stationId];
		const parsedNewStations = parseStations(newIds);
		queryParamStations.set(parsedNewStations.join(","));
		return parsedNewStations;
	});
}

export function deselectStation(stationId?: string) {
	if (!stationId) return;
	urlStations.update((stations) => {
		const newIds = stations.filter((id) => id !== stationId);
		const parsedNewStations = parseStations(newIds);
		queryParamStations.set(parsedNewStations.join(","));
		return parsedNewStations;
	});
}

export function deselectAllStations() {
	urlStations.set([]);
	queryParamStations.set("");
}

function parseUrlStations(urlStations: string) {
	return parseStations(urlStations.split(","));
}

function parseStations(stations: string[]) {
	return [
		...new Set(
			stations
				.map((id) => id.trim())
				.filter(Boolean)
				.toSorted(),
		),
	];
}

import { derived, writable } from 'svelte/store';

export const selectedStations = writable([] as string[]);
export const hoveredStation = writable<string | null>(null);
export const stationsWithPopup = derived(
	[hoveredStation, selectedStations],
	([hoveredStation, selectedStations]) => {
		return [...selectedStations, hoveredStation].filter((s) => s !== null);
	}
);

export const unselectAllStations = () => {
	selectedStations.set([]);
};

export const unselectStation = (stationId: string) => {
	selectedStations.update((value) => {
		const newStationIds = value.filter((s) => s !== stationId);
		return newStationIds;
	});
};

export const selectStation = (stationId: string) => {
	selectedStations.update((value) => [...value, stationId]);
};

export const toggleStationSelection = (stationId: string) => {
	selectedStations.update((value) => {
		if (value.includes(stationId)) return value.filter((s) => s !== stationId);
		return [...value, stationId];
	});
};

export const hoverStation = (stationId: string) => {
	hoveredStation.set(stationId);
};

export const unhoverStations = () => {
	hoveredStation.set(null);
};

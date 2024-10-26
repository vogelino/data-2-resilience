import { writable } from 'svelte/store';

export const selectedStations = writable(['DEC005304', 'DEC005476', 'DEC00546E'] as string[]);

export const unselectAllStations = () => {
	selectedStations.set([]);
};

export const toggleStationSelection = (stationId?: string) => {
	if (!stationId) return;
	selectedStations.update((value) => {
		if (value.includes(stationId)) return value.filter((s) => s !== stationId);
		return [...value, stationId];
	});
};

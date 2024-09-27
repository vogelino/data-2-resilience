import { writable } from 'svelte/store';

export const selectedUnit = writable('utci');

export const selectUnit = (unit: string) => {
	selectedUnit.set(unit);
};

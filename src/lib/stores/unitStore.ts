import { writable } from 'svelte/store';

export const selectedUnit = writable('air_temperature');

export const selectUnit = (unit: string) => {
	selectedUnit.set(unit);
};

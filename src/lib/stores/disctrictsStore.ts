import { derived, writable } from 'svelte/store';

export const selectedDistricts = writable([] as string[]);
export const hoveredDistrict = writable<string | null>(null);
export const districtsWithPopup = derived(
	[hoveredDistrict, selectedDistricts],
	([hoveredDistrict, selectedDistricts]) => {
		return [...selectedDistricts, hoveredDistrict].filter((s) => s !== null);
	}
);

export const unselectAllDistricts = () => {
	selectedDistricts.set([]);
};

export const unselectDistrict = (districtId: string) => {
	selectedDistricts.update((value) => {
		const newDistrictIds = value.filter((s) => s !== districtId);
		return newDistrictIds;
	});
};

export const selectDistrict = (districtId: string) => {
	selectedDistricts.update((value) => [...value, districtId]);
};

export const toggleDistrictSelection = (districtId: string) => {
	selectedDistricts.update((value) => {
		if (value.includes(districtId)) return value.filter((s) => s !== districtId);
		return [...value, districtId];
	});
};

export const hoverDistrict = (districtId: string) => {
	hoveredDistrict.set(districtId);
};

export const unhoverDistricts = () => {
	hoveredDistrict.set(null);
};

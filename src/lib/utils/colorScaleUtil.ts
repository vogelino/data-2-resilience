import { scaleOrdinal, scaleSequential } from 'd3-scale';
import { interpolateTurbo } from 'd3-scale-chromatic';

export const schemeTurbo = [
	'rgb(0, 0, 131)',
	'rgb(0, 60, 170)',
	'rgb(5, 255, 255)',
	'rgb(255, 255, 0)',
	'rgb(250, 0, 0)',
	'rgb(128, 0, 0)'
];

export const unitsToScalesMap = {
	default: {
		type: 'sequential',
		fn: scaleSequential(interpolateTurbo).domain([0, 100])
	},
	utci: {
		type: 'sequential',
		fn: scaleSequential(interpolateTurbo).domain([-40, 45])
	},
	utci_category: {
		type: 'ordinal',
		fn: scaleOrdinal(schemeTurbo)
	},
	pet: {
		type: 'sequential',
		fn: scaleSequential(interpolateTurbo).domain([4, 41])
	},
	pet_category: {
		type: 'ordinal',
		fn: scaleOrdinal(schemeTurbo)
	}
};

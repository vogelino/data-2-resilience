import { quantize } from 'd3-interpolate';
import { scaleOrdinal, scaleSequential, type ScaleOrdinal, type ScaleSequential } from 'd3-scale';
import {
	interpolateBlues,
	interpolateBrBG,
	interpolateReds,
	interpolateSpectral,
	interpolateTurbo,
	interpolateViridis,
	interpolateYlGnBu,
	interpolateYlOrBr
} from 'd3-scale-chromatic';

const schemeTurboSquential: readonly string[] = quantize(interpolateTurbo, 10);
const schemeTurboOrdinal: readonly string[] = quantize(interpolateTurbo, 10);
const schemeBrBG: readonly string[] = quantize(interpolateBrBG, 10).toReversed();

type SequentialScapeType = {
	type: 'sequential';
	fn: ScaleSequential<string, never>;
	scheme: readonly string[];
	min: number;
	max: number;
};

type OrdinalScaleType = {
	type: 'ordinal';
	fn: ScaleOrdinal<string, string, never>;
	scheme: readonly string[];
};

export const unitsToScalesMap = {
	default: {
		type: 'sequential',
		fn: scaleSequential(interpolateBrBG).domain([0, 100]),
		scheme: schemeBrBG,
		min: 0,
		max: 100
	},
	air_temperature: {
		type: 'sequential',
		fn: scaleSequential(interpolateSpectral).domain([50, -20]),
		scheme: quantize(interpolateSpectral, 10).toReversed(),
		min: -20,
		max: 50
	},
	absolute_humidity: {
		type: 'sequential',
		fn: scaleSequential(interpolateBlues).domain([0, 30]),
		scheme: quantize(interpolateBlues, 10),
		min: 0,
		max: 30
	},
	atmospheric_pressure: {
		type: 'sequential',
		fn: scaleSequential(interpolateYlGnBu).domain([950, 1050]),
		scheme: quantize(interpolateYlGnBu, 10),
		min: 950,
		max: 1050
	},
	atmospheric_pressure_reduced: {
		type: 'sequential',
		fn: scaleSequential(interpolateYlGnBu).domain([950, 1050]),
		scheme: quantize(interpolateYlGnBu, 10),
		min: 950,
		max: 1050
	},
	dew_point: {
		type: 'sequential',
		fn: scaleSequential(interpolateBlues).domain([-10, 30]),
		scheme: quantize(interpolateBlues, 10),
		min: -10,
		max: 30
	},
	heat_index: {
		type: 'sequential',
		fn: scaleSequential(interpolateReds).domain([20, 50]),
		scheme: quantize(interpolateReds, 10),
		min: 20,
		max: 50
	},
	lightning_average_distance: {
		type: 'sequential',
		fn: scaleSequential(interpolateYlOrBr).domain([0, 20]),
		scheme: quantize(interpolateYlOrBr, 10),
		min: 0,
		max: 20
	},
	lightning_strike_count: {
		type: 'sequential',
		fn: scaleSequential(interpolateReds).domain([0, 100]),
		scheme: quantize(interpolateReds, 10),
		min: 0,
		max: 100
	},
	maximum_wind_speed: {
		type: 'sequential',
		fn: scaleSequential(interpolateViridis).domain([0, 40]),
		scheme: quantize(interpolateViridis, 10),
		min: 0,
		max: 40
	},
	mrt: {
		type: 'sequential',
		fn: scaleSequential(interpolateSpectral).domain([50, -10]),
		scheme: quantize(interpolateSpectral, 10).toReversed(),
		min: -10,
		max: 50
	},
	pet: {
		type: 'sequential',
		fn: scaleSequential(interpolateTurbo).domain([4, 41]),
		scheme: schemeTurboSquential,
		min: 4,
		max: 41
	},
	pet_category: {
		type: 'ordinal',
		fn: scaleOrdinal(schemeTurboSquential),
		scheme: schemeTurboOrdinal
	},
	precipitation_sum: {
		type: 'sequential',
		fn: scaleSequential(interpolateBlues).domain([0, 200]),
		scheme: quantize(interpolateBlues, 10),
		min: 0,
		max: 200
	},
	relative_humidity: {
		type: 'sequential',
		fn: scaleSequential(interpolateBlues).domain([0, 100]),
		scheme: quantize(interpolateBlues, 10),
		min: 0,
		max: 100
	},
	solar_radiation: {
		type: 'sequential',
		fn: scaleSequential(interpolateYlOrBr).domain([0, 1000]),
		scheme: quantize(interpolateYlOrBr, 10),
		min: 0,
		max: 1000
	},
	utci: {
		type: 'sequential',
		fn: scaleSequential(interpolateTurbo).domain([-40, 45]),
		scheme: schemeTurboSquential,
		min: -40,
		max: 45
	},
	utci_category: {
		type: 'ordinal',
		fn: scaleOrdinal(schemeTurboSquential),
		scheme: schemeTurboOrdinal
	},
	vapor_pressure: {
		type: 'sequential',
		fn: scaleSequential(interpolateYlGnBu).domain([0, 40]),
		scheme: quantize(interpolateYlGnBu, 10),
		min: 0,
		max: 40
	},
	wet_bulb_temperature: {
		type: 'sequential',
		fn: scaleSequential(interpolateSpectral).domain([0, 50]),
		scheme: quantize(interpolateSpectral, 10),
		min: 0,
		max: 50
	},
	wind_direction: {
		type: 'ordinal',
		fn: scaleOrdinal(schemeBrBG),
		scheme: schemeBrBG
	},
	wind_speed: {
		type: 'sequential',
		fn: scaleSequential(interpolateBlues).domain([0, 40]),
		scheme: quantize(interpolateBlues, 10),
		min: 0,
		max: 40
	}
} satisfies Record<string, SequentialScapeType | OrdinalScaleType>;

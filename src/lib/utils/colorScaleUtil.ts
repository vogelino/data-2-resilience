import type { TranslationFunctions } from '$i18n/i18n-types';
import { interpolateRgb, quantize } from 'd3-interpolate';
import { scaleLinear, scaleOrdinal, scaleSequential } from 'd3-scale';
import {
	interpolateBlues,
	interpolateRainbow,
	interpolateReds,
	interpolateSpectral,
	interpolateTurbo,
	interpolateViridis,
	interpolateYlGnBu,
	interpolateYlOrBr
} from 'd3-scale-chromatic';
import { getHealthRiskKeyByValue, healthRisksRanges } from './healthRisksUtil';

const schemeTurboSquential: readonly string[] = quantize(interpolateTurbo, 10);
const schemeTurboOrdinal: readonly string[] = quantize(interpolateTurbo, 10);
export const schemeBrBG: readonly string[] = quantize(interpolateRainbow, 10).toReversed();

type SequentialScapeInputType = {
	type: 'sequential';
	scheme: readonly string[];
	perc5: number;
	perc95: number;
	validMin: number;
	validMax: number;
	fraction: number;
};

type SequentialScapeType = Pick<SequentialScapeInputType, 'type' | 'scheme'> & {
	min: number;
	max: number;
};

type OrdinalScaleType = {
	type: 'ordinal';
	scheme: readonly string[];
};

export const unitsToScalesMap = {
	default: {
		type: 'sequential',
		scheme: schemeBrBG,
		perc5: 0,
		perc95: 100,
		validMin: 0,
		validMax: 100,
		fraction: 1
	},
	air_temperature: {
		type: 'sequential',
		scheme: quantize(interpolateSpectral, 10).toReversed(),
		perc5: 0,
		perc95: 24,
		validMin: -Infinity,
		validMax: Infinity,
		fraction: 0.25
	},
	absolute_humidity: {
		type: 'sequential',
		scheme: quantize(interpolateBlues, 10),
		perc5: 3,
		perc95: 14,
		validMin: 0,
		validMax: Infinity,
		fraction: 0.3
	},
	atmospheric_pressure: {
		type: 'sequential',
		scheme: quantize(interpolateYlGnBu, 10),
		perc5: 983,
		perc95: 1016,
		validMin: 860,
		validMax: 1055,
		fraction: 0.3
	},
	atmospheric_pressure_reduced: {
		type: 'sequential',
		scheme: quantize(interpolateYlGnBu, 10),
		perc5: 998,
		perc95: 1031,
		validMin: 860,
		validMax: 1055,
		fraction: 0.3
	},
	dew_point: {
		type: 'sequential',
		scheme: quantize(interpolateBlues, 10),
		perc5: -3,
		perc95: 17,
		validMin: -Infinity,
		validMax: Infinity,
		fraction: 0.3
	},
	heat_index: {
		type: 'sequential',
		scheme: quantize(interpolateReds, 10),
		perc5: -3,
		perc95: 25,
		validMin: -Infinity,
		validMax: Infinity,
		fraction: 0.3
	},
	lightning_average_distance: {
		type: 'sequential',
		scheme: quantize(interpolateYlOrBr, 10),
		perc5: 0,
		perc95: 15,
		validMin: 0,
		validMax: Infinity,
		fraction: 0.3
	},
	lightning_strike_count: {
		type: 'sequential',
		scheme: quantize(interpolateReds, 10),
		perc5: 0,
		perc95: 30,
		validMin: 0,
		validMax: Infinity,
		fraction: 0.3
	},
	maximum_wind_speed: {
		type: 'sequential',
		scheme: quantize(interpolateViridis, 10),
		perc5: 0,
		perc95: 8,
		validMin: 0,
		validMax: Infinity,
		fraction: 0.3
	},
	mrt: {
		type: 'sequential',
		scheme: quantize(interpolateSpectral, 10).toReversed(),
		perc5: -4,
		perc95: 44,
		validMin: -Infinity,
		validMax: Infinity,
		fraction: 0.3
	},
	pet: {
		type: 'sequential',
		scheme: schemeTurboSquential,
		perc5: -5,
		perc95: 25,
		validMin: -Infinity,
		validMax: Infinity,
		fraction: 0.7
	},
	pet_category: {
		type: 'ordinal',
		scheme: schemeTurboOrdinal
	},
	precipitation_sum: {
		type: 'sequential',
		scheme: quantize(interpolateBlues, 10),
		perc5: 0,
		perc95: 5,
		validMin: 0,
		validMax: Infinity,
		fraction: 0.1
	},
	relative_humidity: {
		type: 'sequential',
		scheme: quantize(interpolateBlues, 10),
		perc5: 3,
		perc95: 14,
		validMin: 0,
		validMax: Infinity,
		fraction: 0.3
	},
	solar_radiation: {
		type: 'sequential',
		scheme: quantize(interpolateYlOrBr, 10),
		perc5: 0,
		perc95: 603,
		validMin: 0,
		validMax: 1400,
		fraction: 0.3
	},
	utci: {
		type: 'sequential',
		scheme: schemeTurboSquential,
		perc5: -3,
		perc95: 24,
		validMin: -Infinity,
		validMax: Infinity,
		fraction: 0.7
	},
	utci_category: {
		type: 'ordinal',
		scheme: schemeTurboOrdinal
	},
	vapor_pressure: {
		type: 'sequential',
		scheme: quantize(interpolateYlGnBu, 10),
		perc5: 4,
		perc95: 16,
		validMin: 0,
		validMax: Infinity,
		fraction: 0.3
	},
	wet_bulb_temperature: {
		type: 'sequential',
		scheme: quantize(interpolateSpectral, 10),
		perc5: -2,
		perc95: 16,
		validMin: -Infinity,
		validMax: Infinity,
		fraction: 0.3
	},
	wind_direction: {
		type: 'sequential',
		scheme: schemeBrBG,
		perc5: 0,
		perc95: 4,
		validMin: 0,
		validMax: Infinity,
		fraction: 0.3
	},
	wind_speed: {
		type: 'sequential',
		scheme: quantize(interpolateBlues, 10),
		perc5: 0,
		perc95: 4,
		validMin: 0,
		validMax: Infinity,
		fraction: 0.3
	}
} satisfies Record<string, SequentialScapeInputType | OrdinalScaleType>;

interface ColorMapRange {
	type: 'range';
	scheme: string[];
	min: number;
	max: number;
}

function computeColormapRanges(
	values: Array<number | null>,
	paramObj: SequentialScapeInputType
): [number, number] {
	const filteredValues = values.filter((val) => val !== null) as number[];
	const dataMin = Math.min(...filteredValues);
	const dataMax = Math.max(...filteredValues);
	const dataRange = dataMax - dataMin;
	const expectedRange = paramObj.perc95 - paramObj.perc5;
	const minimumRange = Math.abs(expectedRange * paramObj.fraction);

	let vMin = dataMin;
	let vMax = dataMax;

	if (dataRange < minimumRange) {
		if (dataRange === 0) {
			vMin = dataMin - minimumRange / 2;
			vMax = dataMax + minimumRange / 2;
		} else {
			const valDiff = minimumRange - dataRange;
			vMin = dataMin - valDiff / 2;
			vMax = dataMax + valDiff / 2;
		}
	}

	if (vMin < paramObj.perc5 && isFinite(paramObj.perc5)) {
		vMin = paramObj.perc5;
	}
	if (vMax > paramObj.perc95 && isFinite(paramObj.perc95)) {
		vMax = paramObj.perc95;
	}

	return [vMin, vMax];
}

type ColorStop = { color: string; position: number };
type ColorStops = ColorStop[];
const healthRiskUnits = ['utci', 'pet'] as const;
type HealthRiskUnit = (typeof healthRiskUnits)[number];

const isOrdinalUnit = (unit: string) => unit.trim().toLowerCase().endsWith('_category');
export const isHealthRiskUnit = (unit: string) => {
	const u = unit.trim().toLowerCase();
	return healthRiskUnits.includes(u as HealthRiskUnit);
};
const getUnit = (unit: string) =>
	unitsToScalesMap[unit as keyof typeof unitsToScalesMap] || unitsToScalesMap.default;
const isValidHealthRiskUnitValue = (value: unknown) =>
	typeof value === 'number' && Math.abs(value as number) !== Infinity;
const filterOutInfinity = <T extends number>(arr: T[]) => arr.filter(isValidHealthRiskUnitValue);
const getHealthRiskUnitThresholds = (unit: HealthRiskUnit) => {
	return Object.values(healthRisksRanges).map((range) => range[unit]);
};
const getHealthRiskUnitBounds = (unit: HealthRiskUnit) => {
	const thresholds = getHealthRiskUnitThresholds(unit);
	const allValues = thresholds.flatMap((t) => [t.min, t.max]);
	return [Math.min(...filterOutInfinity(allValues)), Math.max(...filterOutInfinity(allValues))];
};

const getHealthRiskUnitColorStops = (unit: HealthRiskUnit): ColorStops => {
	const healthRiskThresholds = getHealthRiskUnitThresholds(unit);
	const [min, max] = getHealthRiskUnitBounds(unit);
	const validThresholds = healthRiskThresholds.filter(
		(t) => isValidHealthRiskUnitValue(t.min) && isValidHealthRiskUnitValue(t.max)
	);
	const scheme = quantize(interpolateTurbo, validThresholds.length);
	const stops = validThresholds.map(({ min: tMin, max: tMax }, i) => {
		const start = ((tMin - min) / (max - min)) * 100;
		const end = ((tMax - min) / (max - min)) * 100;
		const halfway = (start + end) / 2;
		return {
			color: scheme[i],
			position: halfway
		};
	});
	return [stops[0], ...stops, stops[stops.length - 1]];
};

export const getColorStops = (params: { unit: string; LL: TranslationFunctions }): ColorStops => {
	const { unit } = params;
	const colors = getColorsByUnit(params);
	if (isHealthRiskUnit(unit)) return getHealthRiskUnitColorStops(unit as HealthRiskUnit);
	const stops = colors.map((color, i) => ({ color, position: (i / (colors.length - 1)) * 100 }));
	return stops;
};

export function getColorScaleFn(params: {
	unit: string;
	LL: TranslationFunctions;
	values: (number | string)[];
}) {
	const { unit } = params;
	const unitConfig = getUnit(unit);
	if (unitConfig.type === 'ordinal') return scaleOrdinal(unitConfig.scheme);

	function customInterpolator(t: number) {
		const stops = getColorStops(params);
		const scale = scaleLinear<string>()
			.domain(stops.map((s) => s.position / 100))
			.range(stops.map((s) => s.color))
			.interpolate(interpolateRgb);
		return scale(t);
	}
	const allNumValues = params.values.filter((v) => typeof v === 'number');
	const domain =
		isHealthRiskUnit(unit) && params.values.every((v) => typeof v === 'number')
			? getHealthRiskUnitBounds(unit as HealthRiskUnit)
			: computeColormapRanges(allNumValues, unitConfig);
	return scaleSequential(customInterpolator).domain(domain);
}

export function getColorScaleValue(params: {
	unit: string;
	LL: TranslationFunctions;
	value: number | string;
	values: (number | string)[];
}) {
	const { unit, LL, value } = params;

	const isWindDirectionUnit = unit.startsWith('wind_direction');
	if (isWindDirectionUnit) return 'hsl(var(--muted-foreground))';

	const scale = getColorScaleFn(params);
	const categories = Object.keys(
		LL.map.choroplethLegend.healthRisks
	) as unknown as keyof typeof LL.map.choroplethLegend.healthRisks;

	const isHealthUnit = isHealthRiskUnit(unit);
	if (isOrdinalUnit(unit) || isHealthUnit) {
		const val = isHealthUnit
			? getHealthRiskKeyByValue({ value, unit: unit as 'utci' | 'pet' })
			: value;
		const categoryIndex = categories.indexOf(val as string);
		if (categoryIndex === -1) return 'hsl(var(--muted-foreground))';
		const colors = getColorsByUnit({ unit, LL });
		return colors[categoryIndex];
	}

	return scale(value as { valueOf(): number } & string);
}

function getColorsByUnit({ unit, LL }: { unit: string; LL: TranslationFunctions }) {
	const colorScale = getUnit(unit);
	const titleKey = isOrdinalUnit(unit) ? 'heatStress' : 'thermalComfort';
	const healthRisksCount = Object.values(LL.map.choroplethLegend.healthRisks).filter(
		(item) => !!item.title[titleKey]()
	).length;
	const colors = (colorScale.scheme as string[]).slice(-healthRisksCount);
	return colors;
}

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

const schemeTurboSquential: readonly string[] = quantize(interpolateTurbo, 10);
const schemeTurboOrdinal: readonly string[] = quantize(interpolateTurbo, 10);
export const schemeBrBG: readonly string[] = quantize(interpolateRainbow, 10).toReversed();

type SequentialScapeType = {
	type: 'sequential';
	scheme: readonly string[];
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
		min: 0,
		max: 100
	},
	air_temperature: {
		type: 'sequential',
		scheme: quantize(interpolateSpectral, 10).toReversed(),
		min: -20,
		max: 50
	},
	absolute_humidity: {
		type: 'sequential',
		scheme: quantize(interpolateBlues, 10),
		min: 0,
		max: 30
	},
	atmospheric_pressure: {
		type: 'sequential',
		scheme: quantize(interpolateYlGnBu, 10),
		min: 950,
		max: 1050
	},
	atmospheric_pressure_reduced: {
		type: 'sequential',
		scheme: quantize(interpolateYlGnBu, 10),
		min: 950,
		max: 1050
	},
	dew_point: {
		type: 'sequential',
		scheme: quantize(interpolateBlues, 10),
		min: -10,
		max: 30
	},
	heat_index: {
		type: 'sequential',
		scheme: quantize(interpolateReds, 10),
		min: 20,
		max: 50
	},
	lightning_average_distance: {
		type: 'sequential',
		scheme: quantize(interpolateYlOrBr, 10),
		min: 0,
		max: 20
	},
	lightning_strike_count: {
		type: 'sequential',
		scheme: quantize(interpolateReds, 10),
		min: 0,
		max: 100
	},
	maximum_wind_speed: {
		type: 'sequential',
		scheme: quantize(interpolateViridis, 10),
		min: 0,
		max: 40
	},
	mrt: {
		type: 'sequential',
		scheme: quantize(interpolateSpectral, 10).toReversed(),
		min: -10,
		max: 50
	},
	pet: {
		type: 'sequential',
		scheme: schemeTurboSquential,
		min: 4,
		max: 41
	},
	pet_category: {
		type: 'ordinal',
		scheme: schemeTurboOrdinal
	},
	precipitation_sum: {
		type: 'sequential',
		scheme: quantize(interpolateBlues, 10),
		min: 0,
		max: 200
	},
	relative_humidity: {
		type: 'sequential',
		scheme: quantize(interpolateBlues, 10),
		min: 0,
		max: 100
	},
	solar_radiation: {
		type: 'sequential',
		scheme: quantize(interpolateYlOrBr, 10),
		min: 0,
		max: 1000
	},
	utci: {
		type: 'sequential',
		scheme: schemeTurboSquential,
		min: -40,
		max: 45
	},
	utci_category: {
		type: 'ordinal',
		scheme: schemeTurboOrdinal
	},
	vapor_pressure: {
		type: 'sequential',
		scheme: quantize(interpolateYlGnBu, 10),
		min: 0,
		max: 40
	},
	wet_bulb_temperature: {
		type: 'sequential',
		scheme: quantize(interpolateSpectral, 10),
		min: 0,
		max: 50
	},
	wind_direction: {
		type: 'sequential',
		scheme: schemeBrBG,
		min: 0,
		max: 360
	},
	wind_speed: {
		type: 'sequential',
		scheme: quantize(interpolateBlues, 10),
		min: 0,
		max: 40
	}
} satisfies Record<string, SequentialScapeType | OrdinalScaleType>;

export function getColorScaleFn(params: { unit: string; LL: TranslationFunctions }) {
	const { unit, LL } = params;
	const { colors, colorScale } = getColorsByUnit({ unit, LL });
	if (colorScale.type === 'ordinal') return scaleOrdinal(colors);
	function customInterpolator(t: number) {
		const numColors = colors.length;
		const domainStops = Array.from(Array(numColors).keys()).map((i) => i / (numColors - 1));
		const scale = scaleLinear<string>()
			.domain(domainStops)
			.range(colors)
			.interpolate(interpolateRgb);
		return scale(t);
	}
	return scaleSequential(customInterpolator).domain([colorScale.min, colorScale.max]);
}

export function getColorScaleValue(params: {
	unit: string;
	LL: TranslationFunctions;
	value: number | string;
}) {
	const { unit, LL, value } = params;
	const isWindDirectionUnit = unit.startsWith('wind_direction');
	if (isWindDirectionUnit) return 'hsl(var(--muted-foreground))';
	const scale = getColorScaleFn(params);
	const categories = Object.keys(LL.map.choroplethLegend.healthRisks);
	const { colors } = getColorsByUnit({ unit, LL });
	if (unit.endsWith('_category')) {
		const categoryIndex = categories.indexOf(value as string);
		if (categoryIndex === -1) return 'hsl(var(--muted-foreground))';
		return colors[categoryIndex];
	}
	return scale(value as { valueOf(): number } & string);
}

function getColorsByUnit({ unit, LL }: { unit: string; LL: TranslationFunctions }) {
	const colorScale =
		unitsToScalesMap[unit as keyof typeof unitsToScalesMap] || unitsToScalesMap.default;
	const titleKey = unit.endsWith('_category') ? 'heatStress' : 'thermalComfort';
	const healthRisksCount = Object.values(LL.map.choroplethLegend.healthRisks).filter(
		(item) => !!item.title[titleKey]()
	).length;
	const colors = (colorScale.scheme as string[]).slice(-healthRisksCount);
	return { colors, healthRisksCount, colorScale };
}

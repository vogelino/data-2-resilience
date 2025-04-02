import type { TranslationFunctions } from '$i18n/i18n-types';
import { cn } from '$lib/utils';
import { getColorScaleValue } from './colorScaleUtil';
import { getHeatStressCategoryByValue } from './heatStressCategoriesUtil';
export const healthRisksRanges = {
	'extreme cold stress': {
		pet: {
			min: -Infinity,
			max: -Infinity
		},
		utci: {
			min: -Infinity,
			max: -40
		}
	},
	'very strong cold stress': {
		pet: {
			min: -Infinity,
			max: 4
		},
		utci: {
			min: -40,
			max: -27
		}
	},
	'strong cold stress': {
		pet: {
			min: 4,
			max: 8
		},
		utci: {
			min: -27,
			max: -13
		}
	},
	'moderate cold stress': {
		pet: {
			min: 8,
			max: 13
		},
		utci: {
			min: -13,
			max: 0
		}
	},
	'slight cold stress': {
		pet: {
			min: 13,
			max: 18
		},
		utci: {
			min: 0,
			max: 9
		}
	},
	'no thermal stress': {
		pet: {
			min: 18,
			max: 23
		},
		utci: {
			min: 9,
			max: 26
		}
	},
	'moderate heat stress': {
		pet: {
			min: 23,
			max: 29
		},
		utci: {
			min: 26,
			max: 32
		}
	},
	'strong heat stress': {
		pet: {
			min: 29,
			max: 35
		},
		utci: {
			min: 32,
			max: 38
		}
	},
	'very strong heat stress': {
		pet: {
			min: 35,
			max: 41
		},
		utci: {
			min: 38,
			max: 46
		}
	},
	'extreme heat stress': {
		pet: {
			min: 41,
			max: Infinity
		},
		utci: {
			min: 46,
			max: Infinity
		}
	}
};

export function getHealthRiskKeyByValue({
	unit,
	value
}: {
	unit: 'utci' | 'pet';
	value: number | string | undefined | null;
}) {
	if (unit !== 'utci' && unit !== 'pet') return null;
	if (typeof value === 'string') return value;
	return Object.entries(healthRisksRanges).reduce(
		(acc, [key, range]) => {
			const { min, max } = range[unit];
			if (typeof value !== 'number') return acc;
			if (value >= min && value < max) {
				return key;
			}
			return acc;
		},
		null as string | null
	);
}

export function getHealthRiskPill({
	value,
	unit,
	LL,
	withLabel = false
}: {
	value: number | string | undefined | null;
	unit: string;
	LL: TranslationFunctions;
	withLabel?: boolean;
}) {
	const isOrdinal = unit.trim().endsWith('_category');
	const unitWithoutCategory = unit.replace(/_category$/, '');
	const isHealthRiskUnit = unitWithoutCategory === 'utci' || unitWithoutCategory === 'pet';

	const healthRisks = LL.map.choroplethLegend.healthRisks;
	const titleKey = isHealthRiskUnit ? ('heatStress' as const) : ('thermalComfort' as const);
	let healthRisk: (typeof healthRisks)[keyof typeof healthRisks] | null = null;
	let color: string | null = null;

	if (typeof value === 'string') {
		healthRisk = healthRisks[value as keyof typeof healthRisks];
		color = getColorScaleValue({
			unit,
			LL,
			value: value as unknown as number
		});
	} else if (typeof value === 'number') {
		const key = getHealthRiskKeyByValue({ value, unit: unitWithoutCategory as 'utci' | 'pet' });
		if (key) {
			healthRisk = healthRisks[key as keyof typeof healthRisks];
		}
		color = getColorScaleValue({
			unit,
			LL,
			value: isOrdinal && isHealthRiskUnit ? getHeatStressCategoryByValue(value as number) : value
		});
	}

	let healthRiskLabel = healthRisk?.title[titleKey]() || '';

	const isUnavailable = value === null;
	const isUnsupported = typeof value === 'undefined';

	if (isUnavailable) {
		healthRiskLabel = LL.map.choroplethLegend.noValueAvailable();
	} else if (isUnsupported) {
		healthRiskLabel = LL.map.choroplethLegend.notCollectingData();
	}

	return `
		<span
			class="${cn(
				'relative size-3 rounded-full',
				isUnavailable && 'bg-warning/20',
				isUnsupported && 'bg-muted-foreground/20'
			)}"
			style="${cn(color && `background-color: ${color};`)}"
		>
			<span
				class="${cn(
					'absolute inset-0 rounded-full border',
					!isUnavailable && !isUnsupported && `border-black/20 mix-blend-multiply`,
					isUnavailable && 'border-warning border-2',
					isUnsupported && 'border-muted-foreground'
				)}"
			></span>
		</span>
		${cn(
			withLabel &&
				`
				<span class="${cn((isUnavailable || isUnsupported) && 'text-muted-foreground')}">
					${healthRiskLabel}
				</span>
			`
		)}
	`;
}

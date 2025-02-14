import type { TranslationFunctions } from '$i18n/i18n-types';
import type { DailyStationRecord } from '$lib/utils/useStationsDaily';

type BaseDataRecord = {
	id: string;
	label: string;
	count: number;
	ids: string[];
};
export type OrdinalDataRecord = BaseDataRecord & {
	type: 'ordinal';
	value: string;
};
export type NumericalDataRecord = BaseDataRecord & {
	type: 'numerical';
	start: number;
	end: number;
};
export type DataRecord = OrdinalDataRecord | NumericalDataRecord;

function getSignificantFigures(num: number): number {
	return Math.max(0, Math.floor(Math.log10(num)));
}

function getRounder(significantFigures: number): (value: number) => number {
	const rounder = (value: number) => {
		return Math.round(value / Math.pow(10, significantFigures)) * Math.pow(10, significantFigures);
	};
	return rounder;
}

export function getChartValueRounder(allValues: number[]): (value: number) => number {
	const maxValue = Math.max(...allValues);
	const minValue = Math.min(...allValues);
	const range = maxValue - minValue;
	const significantFigures = getSignificantFigures(range);
	const rounder = getRounder(significantFigures);
	return rounder;
}

export function getOrdinalBins({
	allUniqueOrdinalValues,
	selectedOrdinalValues
}: {
	allUniqueOrdinalValues: string[];
	selectedOrdinalValues: { ordinalValue: string; id: string }[];
}) {
	const map = allUniqueOrdinalValues.reduce((acc, ordinalValue) => {
		const existingIdsSet = acc.get(ordinalValue) || new Set<string>();
		for (const { ordinalValue: selectedOrdinalValue, id } of selectedOrdinalValues) {
			if (selectedOrdinalValue === ordinalValue) {
				existingIdsSet.add(id);
			}
		}
		acc.set(ordinalValue, existingIdsSet);
		return acc;
	}, new Map<string, Set<string>>());
	return Array.from(map.entries()).map(([ordinalValue, idsSet]) => ({
		ordinalValue,
		ids: Array.from(idsSet)
	}));
}

export function createCategoryBins({
	allUniqueOrdinalValues,
	ordinalValuesSelected,
	allOrdinalValues,
	translations
}: {
	allUniqueOrdinalValues: string[];
	ordinalValuesSelected: DailyStationRecord[];
	allOrdinalValues: string[];
	translations: TranslationFunctions;
}) {
	const ordinalBins = getOrdinalBins({
		allUniqueOrdinalValues,
		selectedOrdinalValues: ordinalValuesSelected.map((item) => ({
			ordinalValue: item.value as unknown as string,
			id: item.id
		}))
	});

	return ordinalBins.map(({ ordinalValue, ids }, idx) => {
		const label =
			translations.map.choroplethLegend.healthRisks[
				ordinalValue as keyof typeof translations.map.choroplethLegend.healthRisks
			].title.heatStress();
		const count = getCountByOrdinalValue(ordinalValue, allOrdinalValues);
		return {
			type: 'ordinal',
			id: `category-bin-${ordinalValue}-${idx}`,
			label,
			value: ordinalValue,
			count,
			ids
		} satisfies OrdinalDataRecord;
	});
}

function getCountByOrdinalValue(ordinalValue: string, ordinalValues: string[]) {
	return ordinalValues.filter((value) => value === ordinalValue).length;
}

import type { TranslationFunctions } from '$i18n/i18n-types';

export function getHeatStressLabel(params: {
	unit: string;
	LL: TranslationFunctions;
	value: string;
}) {
	const { unit, LL, value } = params;
	const titleKey = unit.endsWith('_category') ? 'heatStress' : 'thermalComfort';
	return LL.map.choroplethLegend.healthRisks[
		value as keyof typeof LL.map.choroplethLegend.healthRisks
	].title[titleKey]();
}

type SortUnit = { value: string; label: string };
export function sortUnitByLabel(a: SortUnit, b: SortUnit, locale: string) {
	if (a.value.startsWith('utci') && !b.value.startsWith('utci')) return -1;
	if (!a.value.startsWith('utci') && b.value.startsWith('utci')) return 1;
	if (a.value.startsWith('utci') && b.value.startsWith('utci'))
		return a.label.length - b.label.length;
	return a.label.localeCompare(b.label, locale);
}

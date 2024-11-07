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

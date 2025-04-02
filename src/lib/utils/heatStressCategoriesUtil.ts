export const valueToCategoryMap = new Map<number, string>([
	[1, 'extreme cold stress'],
	[2, 'very strong cold stress'],
	[3, 'strong cold stress'],
	[4, 'moderate cold stress'],
	[5, 'slight cold stress'],
	[6, 'no thermal stress'],
	[7, 'moderate heat stress'],
	[8, 'strong heat stress'],
	[9, 'very strong heat stress'],
	[10, 'extreme heat stress']
]);

export function getHeatStressCategoryByValue(value: unknown) {
	if (typeof value !== 'number') return 'unknown';
	return valueToCategoryMap.get(value) || 'unknown';
}

export function getHeatStressValueByCategory(category: string) {
	for (const [key, value] of valueToCategoryMap.entries()) {
		if (value === category) return key;
	}
	return undefined;
}

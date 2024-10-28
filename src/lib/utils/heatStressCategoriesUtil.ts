const valueToCategoryMap = new Map<number, string>([
	[-5, 'extreme cold stress'],
	[-4, 'very strong cold stress'],
	[-3, 'strong cold stress'],
	[-2, 'moderate cold stress'],
	[-1, 'slight cold stress'],
	[0, 'no thermal stress'],
	[1, 'slight heat stress'],
	[2, 'moderate heat stress'],
	[3, 'strong heat stress'],
	[4, 'very strong heat stress'],
	[5, 'extreme heat stress']
]);

export function getHeatStressCategoryByValue(value: number) {
	return valueToCategoryMap.get(value) || 'unknown';
}

export function getHeatStressValueByCategory(category: string) {
	for (const [key, value] of valueToCategoryMap.entries()) {
		if (value === category) return key;
	}
	return undefined;
}

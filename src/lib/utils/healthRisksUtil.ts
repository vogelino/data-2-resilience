const ranges = {
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

export function getHealthRiskKeyByValue({ unit, value }: { unit: 'utci' | 'pet'; value: number }) {
	return Object.entries(ranges).reduce(
		(acc, [key, range]) => {
			const { min, max } = range[unit];
			if (value >= min && value < max) {
				return key;
			}
			return acc;
		},
		null as string | null
	);
}

import { browser } from '$app/environment';
import LL from '$i18n/i18n-svelte';
import { today } from '$lib/utils/dateUtil';
import { addDays, format } from 'date-fns';
import { debounce } from 'es-toolkit';
import { derived, writable } from 'svelte/store';
import { queryParam, ssp } from 'sveltekit-search-params';
import { z } from 'zod';

const options = { debounceHistory: 500 };

// RANGE START
const rangeStartDefault = -10;
const rangeStartQueryParam = queryParam('range_start', ssp.number(rangeStartDefault), options);
export const rangeStart = derived(rangeStartQueryParam, (value: number) =>
	validateQueryParam(value, z.number(), rangeStartDefault)
);
export const rangeStartDate = writable<Date>(addDays(today(), rangeStartDefault));
export const rangeStartKey = derived(rangeStartDate, (d) => d && format(d, 'yyyy-MM-dd'));
export const udpateRangeStart = debounce((d: number) => {
	if (!browser) return;
	udpateRangeStart?.cancel();
	rangeStartDate.set(addDays(today(), d));
}, 500);

if (browser) {
	rangeStart.subscribe(udpateRangeStart);
}

// RANGE END
const rangeEndDefault = 0;
const rangeEndQueryParam = queryParam('range_end', ssp.number(rangeEndDefault), options);
export const rangeEnd = derived(rangeEndQueryParam, (value: number) =>
	validateQueryParam(value, z.number(), rangeEndDefault)
);
export const rangeEndDate = writable<Date>(addDays(today(), rangeEndDefault));
export const rangeEndKey = derived(rangeEndDate, (d) => d && format(d, 'yyyy-MM-dd'));

export const updateRangeEnd = debounce((d: number) => {
	if (!browser) return;
	updateRangeEnd?.cancel();
	rangeEndDate.set(addDays(today(), d));
}, 500);

if (browser) {
	rangeEnd.subscribe(updateRangeEnd);
}

// SIDEBAR
const isLeftSidebarOpenedDefault = true;
const isLeftSidebarOpenedQueryParam = queryParam(
	'sidebar_open',
	ssp.boolean(isLeftSidebarOpenedDefault)
);
export const isLeftSidebarOpened = derived(isLeftSidebarOpenedQueryParam, (value: boolean) =>
	validateQueryParam(value, z.boolean(), isLeftSidebarOpenedDefault)
);
export const toggleLeftSidebar = () =>
	isLeftSidebarOpenedQueryParam.update((value: boolean) => !value);

// DAY VALUE
const dayValueDefault = 0;
const dayValueQueryParam = queryParam('day_value', ssp.number(dayValueDefault), options);
export const dayValue = derived(dayValueQueryParam, (value: number) =>
	validateQueryParam(value, z.number(), dayValueDefault)
);
export const dayStartDate = writable<Date>(addDays(today(), dayValueDefault - 1));
export const dayEndDate = writable<Date>(addDays(today(), dayValueDefault));
export const dayKey = derived(dayEndDate, (d) => d && format(d, 'yyyy-MM-dd'));

export const udpateDay = debounce((d: number) => {
	if (!browser) return;
	udpateRangeStart?.cancel();
	dayStartDate.set(addDays(today(), d - 1));
	dayEndDate.set(addDays(today(), d));
}, 500);

if (browser) {
	dayValue.subscribe(udpateDay);
}

// DATAVIS TYPE
const datavisTypeDefault = 'day' as const;
const datavisTypeQueryParam = queryParam('datavisType', ssp.string(datavisTypeDefault));
export const datavisType = derived(datavisTypeQueryParam, (value: string) =>
	validateQueryParam(value, z.enum(['day', 'hour', 'range']), datavisTypeDefault)
);
export const udpateDatavisType = (value: 'day' | 'hour' | 'range') => {
	datavisTypeQueryParam.set(value);
};

// UNIT
const unitDefault = 'utci' as const;
const unitQueryParam = queryParam('unit', ssp.string(unitDefault));
export const unit = derived(unitQueryParam, (value: string) =>
	validateQueryParam(value, z.string(), unitDefault)
);
export const updateUnit = (value: string) => {
	unitQueryParam.set(value);
};

export const minMaxAvg = writable<'min' | 'max' | 'avg'>('avg');
export const unitWithMinMaxAvg = derived(
	[unit, datavisType, minMaxAvg],
	([unit, datavisType, minMaxAvgState]) => {
		if (datavisType !== 'day') return unit;
		return minMaxAvgState === 'avg' ? unit : `${unit}_${minMaxAvgState}`;
	}
);
export const unitLabel = derived([unit, LL], ([u, ll]) => {
	return ll.pages.measurements.unitSelect.units[
		u as keyof typeof ll.pages.measurements.unitSelect.units
	].label();
});
export const unitOnly = derived([unit, LL], ([u, ll]) => {
	return ll.pages.measurements.unitSelect.units[
		u as keyof typeof ll.pages.measurements.unitSelect.units
	].unitOnly();
});

// SCALE
export const scale = derived(datavisType, (val) =>
	val === 'day' ? ('daily' as const) : ('hourly' as const)
);

// HOUR
const hourDefault = 12;
const hourQueryParam = queryParam('hour', ssp.number(hourDefault));
export const hour = derived(hourQueryParam, (value: number) =>
	validateQueryParam(value, z.number(), hourDefault)
);
export const isHourScale = derived(
	[scale, hour],
	([s, h]) => s === 'hourly' && typeof h === 'number'
);
export const hourKey = derived([isHourScale, hour], ([isH, h]) => (isH ? h : undefined));
export const udpateHour = (h: number) => {
	hourQueryParam.set(h);
};

// HEAT STRESS UNIT
const heatStressUnitDefault = 'utci';
const heatStressUnitQueryParam = queryParam('heatStress', ssp.string(heatStressUnitDefault));
export const heatStressUnit = derived(heatStressUnitQueryParam, (value: string) =>
	validateQueryParam(value, z.string(), heatStressUnitDefault)
);
export const updateHeatStressUnit = (value: string) => {
	heatStressUnitQueryParam.set(value);
};

// SEARCH QUERY
const searchQueryDefault = '';
const searchQueryQueryParam = queryParam('stationsSearch', ssp.string(searchQueryDefault), {
	debounceHistory: 500
});
export const searchQuery = derived(searchQueryQueryParam, (value: string) =>
	validateQueryParam(value, z.string(), searchQueryDefault)
);
export const updateSearchQuery = (value: string) => {
	searchQueryQueryParam.set(value);
};

// MAP
const lonDefault = 7.467;
const latDefault = 51.511;
const zoomDefault = 10.5;
const boundariesModeDefault = 'districts' as const;
const showSatelliteDefault = false;

const lonQueryParam = queryParam('lon', ssp.number(lonDefault), options);
const latQueryParam = queryParam('lat', ssp.number(latDefault), options);
const zoomQueryParam = queryParam('zoom', ssp.number(zoomDefault), options);
const boundariesModeQueryParam = queryParam('boundariesMode', ssp.string(boundariesModeDefault));
const showSatelliteQueryParam = queryParam('showSatellite', ssp.boolean(showSatelliteDefault));

export const coords = derived(
	[lonQueryParam, latQueryParam],
	([lon, lat]) =>
		[
			validateQueryParam(lon, z.number(), lonDefault),
			validateQueryParam(lat, z.number(), latDefault)
		] as [number, number]
);
export const setCoords = (coords: [number, number]) => {
	lonQueryParam.set(coords[0]);
	latQueryParam.set(coords[1]);
};

export const zoom = derived(zoomQueryParam, (value: number) =>
	validateQueryParam(value, z.number(), zoomDefault)
);
export const setZoom = (value: number) => {
	zoomQueryParam.set(value);
};

export const boundariesMode = derived(boundariesModeQueryParam, (value: string) =>
	validateQueryParam(value, z.string(), boundariesModeDefault)
);
export const setBoundariesMode = (value: string) => {
	boundariesModeQueryParam.set(value);
};

export const showSatellite = derived(showSatelliteQueryParam, (value: boolean) =>
	validateQueryParam(value, z.boolean(), showSatelliteDefault)
);
export const setShowSatellite = (value: boolean) => {
	showSatelliteQueryParam.set(value);
};	



// UTILS
function validateQueryParam<T>(queryParam: unknown, schema: z.ZodSchema<T>, defaultValue: T): T {
	const parsed = schema.safeParse(queryParam);
	const result = parsed.success ? parsed.data : undefined;
	return result || defaultValue;
}

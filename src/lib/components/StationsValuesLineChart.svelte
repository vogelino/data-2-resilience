<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { stations } from '$lib/stores/mapData';
	import { selectedStations } from '$lib/stores/stationsStore';
	import { api } from '$lib/utils/api';
	import { today } from '$lib/utils/dateUtil';
	import type { WeatherMeasurementKeyNoMinMax } from '$lib/utils/schemas';
	import { createQuery } from '@tanstack/svelte-query';
	import { VisAxis, VisCrosshair, VisLine, VisTooltip, VisXYContainer } from '@unovis/svelte';
	import { Position } from '@unovis/ts';
	import { addDays, format } from 'date-fns';
	import { debounce } from 'es-toolkit';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import UnovisChartContainer from './UnovisChartContainer.svelte';

	let start_date = addDays(today(), -10);
	let end_date = addDays(today(), 0);
	const rangeStart = queryParam('range_start', ssp.number(-10));
	const rangeEnd = queryParam('range_end', ssp.number(0));

	const unit = queryParam('unit', ssp.string());

	const updateStartDate = debounce((d: number) => {
		updateStartDate?.cancel();
		start_date = addDays(today(), d);
	}, 500);
	const updateEndDate = debounce((d: number) => {
		updateEndDate?.cancel();
		end_date = addDays(today(), d);
	}, 500);

	rangeStart.subscribe(updateStartDate);
	rangeEnd.subscribe(updateEndDate);

	$: startDateKey = format(start_date, 'yyyy-MM-dd');
	$: endDateKey = format(end_date, 'yyyy-MM-dd');
	$: unitShortLabel =
		$LL.pages.measurements.unitSelect.units[
			$unit as keyof typeof $LL.pages.measurements.unitSelect.units
		].shortLabel();

	$: id = $selectedStations[0];
	$: query = createQuery({
		queryKey: ['stationsData', id, startDateKey, endDateKey, $unit],
		queryFn: async () => {
			return api().getStaionsData({
				id: '1',
				start_date: start_date.toISOString(),
				end_date: end_date.toISOString(),
				param: $unit as unknown as WeatherMeasurementKeyNoMinMax,
				scale: 'hourly'
			});
		}
	});

	$: data = ($query.data || []).map((item) => {
		const value = item[$unit as keyof typeof item] as unknown as number;
		const formattedItem = {
			label: stations.features.find((s) => s.properties.id === id)?.properties.Label || id,
			value,
			date: new Date(item.measured_at)
		};
		return formattedItem;
	});

	type DataRecord = (typeof data)[number];

	const y = (d: DataRecord) => d.value;
	const x = (d: DataRecord) => d.date.getTime();
	$: xTickFormat = (d: Date) => new Intl.DateTimeFormat($locale, { dateStyle: 'long' }).format(d);
	$: yTickFormat = (d: number) => d.toLocaleString($locale);
	$: tooltipTemplate = (d: DataRecord) => `
		<span class="flex flex-col text-xs">
			<strong>${d.label}</strong>
			<span>${new Intl.DateTimeFormat($locale, {
				dateStyle: 'long',
				timeStyle: 'short'
			}).format(d.date)}</span>
			<span>${unitShortLabel}: ${
				typeof d.value === 'number' ? d.value.toLocaleString($locale) : d.value
			}</span>
		</span>
	`;
</script>

<UnovisChartContainer>
	<VisXYContainer padding={{ top: 8, bottom: 8, right: 16 }} {data} height={300}>
		<VisLine {x} {y} />
		<VisAxis type="x" tickFormat={xTickFormat} />
		<VisAxis type="y" tickFormat={yTickFormat} />
		<VisCrosshair template={tooltipTemplate} {x} {y} />
		<VisTooltip verticalShift={300} horizontalPlacement={Position.Center} />
	</VisXYContainer>
</UnovisChartContainer>

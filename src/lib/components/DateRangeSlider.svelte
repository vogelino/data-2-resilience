<script lang="ts">
	import { LL, locale } from '$i18n/i18n-svelte';
	import { isToday, today } from '$lib/utils/dateUtil';
	import { addDays } from 'date-fns';
	import { RangeSlider } from 'svelte-range-slider-pips';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import Button from './ui/button/button.svelte';

	const dateRangeStart = -30;
	const dateRangeEnd = 0;

	const options = {
		debounceHistory: 500
	};
	let selectedRangeStart = queryParam('range_start', ssp.number(-10), options);
	let selectedRangeEnd = queryParam('range_end', ssp.number(0), options);
	let dayValue = queryParam('day_value', ssp.number(0), options);
	let isRange = queryParam('is_range', ssp.boolean(false));

	$: formatter = (value: number) => {
		if (Number.isNaN(value)) return '';
		const date = addDays(today(), value === -0 ? 0 : value);
		if (isToday(date)) return $LL.pages.measurements.dateRangeSlider.today();
		return new Intl.DateTimeFormat($locale, {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		}).format(date);
	};

	const onRangeChange = (event: CustomEvent<{ values: [number, number] }>) => {
		const [startV, endV] = event.detail.values;
		if (typeof startV !== 'number' || typeof endV !== 'number') return;
		if (Number.isNaN(startV) || Number.isNaN(endV)) return;
		selectedRangeStart.set(startV);
		selectedRangeEnd.set(endV);
	};

	const onValueChange = (event: CustomEvent<{ value: number }>) => {
		const value = event.detail.value;
		if (typeof value !== 'number' || Number.isNaN(value)) return;
		dayValue.set(Math.round(value));
	};

	function setIsRange(value: boolean) {
		isRange.set(value);
	}

	const commonProps = {
		min: dateRangeStart,
		max: dateRangeEnd,
		step: 1,
		pushy: true,
		float: true,
		pips: true,
		first: 'label' as const,
		last: 'label' as const,
		springValues: {
			stiffness: 0.3,
			damping: 0.6
		}
	};
</script>

<div class="date-range-slider flex flex-col">
	{#if $isRange}
		<RangeSlider
			values={[$selectedRangeStart, $selectedRangeEnd]}
			on:change={onRangeChange}
			range
			{...commonProps}
			{formatter}
			first="label"
		/>
	{:else}
		<RangeSlider
			value={$dayValue}
			on:change={onValueChange}
			range={false}
			{...commonProps}
			{formatter}
		/>
	{/if}
	<div class="flex justify-center">
		<Button
			variant={$isRange ? 'outline' : 'default'}
			size="sm"
			on:click={() => setIsRange(false)}
			class="rounded-r-none focus-visible:z-10 focus-visible:rounded"
		>
			{$LL.pages.measurements.dateRangeSlider.day()}
		</Button>
		<Button
			variant={$isRange ? 'default' : 'outline'}
			size="sm"
			on:click={() => setIsRange(true)}
			class="rounded-l-none focus-visible:z-10 focus-visible:rounded"
		>
			{$LL.pages.measurements.dateRangeSlider.range()}
		</Button>
	</div>
</div>

<style>
	:global(.date-range-slider) {
		--range-slider: hsl(var(--muted-foreground) / 0.3);
		--range-handle-inactive: hsl(var(--primary));
		--range-handle: hsl(var(--primary));
		--range-handle-focus: hsl(var(--foreground));
		--range-handle-border: hsl(var(--muted-foreground));
		--range-range-inactive: hsl(var(--foreground));
		--range-range: hsl(var(--foreground));
		--range-float-inactive: hsl(var(--muted-foreground));
		--range-float: hsl(var(--foreground));
		--range-float-text: hsl(var(--background));

		--range-pip: hsl(var(--muted-foreground) / 0.3);
		--range-pip-text: hsl(var(--muted-foreground));
		--range-pip-active: hsl(var(--foreground));
		--range-pip-active-text: hsl(var(--foreground));
		--range-pip-hover: hsl(var(--muted-foreground) / 0.5);
		--range-pip-hover-text: hsl(var(--muted-foreground) / 0.5);
		--range-pip-in-range: hsl(var(--muted-foreground) / 0.5);
		--range-pip-in-range-text: hsl(var(--muted-foreground) / 0.5);
	}

	:global(.date-range-slider .rangePips .pip.first > .pipVal) {
		transform: translate(0, 25%);
	}

	:global(.date-range-slider .rangePips .pip.last > .pipVal) {
		transform: translate(-100%, 25%);
	}

	:global(.date-range-slider .rangePips .pip.selected .pipVal) {
		top: 0.4em;
	}

	:global(.date-range-slider .rangeSlider .rangeHandle:focus-visible) {
		outline: none;
		border-radius: 999px;
		box-shadow:
			0 0 0 4px hsl(var(--background)),
			0 0 0 6px hsl(var(--ring));
	}
</style>

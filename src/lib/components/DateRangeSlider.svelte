<script lang="ts">
	import {
		addDays,
		differenceInDays,
		endOfToday,
		format,
		isToday,
		isValid,
		subDays
	} from 'date-fns';
	import { RangeSlider } from 'svelte-range-slider-pips';
	import Button from './ui/button/button.svelte';

	const dateRange: [Date, Date] = [subDays(endOfToday(), 30), endOfToday()];
	let selectedRange: [Date, Date] = [subDays(endOfToday(), 10), endOfToday()];
	let isRange = false;

	$: fullRangeDiff = Math.abs(differenceInDays(dateRange[1], dateRange[0]));
	$: fullRangeValues = [-fullRangeDiff, 0] satisfies [number, number];

	$: diffInDaysSelectedRangeStart = Math.abs(differenceInDays(dateRange[1], selectedRange[0]));
	$: diffInDaysSelectedRangeEnd = Math.abs(differenceInDays(dateRange[1], selectedRange[1]));
	$: selectedValuesRange = [-diffInDaysSelectedRangeStart, -diffInDaysSelectedRangeEnd];

	$: formatter = (value: number) => {
		if (Number.isNaN(value)) return '';
		const date = addDays(dateRange[1], value === -0 ? 0 : value);
		if (isToday(date)) return 'Today';
		return format(date, 'dd. MMM yyy');
	};
</script>

<div class="date-range-slider flex flex-col">
	<RangeSlider
		values={isRange ? selectedValuesRange : [selectedValuesRange[1]]}
		on:change={(event) => {
			const [start, end] = event.detail.values;
			const startDate = addDays(dateRange[1], start ?? dateRange[0]);
			const endDate = addDays(dateRange[1], end ?? dateRange[1]);
			if (!isValid(startDate) || !isValid(endDate)) return;
			const sortedDates = [startDate, endDate];
			selectedRange = [sortedDates[0], sortedDates[1]];
		}}
		min={fullRangeValues[0]}
		max={fullRangeValues[1]}
		step={1}
		first="label"
		last="label"
		range={isRange}
		pushy
		float
		pips
		{formatter}
		springValues={{ stiffness: 0.3, damping: 0.6 }}
	/>
	<div class="flex justify-center">
		<Button
			variant={isRange ? 'outline' : 'default'}
			size="sm"
			on:click={() => (isRange = false)}
			class="rounded-r-none"
		>
			Day
		</Button>
		<Button
			variant={isRange ? 'default' : 'outline'}
			size="sm"
			on:click={() => (isRange = true)}
			class="rounded-l-none"
		>
			Range
		</Button>
	</div>
</div>

<style>
	:global(.date-range-slider) {
		--range-slider: hsl(var(--muted-foreground) / 0.3);
		--range-handle-inactive: hsl(var(--foreground));
		--range-handle: hsl(var(--foreground));
		--range-handle-focus: hsl(var(--primary));
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
</style>

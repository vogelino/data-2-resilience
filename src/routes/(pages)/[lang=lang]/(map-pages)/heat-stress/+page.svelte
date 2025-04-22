<script lang="ts">
	import { PUBLIC_ENABLE_HEATATLAS_TIMESLIDER } from '$env/static/public';
	import { LL, locale } from '$i18n/i18n-svelte';
	import { dayValue, heatStressUnit, udpateDay } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { isToday, today } from '$lib/utils/dateUtil';
	import CollapsibleParagraph from 'components/CollapsibleParagraph.svelte';
	import HourInput from 'components/HourInput.svelte';
	import InfoTooltip from 'components/InfoTooltip.svelte';
	import ThermalCompfortNavItem from 'components/ThermalCompfortNavItem.svelte';
	import { addDays } from 'date-fns';
	import RangeSlider from 'svelte-range-slider-pips';

	const showTimeslider = PUBLIC_ENABLE_HEATATLAS_TIMESLIDER === 'true';

	let indicatorValues = $derived([
		{
			slug: 'utci' as const,
			title: $LL.indicators.utci.title(),
			description: $LL.indicators.utci.description(),
			hasCategory: true,
			isSelected: $heatStressUnit === 'utci_category' || $heatStressUnit === 'utci'
		},
		{
			slug: 'relative_humidity' as const,
			title: $LL.indicators.relative_humidity.title(),
			description: $LL.indicators.relative_humidity.description(),
			hasCategory: false,
			isSelected: $heatStressUnit === 'relative_humidity'
		},
		{
			slug: 'air_temperature' as const,
			title: $LL.indicators.air_temperature.title(),
			description: $LL.indicators.air_temperature.description(),
			hasCategory: false,
			isSelected: $heatStressUnit === 'air_temperature'
		}
	]);

	let formatter = $derived((value: number) => {
		if (Number.isNaN(value)) return '';
		const date = addDays(today(), value === -0 ? 0 : value);
		if (isToday(date)) return $LL.pages.measurements.dateRangeSlider.today();
		return new Intl.DateTimeFormat($locale, {
			day: 'numeric',
			month: 'short',
			year: 'numeric'
		}).format(date);
	});

	const rangeSliderProps = {
		min: -30,
		max: 0,
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

	const onValueChange = (event: CustomEvent<{ value: number }>) => {
		const value = event.detail.value;
		if (typeof value !== 'number' || Number.isNaN(value)) return;
		udpateDay(Math.round(value));
	};
</script>

<h1 class="mb-2 text-xl font-semibold">{$LL.pages.heatStress.title()}</h1>
<CollapsibleParagraph>
	{#each Object.values($LL.pages.heatStress.intro) as paragraph}
		<p>{paragraph()}</p>
	{/each}
</CollapsibleParagraph>

<nav aria-label={$LL.pages.heatStress.indicatorsNavAriaLabel()} class="mt-6">
	<ul class="flex flex-col gap-px rounded-t-xl border border-b-0 border-border bg-border">
		{#each indicatorValues as indicator (indicator.slug)}
			<ThermalCompfortNavItem {indicator} />
		{/each}
	</ul>
</nav>

<div class={cn('date-range-slider flex flex-col gap-2', 'rounded-b-xl border border-border p-4')}>
	<div class={cn('grid grid-cols-[1fr_auto] gap-2', !showTimeslider && 'grid-cols-[auto_1fr]')}>
		<div
			class={cn('pt-2 [&_.rangeSlider]:ml-0', !showTimeslider && 'col-start-2 row-start-1')}
			id="date-range-slider"
		>
			{#if showTimeslider}
				<RangeSlider
					value={$dayValue}
					on:change={onValueChange}
					range={false}
					{...rangeSliderProps}
					{formatter}
				/>
			{/if}
		</div>
		<div class={cn('flex flex-col gap-1', !showTimeslider && 'col-start-1 row-start-1')}>
			<span class="text-xs font-semibold">{$LL.generic.hourInput.label()}</span>
			<HourInput />
		</div>
	</div>
</div>

<div
	class={cn(
		'rounded bg-muted px-4 pb-2 pt-1.5 text-sm font-semibold',
		'mt-4 grid grid-cols-[1fr,auto] items-center gap-2'
	)}
	role="alert"
>
	<span class="text-balance">
		{$LL.pages.heatStress.timeRangeAlert({
			startDate: new Date('2024-07-01').toLocaleDateString($locale, {
				day: '2-digit',
				month: 'long',
				year: undefined
			}),
			endDate: new Date('2024-07-31').toLocaleDateString($locale, {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			})
		})}
	</span>
	<InfoTooltip
		title={$LL.pages.heatStress.timeRangeAlertTooltipTitle()}
		description={$LL.pages.heatStress.timeRangeAlertTooltipContent()}
	/>
</div>

<style>
	:global(.date-range-slider) {
		--range-slider: hsl(var(--muted-foreground) / 0.3);
		--range-handle-inactive: hsl(var(--primary));
		--range-handle: hsl(var(--primary));
		--range-handle-focus: hsl(var(--primary));
		--range-handle-border: hsl(var(--muted-primary));
		--range-range-inactive: hsl(var(--primary));
		--range-range: hsl(var(--primary));
		--range-float-inactive: hsl(var(--primary));
		--range-float: hsl(var(--primary));
		--range-float-text: hsl(var(--primary-foreground));

		--range-pip: hsl(var(--muted-foreground) / 0.3);
		--range-pip-text: hsl(var(--muted-foreground));
		--range-pip-active: hsl(var(--muted-foreground));
		--range-pip-active-text: hsl(var(--primary-foreground));
		--range-pip-hover: hsl(var(--primary));
		--range-pip-hover-text: hsl(var(--primary-foreground));
		--range-pip-in-range: hsl(var(--muted-foreground));
		--range-pip-in-range-text: hsl(var(--muted-foreground));
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

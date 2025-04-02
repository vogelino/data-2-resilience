<script lang="ts">
	import { page } from '$app/state';
	import { LL, locale } from '$i18n/i18n-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import { Tooltip, TooltipContent, TooltipTrigger } from '$lib/components/ui/tooltip';
	import { heatStressUnit, isLeftSidebarOpened, unit } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { getColorStops, unitsToScalesMap } from '$lib/utils/colorScaleUtil';
	import { healthRisksRanges } from '$lib/utils/healthRisksUtil';
	import { HeartPulse, X } from 'lucide-svelte';
	import HealthRiskPill from './HealthRiskPill.svelte';

	let open = $state(false);

	let p = $derived(page.url.pathname.replace(`/${$locale}`, '').replaceAll('/', ''));
	let currentPage = $derived(p === '' ? 'measurements' : p);

	type Unit = keyof typeof $LL.pages.measurements.unitSelect.units;

	const filterOutInvalid = <T extends number>(arr: T[]) =>
		arr.filter((d) => typeof d === 'number' && Math.abs(d) !== Infinity);

	let getUnitLabelsByUnit = $derived(function (unit: Unit, isCategoryUnit = false) {
		return {
			unitOnlyLabel:
				$LL.pages.measurements.unitSelect.units[
					isCategoryUnit ? (unit.replace('_category', '') as Unit) : unit
				].unitOnly(),
			label: $LL.pages.measurements.unitSelect.units[unit].label(),
			description: $LL.pages.measurements.unitSelect.units[unit].description()
		};
	});
	let finalUnit = $derived(
		currentPage === 'measurements' ? ($unit as Unit) : ($heatStressUnit as Unit)
	);
	let isCategoryUnit = $derived(finalUnit.endsWith('_category'));
	let labels = $derived(getUnitLabelsByUnit(finalUnit, isCategoryUnit));
	let unitWithoutCategory = $derived(
		finalUnit.replace(/_category$/, '') === 'pet' ? ('pet' as const) : ('utci' as const)
	);

	let scale = $derived(
		unitsToScalesMap[finalUnit as keyof typeof unitsToScalesMap] || unitsToScalesMap.default
	);
	let isOrdinal = $derived(scale.type === 'ordinal');
	let showHealthRisks = $derived(finalUnit.startsWith('utci') || finalUnit.startsWith('pet'));
	let titleKey = $derived(
		finalUnit.endsWith('_category') ? ('heatStress' as const) : ('thermalComfort' as const)
	);
	let allHealthRisks = $derived(
		Object.values($LL.map.choroplethLegend.healthRisks).filter((item) => !!item.title[titleKey]())
	);
	let showColdRisks = $derived(currentPage === 'measurements' && showHealthRisks);
	let healthRisks = $derived(showColdRisks ? allHealthRisks : allHealthRisks.slice(-5));
	let scheme = $derived(showHealthRisks ? scale.scheme.slice(-healthRisks.length) : scale.scheme);
	let scaleMin = $derived(scale.type === 'sequential' ? scale.min : 0);
	let scaleMax = $derived(scale.type === 'sequential' ? scale.max : 100);
	let seqMin = $derived(
		showColdRisks || !showHealthRisks ? scaleMin : scaleMax - (scaleMax - scaleMin) / 5
	);

	const isHealthRiskUnit = $derived($unit === 'utci' || $unit === 'pet');
	const healthRiskThresholds = $derived(
		Object.values(healthRisksRanges).map((range) => range[$unit as 'utci' | 'pet'])
	);
	const healthRiskUnitMin = $derived(
		Math.min(...filterOutInvalid(healthRiskThresholds.flatMap((t) => [t.min, t.max])))
	);
	const healthRiskUnitMax = $derived(
		Math.max(...filterOutInvalid(healthRiskThresholds.flatMap((t) => [t.min, t.max])))
	);
	const min = $derived.by(() => {
		if (isHealthRiskUnit) return healthRiskUnitMin;
		if (scale.type === 'sequential') return seqMin;
		return scaleMin;
	});
	const minLabel = $derived(
		isHealthRiskUnit || scale.type === 'sequential' ? `${min} ${labels.unitOnlyLabel}` : ''
	);
	const max = $derived.by(() => {
		if (isHealthRiskUnit) return healthRiskUnitMax;
		return scaleMax;
	});
	const maxLabel = $derived(
		isHealthRiskUnit || scale.type === 'sequential' ? `${max} ${labels.unitOnlyLabel}` : ''
	);

	let customGradient = $derived.by(() => {
		const stops = getColorStops({ unit: $unit, LL: $LL });
		const stopsStrings = stops.map(({ color, position }) => `${color} ${position}%`);
		const stopStart = `${stops[0].color} 0%`;
		const stopEnd = `${stops[stops.length - 1].color} 100%`;
		const allStops = [stopStart, ...stopsStrings, stopEnd].join(', ');
		return `linear-gradient(to right, ${allStops})`;
	});

	let isAboutPage = $derived(page.url.pathname.startsWith(`/${$locale}/about`));
	let showLeftSidebar = $derived(!isAboutPage && $isLeftSidebarOpened);
	const isWindDirectionUnit = $derived(finalUnit.startsWith('wind_direction'));
</script>

{#if !isWindDirectionUnit}
	<div
		class={cn(
			'flex w-72 flex-col gap-2 bg-background/80 text-sm backdrop-blur-[2px]',
			'fixed bottom-4 left-4 z-10 overflow-clip rounded border border-border shadow-lg dark:shadow-black/80',
			showLeftSidebar
				? 'opacity-0 sm:translate-x-[var(--leftSidebarWidth)] sm:opacity-100'
				: 'translate-x-0',
			'p-4 transition duration-300 ease-in-out',
			'[&:has(input:focus-visible)]:ring-2 [&:has(input:focus-visible)]:ring-ring',
			'[&:has(input:focus-visible)]:ring-offset-2 [&:has(input:focus-visible)]:ring-offset-background'
		)}
	>
		<strong>{labels.label}</strong>
		<div class="flex flex-col gap-0">
			{#if isOrdinal}
				<div
					class="group flex h-4 w-full max-w-96 overflow-clip rounded-sm shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"
				>
					{#each scheme as color, i}
						<Tooltip openDelay={0} closeDelay={0} disableHoverableContent>
							<TooltipTrigger
								class={cn(
									'focusable size-full',
									'transition-opacity hover-hover:group-has-[button:hover]:opacity-20 hover-hover:group-has-[button:hover]:hover:opacity-100'
								)}
								style={`background-color: ${color}`}
							/>
							<TooltipContent
								class={cn('flex w-96 max-w-full flex-col gap-1 px-4 pb-4 pt-3 leading-tight')}
							>
								{#if healthRisks[i]}
									<strong class="flex gap-2 font-semibold">
										<span>{healthRisks[i].title[titleKey]()}</span>
										{#if healthRisks[i].ranges[unitWithoutCategory]()}
											<span class="whitespace-nowrap font-normal text-muted-foreground">
												({healthRisks[i].ranges[unitWithoutCategory]()})
											</span>
										{/if}
									</strong>
									<span>{@html healthRisks[i].description()}</span>
								{/if}
							</TooltipContent>
						</Tooltip>
					{/each}
				</div>
			{:else}
				<div
					class="h-4 w-full max-w-96 rounded-sm bg-gradient-to-r from-yellow-50 via-yellow-500 to-yellow-950 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"
					style={`background-image: ${customGradient};`}
				></div>
			{/if}
			<div
				class="flex w-full items-center justify-between pt-1 text-xs leading-4 text-muted-foreground"
			>
				<span>
					{isOrdinal ? healthRisks[0].title[titleKey]() : minLabel}
				</span>
				<span class="text-right">
					{isOrdinal ? healthRisks[healthRisks.length - 1].title[titleKey]() : maxLabel}
				</span>
			</div>
		</div>
		<div class="flex flex-col">
			<span class="inline-grid grid-cols-[0.75rem_1fr] items-center gap-2">
				<HealthRiskPill value={undefined} withLabel />
			</span>
			<span class="mb-1 inline-grid grid-cols-[0.75rem_1fr] items-center gap-2">
				<HealthRiskPill value={null} withLabel />
			</span>
		</div>
		{#if showHealthRisks}
			<Popover.Root bind:open>
				<Popover.Trigger asChild>
					{#snippet children({ builder })}
						<Button
							builders={[builder]}
							variant="link"
							role="combobox"
							aria-expanded={open}
							class={cn('flex h-fit items-center justify-start gap-2 p-0 transition-all')}
						>
							<HeartPulse class="size-5 shrink-0 text-pink-700" />
							<span
								>{open
									? $LL.map.choroplethLegend.hideHealthRisks()
									: $LL.map.choroplethLegend.showHealthRisks()}</span
							>
						</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content
					class="max-h-[calc(100vh-20rem)] w-72 -translate-y-[7.5rem] overflow-y-auto rounded p-0 pb-2"
				>
					<strong
						class={cn(
							'grid grid-cols-[1.25rem_1fr_1.25rem] items-center gap-2 text-base font-semibold',
							'sticky top-0 border-b border-border bg-background/80 px-4 py-3 backdrop-blur-[2px]'
						)}
					>
						<HeartPulse class="size-5 text-pink-700" />
						<span>{$LL.map.choroplethLegend.title()}</span>
						<Button variant="ghost" size="icon" class="size-5 p-0" on:click={() => (open = false)}>
							<X class="size-5 text-muted-foreground" />
						</Button>
					</strong>
					<ul class="flex flex-col p-4 text-sm">
						{#each healthRisks.toReversed() as { title, description, ranges }, i}
							<li
								class={cn('border-b border-l-4 py-2 pl-4 last-of-type:border-b-0')}
								style={`border-left-color: ${unitsToScalesMap.utci_category.scheme.toReversed()[i]}`}
							>
								<p>
									<strong>{title[titleKey]()}</strong>
									<span class="whitespace-nowrap text-muted-foreground"
										>({ranges[unitWithoutCategory]()})</span
									>{': '}
								</p>
								{@html description()}
							</li>
						{/each}
					</ul>
				</Popover.Content>
			</Popover.Root>
		{/if}
	</div>
{/if}

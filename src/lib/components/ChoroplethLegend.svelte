<script lang="ts">
	import { page } from '$app/stores';
	import { LL, locale } from '$i18n/i18n-svelte';
	import * as Popover from '$lib/components/ui/popover';
	import { isLeftSidebarOpened } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { unitsToScalesMap } from '$lib/utils/colorScaleUtil';
	import { HeartPulse, X } from 'lucide-svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import { Button } from './ui/button';

	const heatStressUnit = queryParam('heatStress', ssp.string('utci'));
	const unit = queryParam('unit', ssp.string('air_temperature'));

	let open = false;

	$: p = $page.url.pathname.replace(`/${$locale}`, '').replaceAll('/', '');
	$: currentPage = p === '' ? 'measurements' : p;

	type Unit = keyof typeof $LL.pages.measurements.unitSelect.units;

	$: getUnitLabelsByUnit = function (unit: Unit, isCategoryUnit = false) {
		return {
			unitOnlyLabel:
				$LL.pages.measurements.unitSelect.units[
					isCategoryUnit ? (unit.replace('_category', '') as Unit) : unit
				].unitOnly(),
			label: $LL.pages.measurements.unitSelect.units[unit].label(),
			description: $LL.pages.measurements.unitSelect.units[unit].description()
		};
	};
	$: finalUnit = currentPage === 'measurements' ? ($unit as Unit) : ($heatStressUnit as Unit);
	$: isCategoryUnit = finalUnit.endsWith('_category');
	$: labels = getUnitLabelsByUnit(finalUnit, isCategoryUnit);
	$: unitWithoutCategory =
		finalUnit.replace(/_category$/, '') === 'pet' ? ('pet' as const) : ('utci' as const);

	$: scale =
		unitsToScalesMap[finalUnit as keyof typeof unitsToScalesMap] || unitsToScalesMap.default;
	$: isOrdinal = scale.type === 'ordinal';
	$: min = scale.type === 'sequential' ? `${scale.min} ${labels.unitOnlyLabel}` : '';
	$: max = scale.type === 'sequential' ? `${scale.max} ${labels.unitOnlyLabel}` : '';
	$: showHealthRisks = finalUnit.startsWith('utci') || finalUnit.startsWith('pet');
	$: allHealthRisks = Object.values($LL.map.choroplethLegend.healthRisks);
	$: showColdRisks = currentPage === 'measurements' && showHealthRisks;
	$: titleKey = finalUnit.endsWith('_category')
		? ('heatStress' as const)
		: ('thermalComfort' as const);
	$: healthRisks = (showColdRisks ? allHealthRisks : allHealthRisks.slice(-5)).filter(
		(item) => !!item.title[titleKey]()
	);
</script>

<div
	class={cn(
		'flex w-72 flex-col gap-2 bg-background/80 text-sm backdrop-blur-[2px]',
		'fixed bottom-8 left-8 z-10 overflow-clip rounded border border-border shadow-lg',
		$isLeftSidebarOpened ? 'translate-x-[var(--leftSidebarWidth)]' : 'translate-x-0',
		'p-4 transition-transform duration-300 ease-in-out',
		'[&:has(input:focus-visible)]:ring-2 [&:has(input:focus-visible)]:ring-ring',
		'[&:has(input:focus-visible)]:ring-offset-2 [&:has(input:focus-visible)]:ring-offset-background'
	)}
>
	<strong>{labels.label}</strong>
	<div class="flex flex-col gap-0">
		{#if isOrdinal}
			<div
				class="rounded-xs flex h-2 w-full max-w-96 overflow-clip shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"
			>
				{#each scale.scheme.slice(-healthRisks.length) as color}
					<span class={cn('size-full')} style={`background-color: ${color}`} />
				{/each}
			</div>
		{:else}
			<div
				class="rounded-xs h-2 w-full max-w-96 bg-gradient-to-r from-yellow-50 via-yellow-500 to-yellow-950 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"
				style={`
					background-image: linear-gradient(
						to right,
						${scale.scheme.slice(-healthRisks.length).join(', ')}
				)`}
			/>
		{/if}
		<div class="flex w-full items-center justify-between pt-1 leading-4 text-muted-foreground">
			<span>
				{isOrdinal ? healthRisks[0].title[titleKey]() : min}
			</span>
			<span class="text-right">
				{isOrdinal ? healthRisks[healthRisks.length - 1].title[titleKey]() : max}
			</span>
		</div>
	</div>
	<span class="mb-1 inline-grid grid-cols-[0.75rem_1fr] items-center gap-2">
		<span class="size-3 rounded-full bg-muted-foreground" />
		<span class="text-sm text-muted-foreground">
			{$LL.map.choroplethLegend.noValueAvailable()}
		</span>
	</span>
	{#if showHealthRisks}
		<Popover.Root bind:open>
			<Popover.Trigger asChild let:builder>
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
			</Popover.Trigger>
			<Popover.Content class="w-72 -translate-y-[7.5rem] rounded">
				<strong
					class="grid grid-cols-[1.25rem_1fr_1.25rem] items-center gap-2 text-base font-semibold"
				>
					<HeartPulse class="size-5 text-pink-700" />
					<span>{$LL.map.choroplethLegend.title()}</span>
					<Button variant="ghost" size="icon" class="size-5 p-0" on:click={() => (open = false)}>
						<X class="size-5 text-muted-foreground" />
					</Button>
				</strong>
				<ul class="flex flex-col pt-2 text-sm">
					{#each healthRisks.toReversed() as { title, description, ranges }, i}
						<li
							class={cn('border-l-4 border-t py-2 pl-4')}
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

<script lang="ts">
	import { page } from '$app/stores';
	import { LL, locale } from '$i18n/i18n-svelte';
	import * as Popover from '$lib/components/ui/popover';
	import { isLeftSidebarOpened } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { valueToCategoryMap } from '$lib/utils/heatStressCategoriesUtil';
	import { HeartPulse, X } from 'lucide-svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import { Button } from './ui/button';

	const heatStressUnit = queryParam('heatSress', ssp.string('utci'));
	const unit = queryParam('unit', ssp.string('air_temperature'));

	let open = false;

	$: p = $page.url.pathname.replace(`/${$locale}`, '').replaceAll('/', '');
	$: currentPage = p === '' ? 'measurements' : p;

	type Unit = keyof typeof $LL.pages.measurements.unitSelect.units;

	$: getUnitLabelsByUnit = function (unit: Unit, isCategoryUnit = false) {
		return {
			unitShortLabel: $LL.pages.measurements.unitSelect.units[unit].shortLabel(),
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

	const categoryColors = [
		'bg-yellow-50',
		'bg-yellow-100',
		'bg-yellow-200',
		'bg-yellow-300',
		'bg-yellow-400',
		'bg-yellow-500',
		'bg-yellow-600',
		'bg-yellow-700',
		'bg-yellow-800',
		'bg-yellow-900',
		'bg-yellow-950'
	];
</script>

<div
	class={cn(
		'flex w-72 flex-col gap-2 text-sm',
		'fixed bottom-8 left-8 z-10 overflow-clip rounded border border-border bg-background shadow-lg',
		$isLeftSidebarOpened ? 'translate-x-[var(--leftSidebarWidth)]' : 'translate-x-0',
		'p-4 transition-transform duration-300 ease-in-out',
		'[&:has(input:focus-visible)]:ring-2 [&:has(input:focus-visible)]:ring-ring',
		'[&:has(input:focus-visible)]:ring-offset-2 [&:has(input:focus-visible)]:ring-offset-background'
	)}
>
	<strong>{labels.unitShortLabel}</strong>
	<div class="flex flex-col gap-0">
		{#if isCategoryUnit}
			<div
				class="rounded-xs flex h-2 w-full max-w-96 overflow-clip shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"
			>
				{#each valueToCategoryMap.values() as _category, i}
					<span class={cn('size-full', categoryColors[i])} />
				{/each}
			</div>
		{:else}
			<div
				class="rounded-xs h-2 w-full max-w-96 bg-gradient-to-r from-yellow-50 via-yellow-500 to-yellow-950 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]"
			/>
		{/if}
		<div class="opacity- flex w-full items-center justify-between text-muted-foreground">
			<span>0 {labels.unitOnlyLabel}</span>
			<span>100 {labels.unitOnlyLabel}</span>
		</div>
	</div>
	<Popover.Root bind:open>
		<Popover.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="link"
				role="combobox"
				aria-expanded={open}
				class={cn('flex h-fit items-center justify-start gap-1 p-0 transition-all')}
			>
				<HeartPulse class="size-5 shrink-0 text-pink-700" />
				<span
					>{open
						? $LL.map.choroplethLegend.hideHealthRisks()
						: $LL.map.choroplethLegend.showHealthRisks()}</span
				>
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-72 -translate-y-24 rounded">
			<strong
				class="grid grid-cols-[1.25rem_1fr_1.25rem] items-center gap-2 text-base font-semibold"
			>
				<HeartPulse class="size-5 text-pink-700" />
				<span>{$LL.map.choroplethLegend.title()}</span>
				<Button variant="ghost" size="icon" class="size-5 p-0" on:click={() => (open = false)}>
					<X class="size-5 text-muted-foreground" />
				</Button>
			</strong>
			<ul class="flex flex-col gap-2 pt-2 text-sm">
				{#each Object.values($LL.map.choroplethLegend.healthRisks) as { title, description }, i}
					<li class="border-t border-border pt-2">
						<strong>{title()}{': '}</strong>
						{@html description()}
					</li>
				{/each}
			</ul>
		</Popover.Content>
	</Popover.Root>
</div>

<script context="module" lang="ts">
	export type SelectedIndicatorSlugType =
		| 'relative_humidity'
		| 'utci'
		| 'utci_category'
		| 'air_temperature';
	export type IndicatorType = {
		slug: 'utci' | 'relative_humidity' | 'air_temperature';
		title: string;
		description: string;
		hasCategory: boolean;
		isSelected: boolean;
	};
</script>

<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import InfoTooltip from './InfoTooltip.svelte';

	export let indicator: IndicatorType;

	let selectedIndicatorSlugParam = queryParam('heatStress', ssp.string('utci'));
	$: selectedIndicatorSlug =
		$selectedIndicatorSlugParam === null ? 'utci' : $selectedIndicatorSlugParam;
	$: slugWithCategory = `${indicator.slug}_category`;
	$: valueSelected = indicator.isSelected && selectedIndicatorSlug !== slugWithCategory;
	$: categorySelected = indicator.isSelected && selectedIndicatorSlug === slugWithCategory;
</script>

<li class="group/indicators relative focus-within:z-10">
	<button
		type="button"
		class={cn(
			'focusable flex w-full flex-col bg-background p-4 text-left',
			'transition hover:bg-muted focus-visible:rounded-xl',
			'group-first-of-type/indicators:rounded-t-xl group-last-of-type/indicators:rounded-b-xl',
			indicator.isSelected && indicator.hasCategory && 'pb-5'
		)}
		on:click={() => {
			$selectedIndicatorSlugParam = indicator.hasCategory ? slugWithCategory : indicator.slug;
		}}
	>
		<div class="relative flex w-full items-center justify-between gap-4 pr-8 font-semibold">
			<div class="inline-flex items-center gap-1.5">
				{indicator.title}
				<InfoTooltip title={indicator.title} description={indicator.description} />
			</div>
			<span
				class={cn(
					'absolute right-0 top-0 bg-background',
					'size-5 rounded-full border border-muted-foreground ring-4 ring-inset ring-background',
					indicator.isSelected && 'border-primary bg-primary-foreground ring-primary'
				)}
			></span>
		</div>
		{#if indicator.hasCategory && indicator.isSelected}
			<nav class="mt-2">
				<ul class="inline-flex gap-px rounded bg-border">
					<li class="group/utci flex">
						<button
							type="button"
							on:click|preventDefault|stopPropagation={() => {
								$selectedIndicatorSlugParam = slugWithCategory;
							}}
							class={cn(
								'border border-r-0 border-border px-3 py-1.5 text-center',
								'rounded-l bg-background transition group-hover/indicators:bg-muted',
								'focusable focus-visible:z-10 focus-visible:rounded focus-visible:border',
								categorySelected &&
									'border-primary bg-primary font-semibold text-primary-foreground group-hover/indicators:bg-primary group-hover/indicators:text-primary-foreground',
								!categorySelected && 'group-hover/indicators:hover:bg-background'
							)}
						>
							{$LL.indicators.utci.types.byClass.title()}
						</button>
					</li>
					<li class="group/utci flex">
						<button
							type="button"
							on:click|preventDefault|stopPropagation={() => {
								$selectedIndicatorSlugParam = indicator.slug;
							}}
							class={cn(
								'border border-l-0 border-border px-3 py-1.5 text-center',
								'rounded-r bg-background transition group-hover/indicators:bg-muted',
								'focusable focus-visible:z-10 focus-visible:rounded focus-visible:border',
								valueSelected &&
									'border-primary bg-primary font-semibold text-primary-foreground group-hover/indicators:bg-primary group-hover/indicators:text-primary-foreground',
								!valueSelected && 'group-hover/indicators:hover:bg-background'
							)}
						>
							{$LL.indicators.utci.types.byValue.title()}
						</button>
					</li>
				</ul>
			</nav>
		{/if}
	</button>
</li>

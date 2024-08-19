<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';

	let selectedIndicatorSlug = 'utci_class';

	$: indicatorValues = [
		{
			slug: 'utci',
			title: $LL.indicators.utci.title(),
			description: $LL.indicators.utci.description(),
			isSelected: selectedIndicatorSlug === 'utci_class' || selectedIndicatorSlug === 'utci_value'
		},
		{
			slug: 'pet',
			title: $LL.indicators.pet.title(),
			description: $LL.indicators.pet.description(),
			isSelected: selectedIndicatorSlug === 'pet'
		},
		{
			slug: 'mrt',
			title: $LL.indicators.mrt.title(),
			description: $LL.indicators.mrt.description(),
			isSelected: selectedIndicatorSlug === 'mrt'
		}
	];
</script>

<h1 class="mb-2 text-xl font-semibold">{$LL.pages.thermicalComfort.title()}</h1>
{#each Object.values($LL.pages.thermicalComfort.intro) as paragraph}
	<p class="mb-2">{paragraph()}</p>
{/each}
<nav aria-label={$LL.pages.thermicalComfort.indicatorsNavAriaLabel()} class="my-6">
	<ul class="flex flex-col gap-px rounded-xl border border-border bg-border">
		{#each indicatorValues as indicator (indicator.slug)}
			<li class="group/indicators relative focus-within:z-10">
				<button
					type="button"
					class={cn(
						'focusable bg-background p-4 text-left',
						'transition hover:bg-muted focus-visible:rounded-xl',
						'group-first-of-type/indicators:rounded-t-xl group-last-of-type/indicators:rounded-b-xl'
					)}
					on:click={() =>
						(selectedIndicatorSlug = indicator.slug === 'utci' ? 'utci_class' : indicator.slug)}
				>
					<h2 class="relative mb-1 pr-8 font-semibold">
						{indicator.title}
						<span
							class={cn(
								'absolute right-0 top-0 bg-background',
								'size-5 rounded-full border border-foreground ring-4 ring-inset ring-background',
								indicator.isSelected && 'bg-foreground'
							)}
						/>
					</h2>
					<p class="text-sm text-muted-foreground">{indicator.description}</p>
					{#if indicator.slug === 'utci'}
						<nav class="mt-2">
							<ul class="grid grid-cols-2 gap-px rounded bg-border">
								<li class="group/utci flex">
									<button
										type="button"
										on:click|preventDefault|stopPropagation={() =>
											(selectedIndicatorSlug = 'utci_class')}
										class={cn(
											'w-full border border-r-0 border-border px-4 py-2 text-center',
											'rounded-l bg-background transition group-hover/indicators:bg-muted',
											'focusable focus-visible:z-10 focus-visible:rounded focus-visible:border',
											selectedIndicatorSlug === 'utci_class' &&
												'border-foreground bg-foreground font-semibold text-background group-hover/indicators:bg-foreground',
											selectedIndicatorSlug !== 'utci_class' &&
												'group-hover/indicators:hover:bg-background'
										)}
									>
										{$LL.indicators.utci.types.byClass.title()}
									</button>
								</li>
								<li class="group/utci flex">
									<button
										type="button"
										on:click|preventDefault|stopPropagation={() =>
											(selectedIndicatorSlug = 'utci_value')}
										class={cn(
											'focusable focus-visible:z-10 focus-visible:rounded focus-visible:border',
											'w-full border border-l-0 border-border px-4 py-2 text-center',
											'rounded-r bg-background transition group-hover/indicators:bg-muted',
											selectedIndicatorSlug === 'utci_value' &&
												'border-foreground bg-foreground font-semibold text-background group-hover/indicators:bg-foreground',
											selectedIndicatorSlug !== 'utci_value' &&
												'group-hover/indicators:hover:bg-background'
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
		{/each}
	</ul>
</nav>

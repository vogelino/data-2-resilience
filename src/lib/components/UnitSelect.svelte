<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { unit, updateUnit } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils.js';
	import { Check, ChevronDown } from 'lucide-svelte';
	import { tick } from 'svelte';
	import CollapsibleParagraph from './CollapsibleParagraph.svelte';
	import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

	let units = $derived(
		Object.entries($LL.pages.measurements.unitSelect.units)
			.filter(([key]) => !(key.endsWith('_min') || key.endsWith('_max')))
			.map(([key, value]) => ({
				value: key,
				label: value.label(),
				unitOnly: value.unitOnly(),
				description: value.description()
			}))
	);

	let open = $state(false);

	let selectedValue = $derived(units.find((f) => f.value === $unit));
	let selectedValueLabel = $derived(
		selectedValue?.label ?? $LL.pages.measurements.unitSelect.placeholder()
	);
	let selectedValueDescription = $derived(
		selectedValue?.value
			? $LL.pages.measurements.unitSelect.units[
					selectedValue.value as keyof typeof $LL.pages.measurements.unitSelect.units
				]?.description()
			: ''
	);

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<div class="scroll-mt-20" id="unit-select">
	<Popover.Root bind:open>
		{#snippet children({ ids })}
			<Popover.Trigger asChild>
				{#snippet children({ builder })}
					<Button
						builders={[builder]}
						variant="outline"
						role="combobox"
						aria-expanded={open}
						class={cn(
							'grid h-fit w-[calc(var(--leftSidebarWidth)-3rem)] grid-cols-[1fr_auto]',
							'items-center px-3 py-2.5 text-left'
						)}
					>
						<span class="truncate">{selectedValueLabel}</span>
						<ChevronDown
							class={cn(
								'ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform',
								open && 'rotate-180'
							)}
						/>
					</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content class="w-[calc(var(--leftSidebarWidth)-3rem)] -translate-y-px p-0">
				<Command.Root>
					<Command.Input
						placeholder={$LL.pages.measurements.unitSelect.searchPlaceholder()}
						class="h-9"
					/>
					<Command.Empty>{$LL.pages.measurements.unitSelect.noUnitFound()}</Command.Empty>
					<Command.Group>
						{#each units as { value, label, unitOnly, description } (value)}
							<Command.Item
								{value}
								onSelect={() => {
									updateUnit(value);
									closeAndFocusTrigger(ids.trigger);
								}}
							>
								<Tooltip disableHoverableContent openDelay={0} closeDelay={0}>
									<TooltipTrigger class="grid w-fit grid-cols-[auto_1fr_auto] gap-2 text-left">
										<Check class={cn('h-4 w-4 shrink-0', $unit !== value && 'text-transparent')} />
										<span>{label} {unitOnly ? `(${unitOnly})` : ''}</span>
										<!-- <span class="shrink-0 text-xs text-muted-foreground">
										{$LL.pages.measurements.unitSelect.xOutOfY({
											part: Math.floor(Math.random() * 10).toLocaleString($locale),
											total: units.length.toLocaleString($locale)
										})}
									</span> -->
									</TooltipTrigger>
									<TooltipContent side="right" strategy="fixed" class="w-80 max-w-full">
										{@html description}
									</TooltipContent>
								</Tooltip>
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		{/snippet}
	</Popover.Root>

	{#if selectedValue}
		<CollapsibleParagraph className="mt-2" linesClampedCount={3}>
			<p>{@html selectedValueDescription}</p>
		</CollapsibleParagraph>
	{/if}
</div>

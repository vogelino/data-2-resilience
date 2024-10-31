<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Command from '$lib/components/ui/command';
	import * as Popover from '$lib/components/ui/popover';
	import { cn } from '$lib/utils.js';
	import { Check, ChevronDown } from 'lucide-svelte';
	import { tick } from 'svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';
	import CollapsibleParagraph from './CollapsibleParagraph.svelte';

	const units = Object.entries($LL.pages.measurements.unitSelect.units)
		.filter(([key]) => !(key.endsWith('_min') || key.endsWith('_max')))
		.map(([key, value]) => ({
			value: key,
			label: value.label()
		}));

	let open = false;

	let unit = queryParam('unit', ssp.string('air_temperature'));
	$: selectedValue = units.find((f) => f.value === $unit);
	$: selectedValueLabel = selectedValue?.label ?? $LL.pages.measurements.unitSelect.placeholder();
	$: selectedValueDescription = selectedValue?.value
		? $LL.pages.measurements.unitSelect.units[
				selectedValue.value as keyof typeof $LL.pages.measurements.unitSelect.units
			]?.description()
		: '';

	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<Popover.Root bind:open let:ids>
	<Popover.Trigger asChild let:builder>
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
				class={cn('ml-2 h-4 w-4 shrink-0 opacity-50 transition-transform', open && 'rotate-180')}
			/>
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[calc(var(--leftSidebarWidth)-3rem)] -translate-y-px p-0">
		<Command.Root>
			<Command.Input
				placeholder={$LL.pages.measurements.unitSelect.searchPlaceholder()}
				class="h-9"
			/>
			<Command.Empty>{$LL.pages.measurements.unitSelect.noUnitFound()}</Command.Empty>
			<Command.Group>
				{#each units as { value, label } (value)}
					<Command.Item
						{value}
						onSelect={() => {
							$unit = value;
							closeAndFocusTrigger(ids.trigger);
						}}
						class="grid grid-cols-[auto_1fr_auto] gap-2"
					>
						<Check class={cn('h-4 w-4 shrink-0', $unit !== value && 'text-transparent')} />
						<span>{label}</span>
						<!-- <span class="shrink-0 text-xs text-muted-foreground">
							{$LL.pages.measurements.unitSelect.xOutOfY({
								part: Math.floor(Math.random() * 10).toLocaleString($locale),
								total: units.length.toLocaleString($locale)
							})}
						</span> -->
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>

{#if selectedValue}
	<CollapsibleParagraph className="mt-2" linesClampedCount={3}>
		<p>{@html selectedValueDescription}</p>
	</CollapsibleParagraph>
{/if}

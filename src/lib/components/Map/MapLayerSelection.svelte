<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { cn } from '$lib/utils';
	import CheckboxIcon from 'components/CheckboxIcon.svelte';
	import Button from 'components/ui/button/button.svelte';
	import { Layers3 } from 'lucide-svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';

	let showDistricts = queryParam('showDistricts', ssp.boolean(true));
	let showLors = queryParam('showLors', ssp.boolean(false));
	let showSatellite = queryParam('showSatellite', ssp.boolean(false));
</script>

<DropdownMenu.Root closeOnItemClick={false}>
	<DropdownMenu.Trigger asChild aria-label={$LL.map.layersSelection.ariaLabel()} let:builder>
		<Button
			builders={[builder]}
			variant="ghost"
			size="icon"
			class={cn(
				'fixed right-4 top-[calc(var(--headerHeight,5rem)+7rem)] z-50 flex flex-col gap-px',
				'rounded-md border border-border bg-border',
				'shadow-lg transition-transform duration-300 ease-in-out',
				'size-10 bg-background',
				'focusable focus-visible:z-50 focus-visible:rounded'
			)}
		>
			<Layers3 class="size-5" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="w-56">
		<DropdownMenu.Item
			on:click={() => ($showDistricts = !$showDistricts)}
			class={cn('grid grid-cols-[auto_1fr] items-center gap-2')}
		>
			<CheckboxIcon checked={$showDistricts} />
			<span class={cn($showDistricts && 'font-semibold')}>
				{$LL.map.layersSelection.districts()}
			</span>
		</DropdownMenu.Item>
		<DropdownMenu.Item
			on:click={() => ($showLors = !$showLors)}
			class={cn('grid grid-cols-[auto_1fr] items-center gap-2')}
		>
			<CheckboxIcon checked={$showLors} />
			<span class={cn($showLors && 'font-semibold')}>
				{$LL.map.layersSelection.lors()}
			</span>
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item
			on:click={() => ($showSatellite = !$showSatellite)}
			class={cn('grid grid-cols-[auto_1fr] items-center gap-2')}
		>
			<CheckboxIcon checked={$showSatellite} />
			<span class={cn($showSatellite && 'font-semibold')}>
				{$LL.map.layersSelection.satellite()}
			</span>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

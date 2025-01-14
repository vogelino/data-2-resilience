<script lang="ts">
	import { page } from '$app/state';
	import { LL, locale } from '$i18n/i18n-svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { isLeftSidebarOpened } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import type { Builder } from 'bits-ui';
	import CheckboxIcon from 'components/CheckboxIcon.svelte';
	import Button from 'components/ui/button/button.svelte';
	import type { Props as ButtonProps } from 'components/ui/button/index.ts';
	import { Layers3, RadioIcon } from 'lucide-svelte';
	import { queryParam, ssp } from 'sveltekit-search-params';

	let boundariesMode = queryParam('boundariesMode', ssp.string('districts'));
	let showSatellite = queryParam('showSatellite', ssp.boolean(false));
	let isAboutPage = $derived(page.url.pathname.startsWith(`/${$locale}/about`));
	let showLeftSidebar = $derived(!isAboutPage && $isLeftSidebarOpened);
</script>

<DropdownMenu.Root closeOnItemClick={false}>
	<DropdownMenu.Trigger asChild aria-label={$LL.map.layersSelection.ariaLabel()}>
		{#snippet children({ builder }: { builder: Builder<ButtonProps> })}
			<Button
				builders={[builder]}
				variant="ghost"
				size="icon"
				class={cn(
					'fixed right-4 top-[calc(var(--headerHeight,5rem)+6rem)] z-50 flex flex-col gap-px',
					'rounded-md border border-border bg-border',
					'shadow-lg transition duration-300 ease-in-out dark:shadow-black/80',
					'size-10 bg-background',
					'focusable focus-visible:z-50 focus-visible:rounded',
					showLeftSidebar && 'max-sm:pointer-events-none max-sm:opacity-0'
				)}
			>
				<Layers3 class="size-5" />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="w-56">
		<DropdownMenu.Item
			on:click={() => {
				if ($boundariesMode === 'districts') {
					$boundariesMode = 'none';
				} else {
					$boundariesMode = 'districts';
				}
			}}
			class={cn('grid grid-cols-[auto_1fr] items-center gap-2')}
		>
			<span
				class={cn(
					'size-4 rounded-full border border-primary',
					$boundariesMode === 'districts' && 'border-4 bg-foreground'
				)}
			></span>
			<span class={cn($boundariesMode === 'districts' && 'font-semibold')}>
				{$LL.map.layersSelection.districts()}
			</span>
		</DropdownMenu.Item>
		<DropdownMenu.Item
			on:click={() => {
				if ($boundariesMode === 'lors') {
					$boundariesMode = 'none';
				} else {
					$boundariesMode = 'lors';
				}
			}}
			class={cn('grid grid-cols-[auto_1fr] items-center gap-2')}
		>
			<span
				class={cn(
					'size-4 rounded-full border border-primary',
					$boundariesMode === 'lors' && 'border-4 bg-foreground'
				)}
			></span>
			<span class={cn($boundariesMode === 'lors' && 'font-semibold')}>
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

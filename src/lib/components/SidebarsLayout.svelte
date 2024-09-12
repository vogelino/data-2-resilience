<script lang="ts">
	import { unselectAllStations } from '$lib/stores/stationsStore';
	import {
		isLeftSidebarOpened,
		isRightSidebarOpened,
		toggleLeftSidebar
	} from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { X } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
</script>

<div
	class={cn(
		'h-[calc(100vh-var(--headerHeight,5rem))]',
		'grid grid-cols-[0,1fr,0] transition-all duration-300 ease-in-out',
		$isLeftSidebarOpened &&
			!$isRightSidebarOpened &&
			'xl:grid-cols-[var(--leftSidebarWidth),1fr,0]',
		!$isLeftSidebarOpened &&
			$isRightSidebarOpened &&
			'xl:grid-cols-[0,1fr,var(--rightSidebarWidth)]',
		$isLeftSidebarOpened &&
			$isRightSidebarOpened &&
			'xl:grid-cols-[var(--leftSidebarWidth),1fr,var(--rightSidebarWidth)]'
	)}
>
	<aside class="relative z-50">
		<div
			class={cn(
				'border-r border-border bg-background',
				'flex min-h-full w-[var(--leftSidebarWidth)] flex-col gap-4',
				'transition duration-300 ease-in-out',
				'absolute left-0 top-0 z-50',
				$isLeftSidebarOpened
					? 'translate-x-0 opacity-100 shadow-2xl'
					: '-translate-x-[var(--leftSidebarWidth)] shadow-none',
				$isRightSidebarOpened && 'max-xl:-translate-x-[var(--leftSidebarWidth)]'
			)}
		>
			<div
				class="h-[calc(100vh-var(--headerHeight,5rem))] w-[var(--leftSidebarWidth)] overflow-y-auto overflow-x-clip"
				id="left-sidebar-scroll-container"
			>
				<slot name="left-sidebar" />
			</div>
			<button
				type="button"
				class={cn(
					'group absolute right-0 top-[50vh] z-50 translate-x-full',
					' py-8 pr-6 transition-opacity focus-visible:outline-none',
					$isRightSidebarOpened && 'max-xl:pointer-events-none max-xl:opacity-0'
				)}
				on:click={toggleLeftSidebar}
			>
				<span
					class={cn(
						'rounded-r-sm border border-l-0 border-border bg-background py-3 pl-1 pr-1.5',
						'group-focus-visible:ring-2 group-focus-visible:ring-background',
						'group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-primary',
						'transition group-hover:bg-muted'
					)}
				>
					{$isLeftSidebarOpened ? '←' : '→'}
				</span>
			</button>
		</div>
	</aside>
	<main class="relative z-10 h-[calc(100vh-var(--headerHeight,5rem))] overflow-y-auto">
		<slot />
	</main>
	<aside class="relative z-50">
		<div
			class={cn(
				'border-l border-border bg-background',
				'flex min-h-full w-[var(--rightSidebarWidth)] flex-col gap-4',
				'transition duration-300 ease-in-out',
				'absolute right-0 top-0 z-50',
				$isRightSidebarOpened
					? 'translate-x-0 opacity-100 shadow-2xl'
					: 'translate-x-[var(--rightSidebarWidth)] shadow-none'
			)}
		>
			<Button
				type="button"
				size="icon"
				variant="outline"
				class={cn(
					'absolute right-4 top-4 z-50 border border-border',
					'flex size-8 items-center justify-center rounded-full bg-background'
				)}
				on:click={unselectAllStations}
			>
				<X class="h-4 w-4" />
			</Button>
			<div
				class="h-[calc(100vh-var(--headerHeight,5rem))] w-[var(--rightSidebarWidth)] overflow-y-auto overflow-x-clip"
				id="right-sidebar-scroll-container"
			>
				<slot name="right-sidebar" />
			</div>
		</div>
	</aside>
</div>

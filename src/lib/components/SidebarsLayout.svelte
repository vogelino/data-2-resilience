<script lang="ts">
	import {
		closeRightSidebar,
		isLeftSidebarOpened,
		isRightSidebarOpened,
		openRightSidebar,
		toggleLeftSidebar
	} from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
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
						'rounded-r-sm bg-background py-3 pl-1 pr-1.5',
						'group-focus-visible:ring-2 group-focus-visible:ring-background',
						'group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-primary'
					)}
				>
					{$isLeftSidebarOpened ? '←' : '→'}
				</span>
			</button>
			<div class="min-h-full w-[var(--leftSidebarWidth)] overflow-y-auto overflow-x-clip">
				<slot name="left-sidebar" />
			</div>
		</div>
	</aside>
	<main class="relative z-10 h-[calc(100vh-var(--headerHeight,5rem))] overflow-y-auto">
		<slot />
		<Button
			on:click={openRightSidebar}
			class={cn(
				'absolute right-6 top-6 transition-opacity',
				$isRightSidebarOpened ? 'pointer-events-none opacity-0' : 'opacity-100'
			)}>Open Right Sidebar</Button
		>
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
			<button
				type="button"
				class={cn(
					'absolute right-4 top-4 z-50 border border-border',
					'flex size-8 items-center justify-center rounded-full bg-background'
				)}
				on:click={closeRightSidebar}>×</button
			>
			<div class="min-h-full w-[var(--rightSidebarWidth)] overflow-y-auto overflow-x-clip">
				<slot name="right-sidebar" />
			</div>
		</div>
	</aside>
</div>

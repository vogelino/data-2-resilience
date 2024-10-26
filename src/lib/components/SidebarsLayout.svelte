<script lang="ts">
	import { isLeftSidebarOpened, toggleLeftSidebar } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
</script>

<div
	class={cn(
		'h-[calc(100vh-var(--headerHeight,5rem))]',
		'grid grid-cols-[0,1fr] transition-all duration-300 ease-in-out',
		$isLeftSidebarOpened && 'xl:grid-cols-[var(--leftSidebarWidth),1fr]'
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
					: '-translate-x-[var(--leftSidebarWidth)] shadow-none'
			)}
		>
			<div
				class="h-[calc(100vh-var(--headerHeight,5rem))] w-[var(--leftSidebarWidth)] overflow-y-auto overflow-x-clip"
				id="left-sidebar-scroll-container"
				inert={!$isLeftSidebarOpened}
			>
				<slot name="left-sidebar" />
			</div>
			<button
				type="button"
				class={cn(
					'group absolute right-0 top-[50vh] z-50 translate-x-full',
					' py-8 pr-6 transition-opacity focus-visible:outline-none'
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
</div>

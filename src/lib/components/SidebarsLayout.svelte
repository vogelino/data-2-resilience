<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { isLeftSidebarOpened, toggleLeftSidebar } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { SidebarClose, SidebarOpen } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import { page } from '$app/stores';
	import { locale } from '$i18n/i18n-svelte';

	$: isAboutPage = $page.url.pathname.replace(`/${$locale}`, '') === '/about';
	$: showLeftSidebar = $isLeftSidebarOpened && !isAboutPage;
</script>

<div
	class={cn(
		'h-[calc(100vh-var(--headerHeight,5rem))]',
		'grid grid-cols-[0,1fr] transition-all duration-300 ease-in-out',
		showLeftSidebar && 'xl:grid-cols-[var(--leftSidebarWidth),1fr]'
	)}
>
	<aside class="relative z-50">
		<div
			class={cn(
				'border-r border-border bg-background',
				'flex min-h-full w-[var(--leftSidebarWidth)] flex-col gap-4',
				'transition duration-300 ease-in-out',
				'absolute left-0 top-0 z-50',
				showLeftSidebar
					? 'translate-x-0 opacity-100 shadow-2xl'
					: '-translate-x-[var(--leftSidebarWidth)] shadow-none'
			)}
		>
			<div
				class={cn(
					'h-[calc(100vh-var(--headerHeight,5rem))]',
					'w-[var(--leftSidebarWidth)] overflow-y-auto overflow-x-clip',
					'border-r border-border'
				)}
				id="left-sidebar-scroll-container"
				inert={!showLeftSidebar}
			>
				<slot name="left-sidebar" />
			</div>
			{#if !isAboutPage}
				<div class={cn('absolute right-0 top-0 z-50 -translate-y-px translate-x-full')}>
					<div class={cn('group relative')}>
						<Button
							size="icon"
							variant="outline"
							class={cn(' rounded-none rounded-br-sm', 'size-12')}
							on:click={toggleLeftSidebar}
							aria-label={showLeftSidebar
								? $LL.generic.leftSidebar.hideAriaLabel()
								: $LL.generic.leftSidebar.showAriaLabel()}
						>
							{#if showLeftSidebar}
								<SidebarClose />
							{:else}
								<SidebarOpen />
							{/if}
						</Button>
						<div
							aria-hidden="true"
							class={cn(
								'absolute left-full top-1/2 w-fit max-w-56 -translate-y-1/2 translate-x-2',
								'whitespace-nowrap border border-border bg-background px-3 py-1.5 shadow-lg',
								'pointer-events-none rounded-sm opacity-0 hover-hover:group-hover:opacity-100',
								'text-sm transition-opacity'
							)}
						>
							{showLeftSidebar
								? $LL.generic.leftSidebar.hideAriaLabel()
								: $LL.generic.leftSidebar.showAriaLabel()}
						</div>
					</div>
				</div>
			{/if}
		</div>
	</aside>
	<main class="relative z-10 h-[calc(100vh-var(--headerHeight,5rem))] overflow-y-auto">
		<slot />
	</main>
</div>

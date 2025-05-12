<!-- @migration-task Error while migrating Svelte code: This migration would change the name of a slot making the component unusable -->
<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { LL, locale } from '$i18n/i18n-svelte';
	import {
		closeLeftSidebar,
		cycleSidebarState,
		setLeftSidebarState,
		sidebarState
	} from '$lib/stores/uiStore';
	import { SidebarState } from '$lib/types/sidebar';
	import { cn } from '$lib/utils';
	import { SidebarClose, SidebarOpen } from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';
	import Button from './ui/button/button.svelte';

	const isAboutPage = $derived($page.url.pathname.replace(`/${$locale}`, '') === '/about');
	const showLeftSidebar = $derived($sidebarState !== SidebarState.CLOSED && !isAboutPage);
	let isMobile = $state(true);
	const shouldCloseNext = $derived(
		(!isMobile && $sidebarState === SidebarState.LARGE) ||
			(isMobile && $sidebarState === SidebarState.SIMPLE)
	);

	$effect(() => {
		if (!browser) return;
		// Set --leftSidebarWidth CSS variable based on sidebar state
		if ($sidebarState === SidebarState.LARGE) {
			document.documentElement.style.setProperty(
				'--leftSidebarWidth',
				`min(56rem, calc(100vw - 3rem))`
			);
		} else {
			document.documentElement.style.removeProperty('--leftSidebarWidth');
		}
	});

	function onMobileMediaQueryChange(e: MediaQueryListEvent) {
		isMobile = e.matches;
		if (e.matches && $sidebarState === SidebarState.LARGE) {
			console.log('setting to simple because mobile');
			setLeftSidebarState(SidebarState.SIMPLE);
		}
	}

	let mediaQuery: MediaQueryList | null = null;
	onMount(() => {
		if (!browser || mediaQuery) return;
		mediaQuery = window.matchMedia('(max-width: 1280px)');
		isMobile = mediaQuery.matches;
		mediaQuery.addEventListener('change', onMobileMediaQueryChange);
	});

	onDestroy(() => {
		mediaQuery?.removeEventListener('change', onMobileMediaQueryChange);
	});
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
				'transition-all duration-300 ease-in-out',
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
					'border-r border-border',
					'transition-all duration-300 ease-in-out'
				)}
				id="left-sidebar-wrapper"
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
							onclick={cycleSidebarState}
							aria-label={shouldCloseNext
								? $LL.generic.leftSidebar.hideAriaLabel()
								: $LL.generic.leftSidebar.showAriaLabel()}
						>
							{#if shouldCloseNext}
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
							{shouldCloseNext
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
		{#if showLeftSidebar}
			<button
				class={cn('absolute inset-0 z-50 bg-muted/50 backdrop-blur-sm md:hidden', 'transition-all')}
				onclick={closeLeftSidebar}
				aria-hidden="true"
			></button>
		{/if}
	</main>
</div>

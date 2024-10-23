<script lang="ts">
	import { page } from '$app/stores';
	import LL, { locale } from '$i18n/i18n-svelte';
	import { tabActive } from '$lib/stores/uiStore';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import WelcomeMessage from './WelcomeMessage.svelte';

	let navElement: HTMLElement;
	$: fullPath = $page.url.pathname.replace(`/${$locale}`, '');
	$: tabs = [
		{
			slug: 'measurements',
			name: $LL.navigation.tabs.actualMeasurements(),
			isActive: fullPath === '/' || fullPath === ''
		},
		{
			slug: 'heat-stress',
			name: $LL.navigation.tabs.heatStress(),
			isActive: fullPath === '/heat-stress'
		},
		{
			slug: 'stations',
			name: $LL.navigation.tabs.stations(),
			isActive: fullPath === '/stations'
		}
	];

	$: $tabActive = tabs.find((tab) => tab.isActive)?.slug || tabs[0].slug;

	const urlQuery = $page.url.searchParams.toString();

	onMount(() => {
		document.getElementById('left-sidebar-scroll-container')?.addEventListener('scroll', () => {
			const scrollTop = document.getElementById('left-sidebar-scroll-container')?.scrollTop;
			if (!navElement) return;
			const { top, height } = navElement.getBoundingClientRect();
			if (scrollTop && scrollTop > Math.abs(top + height + 10)) {
				navElement.classList.add('shadow-2xl');
			} else {
				navElement.classList.remove('shadow-2xl');
			}
		});
	});
</script>

<WelcomeMessage />
<nav
	class="sticky top-0 z-50 border-b border-r border-border bg-background pt-1 shadow-black/10 transition-shadow duration-1000"
	bind:this={navElement}
>
	<ul
		class="flex w-[var(--leftSidebarWidth)] translate-y-px overflow-x-auto overflow-y-clip [&:has(:focus-visible)]:overflow-visible"
	>
		{#each tabs as tab (tab.slug)}
			<li
				class={cn(
					'relative -mb-px -ml-px flex',
					tab.isActive && 'z-10',
					'[&:has(:focus-visible)]:z-20'
				)}
			>
				<a
					href={[
						`/${$locale}`,
						tab.slug === tabs[0].slug ? '' : `/${tab.slug}`,
						urlQuery ? `?${urlQuery}` : ''
					].join('')}
					class={cn(
						'focusable px-4 pb-2 pt-3 transition focus-visible:rounded-lg',
						'text-nowrap border border-transparent focus-visible:z-10 hover-hover:hover:z-50',
						tab.slug === tabs[0].slug ? 'rounded-tr-lg pl-6' : ' rounded-t-lg',
						tab.isActive && cn('border-border border-b-background bg-background font-semibold'),
						tab.isActive && tab.slug === tabs[0].slug && 'border-l-background',
						!tab.isActive &&
							cn(
								'hover-hover:hover:border-border hover-hover:hover:border-b-border hover-hover:hover:bg-muted',
								'border-b-2 focus-visible:border-b'
							)
					)}>{tab.name}</a
				>
			</li>
		{/each}
	</ul>
</nav>
<section class="p-6"><slot /></section>

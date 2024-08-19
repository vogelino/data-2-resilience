<script lang="ts">
	import { page } from '$app/stores';
	import LL, { locale } from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';

	let navElement: HTMLElement;
	$: fullPath = $page.url.pathname.replace(`/${$locale}`, '');
	$: tabs = [
		{
			slug: 'thermical-comfort',
			name: $LL.navigation.tabs.thermicalComfort(),
			isActive: fullPath === '/' || fullPath === ''
		},
		{
			slug: 'measurements',
			name: $LL.navigation.tabs.actualMeasurements(),
			isActive: fullPath === '/measurements'
		},
		{
			slug: 'stations',
			name: $LL.navigation.tabs.stations(),
			isActive: fullPath === '/stations'
		}
	];
	const urlQuery = $page.url.searchParams.toString();

	onMount(() => {
		document.getElementById('left-sidebar-scroll-container')?.addEventListener('scroll', () => {
			const scrollTop = document.getElementById('left-sidebar-scroll-container')?.scrollTop;
			if (!navElement) return;
			if (scrollTop && scrollTop > 10) {
				navElement.classList.add('shadow-2xl');
			} else {
				navElement.classList.remove('shadow-2xl');
			}
		});
	});
</script>

<nav
	class="sticky top-0 z-50 border-r border-border bg-background shadow-black/10 transition-shadow"
	bind:this={navElement}
>
	<ul class="flex border-b border-border pt-6">
		{#each tabs as tab (tab.slug)}
			<li class={cn('relative -mb-px -ml-px flex', tab.isActive && 'z-10', 'focus-within:z-10')}>
				<a
					href={[
						`/${$locale}`,
						tab.slug === 'thermical-comfort' ? '' : `/${tab.slug}`,
						urlQuery ? `?${urlQuery}` : ''
					].join('')}
					class={cn(
						'focusable px-4 pb-2 pt-3 transition focus-visible:rounded-lg',
						'border border-background border-b-transparent hover:z-10',
						tab.slug === 'thermical-comfort' ? 'rounded-tr-lg pl-6' : ' rounded-t-lg',
						tab.isActive && 'border-border border-b-background bg-background font-semibold',
						tab.isActive && tab.slug === 'thermical-comfort' && 'border-l-background',
						!tab.isActive && 'hover:border-border hover:bg-muted'
					)}>{tab.name}</a
				>
			</li>
		{/each}
	</ul>
</nav>
<section class="p-6"><slot /></section>

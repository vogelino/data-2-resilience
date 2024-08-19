<script lang="ts">
	import { page } from '$app/stores';
	import LL, { locale } from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';

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
</script>

<nav>
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
						'focusable px-4 py-2 transition focus-visible:rounded-lg',
						'border border-background border-b-transparent',
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

<script lang="ts">
	import { setLocale } from '$i18n/i18n-svelte';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';
	import Head from 'components/head.svelte';
	import { ModeWatcher } from 'mode-watcher';

	import '../../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	// at the very top, set the locale before you access the store and before the actual rendering takes place
	data && setLocale(data.locale);
</script>

<Head />
<ModeWatcher />

<div class="grid h-screen w-screen grid-rows-[auto,1fr] overflow-clip">
	<QueryClientProvider client={data?.queryClient}>
		<slot />
		<SvelteQueryDevtools />
	</QueryClientProvider>
</div>

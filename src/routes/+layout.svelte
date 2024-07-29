<script lang="ts">
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import Header from '$lib/components/Header.svelte';
	import Head from 'components/head.svelte';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	// at the very top, set the locale before you access the store and before the actual rendering takes place
	setLocale(data.locale);

	console.info($LL.log({ fileName: '+layout.svelte' }));
</script>

<Head />
<Header title={$LL.siteNameShort()} />

<main class="p-6">
	<slot />
</main>

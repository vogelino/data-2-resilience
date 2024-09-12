<script lang="ts">
	import LL, { setLocale } from '$i18n/i18n-svelte';
	import Header from '$lib/components/Header.svelte';
	import Head from 'components/head.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	// at the very top, set the locale before you access the store and before the actual rendering takes place
	setLocale(data.locale);

	console.info($LL.log({ fileName: '+layout.svelte' }));
</script>

<Head />
<ModeWatcher />

<div class="grid h-screen w-screen grid-rows-[auto,1fr] overflow-clip">
	<Header title={$LL.siteNameShort()} subtitle={$LL.siteSubtitle()} />
	<slot />
</div>

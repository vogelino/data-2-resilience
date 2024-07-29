<script lang="ts">
	import LL from '$i18n/i18n-svelte';

	console.info($LL.log({ fileName: '+page.svelte' }));
</script>

<main class="flex flex-col gap-2 p-6">
	<h2>
		{$LL.siteNameLong()}
	</h2>

	<h3>
		{$LL.siteDescription()}
	</h3>
</main>

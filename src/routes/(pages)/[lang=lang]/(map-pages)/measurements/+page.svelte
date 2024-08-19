<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import Sun from 'lucide-svelte/icons/sun';
</script>

<h1 class="mb-2 text-xl font-semibold">{$LL.pages.measurements.title()}</h1>
{#each Object.values($LL.pages.measurements.intro) as paragraph}
	<p class="mb-2">{paragraph()}</p>
{/each}

<div class="mt-6 grid grid-cols-12 gap-4 text-sm">
	<dl class="col-span-5 flex flex-col items-end rounded-md border border-border p-2">
		<dt>Aktive Messstationen</dt>
		<dd class="text-2xl font-semibold">82</dd>
	</dl>
	<dl class="col-span-7 flex flex-col items-end rounded-md border border-border p-2">
		<dt>Universeller Thermischer Klimaindex</dt>
		<dd class="text-2xl font-semibold">21°C</dd>
	</dl>
	<dl class="col-span-4 flex flex-col items-end rounded-md border border-border p-2">
		<dt>Niederschlag (24h)</dt>
		<dd class="text-2xl font-semibold">57 mm</dd>
	</dl>
	<dl class="col-span-4 flex flex-col items-end rounded-md border border-border p-2">
		<dt>Luftdruck aktuell</dt>
		<dd class="text-2xl font-semibold">1080 hPa</dd>
	</dl>
	<dl class="col-span-4 flex flex-col items-end rounded-md border border-border p-2">
		<dt>Wind aktuell</dt>
		<dd class="text-2xl font-semibold">4 m/s</dd>
	</dl>
	<dl class="col-span-12 flex flex-col items-center rounded-md border border-border p-2">
		<dt>Wetterstation aktuell</dt>
		<dd class="flex items-center gap-2 text-2xl font-semibold">
			<Sun class="h-6 w-6 text-foreground" />
			sonnig / bewölkt
		</dd>
	</dl>
</div>

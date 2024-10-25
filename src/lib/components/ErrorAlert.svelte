<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { Frown } from 'lucide-svelte';

	export let errorObject: Error | undefined | null;
	export let label = $LL.errors.unexpectedError.label();
	export let description = $LL.errors.unexpectedError.description();
</script>

<div
	class="flex max-h-72 max-w-sm flex-col gap-2 overflow-y-auto rounded border border-red-600 bg-red-50 p-4 text-red-900"
>
	<strong class="flex items-center gap-2">
		<Frown class="inline-block size-6 shrink-0" />
		<span class="mt-1">{label}</span>
	</strong>
	{description}
	{#if errorObject}
		<p class="overflow-auto rounded-sm border border-black/10 bg-black/5 p-3 font-mono text-sm">
			{errorObject.message.trim()}
		</p>
	{/if}
</div>

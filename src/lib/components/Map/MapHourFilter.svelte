<script lang="ts">
	import { LL } from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import HourInput from 'components/HourInput.svelte';
</script>

<div
	class={cn(
		'fixed bottom-8 right-8 z-10  bg-background/80 shadow-lg backdrop-blur-[2px]',
		'flex flex-col gap-1 rounded'
	)}
>
	<span class="rounded-t border border-b-0 border-border px-2 pt-1 text-sm font-semibold">
		{$LL.generic.hourInput.label()}
	</span>
	<HourInput
		classes={{
			container: 'grid-cols-[auto,2.5rem] bg-transparent rounded-t-none',
			input: 'text-3xl px-5 py-3 bg-transparent',
			icon: 'size-5'
		}}
	/>
</div>

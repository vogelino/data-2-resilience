<script lang="ts">
	import { cn } from '$lib/utils';
	import { queryParam, ssp } from 'sveltekit-search-params';

	let hour = queryParam('hour', ssp.number(12));

	$: hourBefore = $hour - 1 < 0 ? undefined : $hour - 1;
	$: hourAfter = $hour + 1 > 23 ? undefined : $hour + 1;

	function onHourChange(e: Event) {
		const target = e.target as HTMLInputElement;
		hour.set(parseInt(target.value.split(':')[0], 10));
	}
</script>

<div
	class={cn(
		'fixed bottom-8 right-8 z-10 overflow-clip rounded shadow-lg',
		'[&:has(input:focus-visible)]:ring-2 [&:has(input:focus-visible)]:ring-foreground',
		'[&:has(input:focus-visible)]:ring-offset-2 [&:has(input:focus-visible)]:ring-offset-background'
	)}
>
	<div class="relative contents">
		{#if hourBefore}
			<span
				class={cn(
					'absolute inset-x-0 top-0 flex h-1/3 items-end justify-center text-2xl',
					'pointer-events-none translate-y-1 scale-95 text-center opacity-20'
				)}
				aria-hidden="true"
			>
				{`${hourBefore}`.padStart(2, '0')}:00
			</span>
		{/if}
		<input
			type="time"
			min="0"
			max="23"
			value={`${`${$hour}`.padStart(2, '0')}:00`}
			pattern="[0-9]{2}:0{2}"
			step="3600"
			on:change={onHourChange}
			class={cn(
				'pointer-events-auto size-24 rounded border border-border',
				'px-0 py-0 text-center text-2xl',
				'outline-none'
			)}
		/>
		{#if hourAfter}
			<span
				class={cn(
					'absolute inset-x-0 bottom-0 flex h-1/3 items-end justify-center text-2xl',
					'pointer-events-none -translate-y-1 scale-95 text-center opacity-20'
				)}
				aria-hidden="true"
			>
				{`${hourAfter}`.padStart(2, '0')}:00
			</span>
		{/if}
	</div>
</div>

<style>
	input[type='time']::-webkit-calendar-picker-indicator {
		display: none;
	}
</style>

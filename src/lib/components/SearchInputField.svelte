<script lang="ts">
	import { cn } from '$lib/utils';
	import { Search, ArrowLeftToLine } from 'lucide-svelte';
	import { Button } from './ui/button';

	let {
		label,
		placeholder,
		value,
		onchange = () => {},
		classNames,
		onFocus = () => {},
		onBlur = () => {}
	}: {
		label?: string;
		placeholder: string;
		onchange?: (newValue: string) => void;
		value: string;
		classNames?: {
			container?: string;
			label?: string;
			inputWrapper?: string;
			input?: string;
			button?: string;
		};
		onFocus?: () => void;
		onBlur?: () => void;
	} = $props();
	let inputElement: HTMLInputElement | undefined = $state();
</script>

<label class={cn('flex translate-y-1 flex-col gap-1', classNames?.container)}>
	{#if label && label.length > 0}
		<span class={cn('text-sm font-semibold', classNames?.label)}>{label}</span>
	{/if}
	<div class={cn('relative', classNames?.inputWrapper)}>
		<input
			type="text"
			{value}
			oninput={() => {
				if (!inputElement) return;
				onchange(inputElement.value);
			}}
			bind:this={inputElement}
			onfocus={() => {
				onFocus && onFocus();
			}}
			onblur={() => {
				onBlur && onBlur();
			}}
			{placeholder}
			class={cn(
				'px-4 py-2 text-base placeholder-muted-foreground',
				'w-64 max-w-full rounded border border-border bg-background',
				'focusable focus-visible:border-muted-foreground',
				classNames?.input
			)}
		/>
		<Button
			size="icon"
			variant="ghost"
			on:click={() => {
				if (value.length === 0) {
					inputElement?.focus();
				} else {
					onchange('');
				}
			}}
			class={cn(
				'absolute right-px top-1/2 h-[calc(100%-2px)] -translate-y-1/2',
				'rounded-none rounded-r-sm focus-visible:rounded',
				classNames?.button
			)}
		>
			{#if value.length === 0}
				<Search class="size-5" />
			{:else}
				<ArrowLeftToLine class="size-5" />
			{/if}
		</Button>
	</div>
</label>

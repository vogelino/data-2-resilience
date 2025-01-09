<script lang="ts">
	let {
		searchQuery,
		text
	}: {
		searchQuery?: string;
		text: string;
	} = $props();
	let parts = $derived(searchQuery ? text.split(new RegExp(`(${searchQuery})`, 'gi')) : [text]);
</script>

{#if searchQuery}
	{#each parts as part}
		<span class={part.toLowerCase() === searchQuery.toLowerCase() ? 'bg-primary/50' : ''}>
			{part}
		</span>
	{/each}
{:else}
	{text}
{/if}

<script lang="ts">
	import Form from '$lib/components/form.svelte';
	import { useUrlState } from '$lib/useUrlState';

	let urlState = useUrlState();
</script>

<div class="flex h-screen w-screen flex-col items-center justify-center gap-8 bg-slate-400 p-6">
	<Form />
	<button
		class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
		on:click={urlState.reset}>Reset to initial state</button
	>
</div>

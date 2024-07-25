<script lang="ts">
	import { useUrlState } from '$lib/useUrlState';

	let urlState = useUrlState();
</script>

<div class="flex h-screen w-screen items-center justify-center bg-slate-400 p-6">
	<form
		on:submit|preventDefault={() => {}}
		class="grid grid-cols-2 gap-4 rounded-lg bg-white p-6 shadow-md"
	>
		<label for="query">Query</label>
		<input
			type="text"
			name="query"
			id="query"
			bind:value={$urlState.query}
			placeholder="Search..."
		/>
		<label for="bool">Boolean</label>
		<input type="checkbox" name="bool" id="bool" bind:checked={$urlState.bool} />
		<label for="slider">Slider</label>
		<input type="range" name="slider" id="slider" min="0" max="100" bind:value={$urlState.slider} />
	</form>
</div>

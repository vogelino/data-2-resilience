<script lang="ts">
	import DatavisHourInput from 'components/HourInput.svelte';
</script>

<DatavisHourInput
	classes={{
		container:
			'fixed bottom-8 right-8 z-10 shadow-lg grid-cols-[auto,2.5rem] bg-background/80 backdrop-blur-[2px]',
		input: 'text-3xl px-5 py-3 bg-transparent',
		icon: 'size-5'
	}}
/>

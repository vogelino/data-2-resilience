<script lang="ts">
	import CollapsibleParagraph from './CollapsibleParagraph.svelte';

	export let title: string;
	export let description: string;
	export let image: {
		src: string;
		alt: string;
	};
</script>

<li class="rounded-xl border border-border bg-background">
	<header class="flex h-fit flex-col items-start border-b border-border p-4 pb-6">
		<h2 class="mb-1 text-lg font-semibold">
			{title}
		</h2>
		<CollapsibleParagraph linesClampedCount={3} className="text-sm">
			<p>{description}</p>
		</CollapsibleParagraph>
	</header>
	<img
		src={image.src}
		alt={image.alt}
		class="aspect-2.61/1 w-full rounded-b-xl bg-primary object-contain"
	/>
</li>

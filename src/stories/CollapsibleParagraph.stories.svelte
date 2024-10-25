<script lang="ts" context="module">
	import type { Meta } from '@storybook/svelte';

	import CollapsibleParagraph from '$lib/components/CollapsibleParagraph.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	export const meta = {
		title: 'Project Specific/CollapsibleParagraph',
		component: CollapsibleParagraph,
		args: {}
	} satisfies Meta<CollapsibleParagraph>;
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { setContext } from 'svelte';
	import MainLayout from '../routes/(pages)/+layout.svelte';

	setContext('page-ctx', {
		url: new URL('', 'https://example.com'),
		params: { lang: 'en' }
	});
</script>

<Template let:args let:context>
	<MainLayout data={{ locale: 'en' }}>
		<CollapsibleParagraph {...args}>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam necessitatibus ea rem,
				adipisci illum tempore, qui dolores eaque aspernatur repellendus quam mollitia officiis amet
				obcaecati voluptatibus quod deserunt, repudiandae alias.
			</p>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam necessitatibus ea rem,
				adipisci illum tempore, qui dolores eaque aspernatur repellendus quam mollitia officiis amet
				obcaecati voluptatibus quod deserunt, repudiandae alias.
			</p>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam necessitatibus ea rem,
				adipisci illum tempore, qui dolores eaque aspernatur repellendus quam mollitia officiis amet
				obcaecati voluptatibus quod deserunt, repudiandae alias.
			</p>
		</CollapsibleParagraph>
	</MainLayout>
</Template>

<Story name="Default" />
<Story name="More Lines Clamped" args={{ linesClampedCount: 3 }} />
<Story name="Expanded by default" args={{ defaultIsExpanded: true }} />

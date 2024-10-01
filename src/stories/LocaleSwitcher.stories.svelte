<script lang="ts" context="module">
	import type { Meta } from '@storybook/svelte';

	import LocaleSwitcher from '$lib/components/LocaleSwitcher.svelte';

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	export const meta = {
		title: 'Project Specific/LocaleSwitcher',
		component: LocaleSwitcher,
		args: {}
	} satisfies Meta<LocaleSwitcher>;
</script>

<script lang="ts">
	import { Story, Template } from '@storybook/addon-svelte-csf';
	import { getAllContexts, setContext } from 'svelte';
	const allContexts = getAllContexts();
	const registrationCxt = allContexts.get('storybook-registration-context');
	const params = registrationCxt?.storyContext?.parameters;
	const lang = params?.lang === 'de' ? 'de' : 'en';

	setContext('page-ctx', {
		url: new URL('', 'https://example.com'),
		params: { lang }
	});
</script>

<Template let:args>
	<LocaleSwitcher {...args} />
</Template>

<Story name="Primary" />

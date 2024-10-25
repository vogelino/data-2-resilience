import type { Meta, StoryObj } from '@storybook/svelte';

import Logo from '$lib/components/Logo.svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Project Specific/Logo',
	component: Logo,
	args: {
		className: 'size-24'
	}
} satisfies Meta<Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {};

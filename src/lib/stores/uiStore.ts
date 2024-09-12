import { derived, writable } from 'svelte/store';

export const isLeftSidebarOpened = writable(true);
export const toggleLeftSidebar = () => isLeftSidebarOpened.update((value) => !value);

export const isRightSidebarOpened = derived(
	[], // [page, locale],
	() => false
);

export const tabActive = writable('thermical-comfort');

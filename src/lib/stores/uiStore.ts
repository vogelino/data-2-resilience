import { writable } from 'svelte/store';

export const isLeftSidebarOpened = writable(true);
export const toggleLeftSidebar = () => isLeftSidebarOpened.update((value) => !value);

export const isRightSidebarOpened = writable(false);
export const closeRightSidebar = () => isRightSidebarOpened.set(false);
export const openRightSidebar = () => isRightSidebarOpened.set(true);

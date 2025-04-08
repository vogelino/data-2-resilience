export const SidebarState = {
	CLOSED: 'closed',
	SIMPLE: 'simple',
	LARGE: 'large'
} as const;

export type SidebarState = (typeof SidebarState)[keyof typeof SidebarState];

export const SIDEBAR_STATE_CYCLE: SidebarState[] = [
	SidebarState.CLOSED,
	SidebarState.SIMPLE,
	SidebarState.LARGE
];

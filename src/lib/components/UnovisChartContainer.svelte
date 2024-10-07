<script lang="ts">
	import { cn } from '$lib/utils';

	export let className: string = '';
</script>

<div class={cn('unovis-chart-container', className)}>
	<slot />
</div>

<style>
	:global(.unovis-chart-container) {
		/* UNOVIS CHARTS THEMING */
		--vis-font-family: Inter, Arial, 'Helvetica Neue', Helvetica, sans-serif;
		--vis-color-main: hsl(var(--primary));
		--vis-color-main-light: hsl(var(--primary));
		--vis-color-main-dark: hsl(var(--primary-foreground));
		--vis-color-grey: hsl(var(--muted));

		--vis-color0: hsl(var(--primary));
		/* --vis-color0: #4d8cfd;
		--vis-color1: #ff6b7e;
		--vis-color2: #f4b83e;
		--vis-color3: #a6cc74;
		--vis-color4: #00c19a;
		--vis-color5: #6859be;
		--vis-dark-color0: #4d8cfd;
		--vis-dark-color1: #ff6b7e;
		--vis-dark-color2: #ffc16d;
		--vis-dark-color3: #a6cc74;
		--vis-dark-color4: #00c19a;
		--vis-dark-color5: #7887e0; */

		--vis-axis-tick-color: hsl(var(--muted-foreground) / 0.2);
		--vis-axis-grid-color: hsl(var(--muted-foreground) / 0.2);
		--vis-axis-label-color: hsl(var(--muted-foreground));
		--vis-axis-tick-label-color: hsl(var(--muted-foreground));
		--vis-axis-tick-label-font-size: 0.75rem;
		--vis-axis-tick-label-cursor: default;
		--vis-axis-tick-label-text-decoration: none;
		--vis-axis-label-font-size: 1rem;
		--vis-axis-tick-line-width: 1px;
		--vis-axis-grid-line-width: 1px;
		--vis-dark-axis-tick-color: hsl(var(--muted-foreground) / 0.2);
		--vis-dark-axis-tick-label-color: hsl(var(--muted-foreground));
		--vis-dark-axis-grid-color: hsl(var(--muted-foreground) / 0.2);
		--vis-dark-axis-label-color: hsl(var(--muted-foreground));

		--vis-tooltip-background-color: hsl(var(--background));
		--vis-tooltip-border-color: hsl(var(--border));
		--vis-tooltip-text-color: hsl(var(--foreground));
		--vis-tooltip-shadow-color: rgba(172, 179, 184, 0.35);
		--vis-tooltip-backdrop-filter: none;
		--vis-tooltip-padding: 0.5rem 0.75rem;
		--vis-dark-tooltip-background-color: hsl(var(--background));
		--vis-dark-tooltip-text-color: hsl(var(--foreground));
		--vis-dark-tooltip-border-color: hsl(var(--border));
		--vis-dark-tooltip-shadow-color: rgba(0, 0, 0, 0.95);
	}
</style>

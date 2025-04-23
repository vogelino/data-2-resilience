<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import LL, { locale } from '$i18n/i18n-svelte';
	import {
		closeLeftSidebar,
		datavisType,
		dayValue,
		heatStressUnit,
		hour,
		minMaxAvg,
		openLeftSidebar,
		rangeEnd,
		rangeStart,
		setLeftSidebarState,
		sidebarState,
		udpateDatavisType,
		udpateDay,
		udpateRangeStart,
		unit,
		updateHeatStressUnit,
		updateHour,
		updateMinMaxAvg,
		updateRangeEnd,
		updateUnit
	} from '$lib/stores/uiStore';
	import { SidebarState } from '$lib/types/sidebar';
	import { cn } from '$lib/utils';
	import { today } from '$lib/utils/dateUtil';
	import { getHours } from 'date-fns';
	import { ArrowDown, X } from 'lucide-svelte';
	import Shepherd, { type StepOptions, type StepOptionsButton, type Tour } from 'shepherd.js';
	import 'shepherd.js/dist/css/shepherd.css';
	import { onMount } from 'svelte';
	import { queryParameters } from 'sveltekit-search-params';
	import Button from './ui/button/button.svelte';

	let opened = $state(false);
	let tour: Tour | undefined;
	let isMobile = $state(true);

	onMount(() => {
		if (!browser) return;
		const mediaQuery = window.matchMedia('(max-width: 768px)');
		function setIsMobile(e: MediaQueryListEvent) {
			isMobile = e.matches;
		}
		mediaQuery.addEventListener('change', setIsMobile);
		isMobile = mediaQuery.matches;
		return () => mediaQuery.removeEventListener('change', setIsMobile);
	});

	onMount(() => {
		const lastValue = localStorage.getItem('welcome-opened');
		if (lastValue === 'true') {
			opened = true;
		} else if (lastValue === 'false') {
			opened = false;
		}
	});

	onMount(() => {
		tour = new Shepherd.Tour({
			useModalOverlay: true,
			keyboardNavigation: true,
			exitOnEsc: true,
			defaultStepOptions: {
				classes: 'shepherd-theme-custom',
				scrollTo: false
			}
		});
		tour.on('start', onTourStart);
		tour.on('active', onTourActive);
		tour.on('complete', onTourEnd);
		tour.on('cancel', onTourEnd);

		return () => {
			tour?.off('start', onTourStart);
			tour?.off('active', onTourActive);
			tour?.off('complete', onTourEnd);
			tour?.off('cancel', onTourEnd);
		};
	});

	async function wait(timeout: number): Promise<void> {
		return new Promise((resolve) => {
			const to = setTimeout(() => {
				clearTimeout(to);
				resolve();
			}, timeout);
		});
	}

	async function waitForElement(selector: string): Promise<HTMLElement | false> {
		let it: NodeJS.Timeout | undefined;

		try {
			return await Promise.race([
				new Promise<HTMLElement | false>((resolve) => {
					it = setInterval(() => {
						const element = document.querySelector(selector);
						if (!(element instanceof HTMLElement)) return;
						resolve(element);
						clearInterval(it);
					}, 100);
				}),
				new Promise<false>((resolve) => wait(2000).then(() => resolve(false)))
			]);
		} finally {
			clearInterval(it);
		}
	}

	async function scrollToHandler(selector: string) {
		const element = document.querySelector(selector) as HTMLElement;
		const container = await waitForElement('#left-sidebar-scroll-container');
		if (!container || !element) return;

		const targetOffsetTop = element.offsetTop;
		const scrollMarginTop = Number.parseInt(getComputedStyle(element).scrollMarginTop, 10) || 0;

		const targetScrollPosition = targetOffsetTop - scrollMarginTop;

		container.scrollTo({
			top: targetScrollPosition,
			behavior: 'smooth'
		});
	}

	const ensurePage = $derived(async (path: string, currentPathname: string) => {
		const pathWithLocale = `/${$locale}${path === '/' ? '' : path}`;
		const fullPath = `${pathWithLocale}?${urlQuery}`;
		if (currentPathname !== pathWithLocale) {
			await goto(fullPath);
		}
	});

	const queryParams = $derived(queryParameters());
	const urlQuery = $derived(new URLSearchParams($queryParams).toString());

	function destroyTour() {
		if (!tour) return;
		tour.cancel();
		tour.steps.forEach((step) => step.destroy());
		tour.steps = [];
	}

	$effect(() => {
		if (!tour) return;
		const nextButton = {
			text: $LL.welcome.tourSteps.buttons.next(),
			action: tour.next
		} satisfies StepOptionsButton;
		const prevButton = {
			text: $LL.welcome.tourSteps.buttons.prev(),
			action: tour.back,
			secondary: true
		} satisfies StepOptionsButton;
		const cancelButton = {
			text: $LL.welcome.tourSteps.buttons.cancel(),
			action: tour.cancel,
			secondary: true
		} satisfies StepOptionsButton;
		const finishButton = {
			text: $LL.welcome.tourSteps.buttons.last(),
			action: tour.complete
		} satisfies StepOptionsButton;

		const steps = [
			{
				id: 'welcome',
				title: $LL.welcome.tourSteps.welcome.title(),
				text: $LL.welcome.tourSteps.welcome.text(),
				beforeShowPromise: async () => {
					await ensurePage('/', window.location.pathname);
				}
			} satisfies StepOptions,
			{
				id: 'navigation',
				title: $LL.welcome.tourSteps.navigation.title(),
				text: $LL.welcome.tourSteps.navigation.text(),
				attachTo: {
					element: '#navigation',
					on: isMobile ? 'auto' : 'right'
				},
				beforeShowPromise: async () => {
					await ensurePage('/', window.location.pathname);
					openLeftSidebar();
					await scrollToHandler('#navigation');
				}
			} satisfies StepOptions,
			{
				id: 'measurements',
				title: $LL.welcome.tourSteps.measurements.title(),
				text: $LL.welcome.tourSteps.measurements.text(),
				attachTo: {
					element: '#unit-select',
					on: isMobile ? 'auto' : 'right'
				},
				beforeShowPromise: async () => {
					await ensurePage('/', window.location.pathname);
					openLeftSidebar();
					await scrollToHandler('#unit-select');
				}
			} satisfies StepOptions,
			{
				id: 'datavisType',
				title: $LL.welcome.tourSteps.datavisType.title(),
				text: $LL.welcome.tourSteps.datavisType.text(),
				attachTo: {
					element: '#date-range-slider',
					on: isMobile ? 'auto' : 'right'
				},
				beforeShowPromise: async () => {
					await ensurePage('/', window.location.pathname);
					openLeftSidebar();
					await scrollToHandler('#date-range-slider');
				}
			} satisfies StepOptions,
			{
				id: 'visualisation',
				title: $LL.welcome.tourSteps.visualisation.title(),
				text: $LL.welcome.tourSteps.visualisation.text(),
				attachTo: {
					element: '#stations-datavis',
					on: isMobile ? 'auto' : 'right'
				},
				beforeShowPromise: async () => {
					await ensurePage('/', window.location.pathname);
					openLeftSidebar();
					await scrollToHandler('#stations-datavis');
				}
			} satisfies StepOptions,
			{
				id: 'map',
				title: $LL.welcome.tourSteps.map.title(),
				text: $LL.welcome.tourSteps.map.text(),
				attachTo: {
					element: '#map',
					on: 'top'
				},
				beforeShowPromise: async () => {
					await ensurePage('/', window.location.pathname);
					isMobile ? closeLeftSidebar() : openLeftSidebar();
				}
			},
			{
				id: 'heatStress',
				title: $LL.welcome.tourSteps.heatStress.title(),
				text: $LL.welcome.tourSteps.heatStress.text(),
				attachTo: {
					element: '#map',
					on: 'top'
				},
				beforeShowPromise: async () => {
					await ensurePage('/heat-stress', window.location.pathname);
					isMobile ? closeLeftSidebar() : openLeftSidebar();
				}
			},
			{
				id: 'stationsTable',
				title: $LL.welcome.tourSteps.stationsTable.title(),
				text: $LL.welcome.tourSteps.stationsTable.text(),
				attachTo: {
					element: '#stations-table'
				},
				beforeShowPromise: async () => {
					await ensurePage('/stations', window.location.pathname);
					isMobile ? closeLeftSidebar() : openLeftSidebar();
				}
			} satisfies StepOptions
		].map((originalStep, idx, arr) => {
			const isFirst = idx === 0;
			const isLast = idx === arr.length - 1;
			const step = originalStep as StepOptions;
			return {
				...step,
				buttons: step.buttons || [
					...(isLast ? [] : [cancelButton]),
					...(isFirst ? [] : [prevButton]),
					...(isLast ? [finishButton] : [nextButton])
				],
				attachTo:
					step.attachTo &&
					({
						on: 'auto',
						...step.attachTo
					} satisfies StepOptions['attachTo'])
			} satisfies StepOptions;
		});
		tour.addSteps(steps);

		return destroyTour;
	});

	type TourSettings = {
		pagePath: string;
		unit: string;
		datavisType: 'day' | 'hour' | 'range';
		rangeStart: number;
		rangeEnd: number;
		sidebarState: SidebarState;
		dayValue: number;
		minMaxAvg: 'min' | 'max' | 'avg';
		hour: number;
		heatStressUnit: 'utci' | 'pet';
	};
	let initialSettings: TourSettings;
	const tourOptimalSettings = $derived({
		pagePath: '/',
		unit: 'utci',
		datavisType: 'range',
		rangeStart: -10,
		rangeEnd: 0,
		dayValue: -2,
		sidebarState: isMobile ? SidebarState.CLOSED : SidebarState.SIMPLE,
		minMaxAvg: 'avg',
		hour: getHours(today()),
		heatStressUnit: 'utci'
	} satisfies TourSettings);

	function saveInitialSettings() {
		const pagePath = window.location.pathname.replace(`/${$locale}`, '') || '/';
		initialSettings = {
			pagePath,
			unit: $unit,
			datavisType: $datavisType,
			rangeStart: $rangeStart,
			rangeEnd: $rangeEnd,
			sidebarState: $sidebarState as SidebarState,
			dayValue: $dayValue,
			minMaxAvg: $minMaxAvg,
			hour: $hour,
			heatStressUnit: $heatStressUnit as 'utci' | 'pet'
		};
	}
	function applySettings(stgns?: TourSettings) {
		if (!stgns) return;
		updateUnit(stgns.unit);
		udpateDatavisType(stgns.datavisType);
		udpateRangeStart(stgns.rangeStart);
		updateRangeEnd(stgns.rangeEnd);
		setLeftSidebarState(stgns.sidebarState);
		udpateDay(stgns.dayValue);
		updateMinMaxAvg(stgns.minMaxAvg);
		$updateHour(stgns.hour);
		updateHeatStressUnit(stgns.heatStressUnit);
	}

	const handleClose = () => {
		opened = false;
	};

	const handleOpen = () => {
		opened = true;
	};

	async function onTourStart() {
		saveInitialSettings();
		ensurePage('/', window.location.pathname);
		tour?.show('welcome');
	}

	function onTourActive() {
		localStorage.setItem('welcome-opened', 'true');
		applySettings(tourOptimalSettings);
	}

	function onTourEnd() {
		localStorage.setItem('welcome-opened', 'false');
		applySettings(initialSettings);
		const path = initialSettings.pagePath === '/' ? '/' : initialSettings.pagePath;
		ensurePage(path, window.location.pathname);
	}
</script>

<section
	class={cn(
		'relative flex flex-col gap-2 p-6 transition-all',
		'bg-muted',
		opened ? 'py-6' : 'pb-0 pt-4'
	)}
>
	{#if opened}
		<h2 class="text-2xl font-semibold">{$LL.welcome.title()}</h2>
		{#each Object.entries($LL.welcome.text) as [key, paragraph] (key)}
			<p class="mb-2">{paragraph()}</p>
		{/each}
		<Button
			size="icon"
			on:click={handleClose}
			class="absolute right-4 top-6 rounded-full text-muted-foreground"
			variant="ghost"
		>
			<X />
		</Button>
		<div class="flex gap-4">
			<Button on:click={handleClose}>
				{$LL.welcome.buttons.confirm()}
			</Button>
			<Button
				variant="outline"
				on:click={() => {
					tour?.start();
					handleClose();
				}}
			>
				{$LL.welcome.buttons.launchTour()}
			</Button>
		</div>
	{:else}
		<Button
			variant="ghost"
			class="-ml-3 mb-1 flex h-fit w-fit cursor-pointer items-center gap-2 py-2 text-left text-sm"
			size="sm"
			on:click={handleOpen}
		>
			<ArrowDown class="size-4" />
			{$LL.welcome.expandButtonLabel()}
		</Button>
	{/if}
</section>

<style>
	:global(.shepherd-content) {
		--shepherd-padding: 1.25rem;
		border: 1px solid hsl(var(--border));
	}

	:global(.shepherd-element) {
		--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
		--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color),
			0 4px 6px -4px var(--tw-shadow-color);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000),
			var(--tw-shadow);
		max-width: calc(var(--leftSidebarWidth) - 3rem);
		width: 30rem;
	}

	:global(.shepherd-modal-overlay-container path) {
		fill: hsl(var(--foreground));
		stroke: hsl(var(--primary));
		stroke-width: 4px;
	}

	:global(html.dark .shepherd-modal-overlay-container path) {
		fill: hsl(var(--background));
	}

	:global(.shepherd-button) {
		border: 1px solid hsl(var(--primary));
		color: hsl(var(--primary-foreground));
		background: hsl(var(--primary));
		border-radius: calc(var(--radius) - 2px);
		padding: 0.5rem 1rem;
		width: fit-content;
		font-weight: 600;
	}

	:global(.shepherd-button:not(:disabled):hover) {
		background: hsl(var(--primary) / 0.8);
		color: hsl(var(--primary-foreground));
		border: 1px solid hsl(var(--primary));
	}

	:global(.shepherd-button:not(:disabled):focus-visible) {
		outline: none;
		--tw-ring-offset-width: 2px;
		--tw-ring-color: hsl(var(--ring) / var(--tw-ring-opacity, 1));
		--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width)
			var(--tw-ring-offset-color);
		--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width))
			var(--tw-ring-color);
		box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
	}

	:global(.shepherd-button.shepherd-button-secondary) {
		background: hsl(var(--background));
		border: 1px solid hsl(var(--border));
		color: hsl(var(--foreground));
		font-weight: 400;
	}

	:global(.shepherd-button.shepherd-button-secondary:not(:disabled):hover) {
		background: hsl(var(--muted));
		color: hsl(var(--foreground));
		border: 1px solid hsl(var(--border));
	}

	:global(
		.shepherd-has-title .shepherd-content .shepherd-header,
		.shepherd-element,
		.shepherd-title,
		.shepherd-text
	) {
		background: hsl(var(--background));
		color: hsl(var(--foreground));
	}

	:global(.shepherd-has-title .shepherd-content .shepherd-header) {
		padding: var(--shepherd-padding);
		padding-bottom: 0;
	}

	:global(.shepherd-header, .shepherd-text, .shepherd-footer) {
		padding-inline: var(--shepherd-padding);
	}

	:global(.shepherd-footer) {
		padding-block: calc(var(--shepherd-padding) * 0.75);
		margin-top: var(--shepherd-padding);
		border-top: 1px solid hsl(var(--border));
		background: hsl(var(--muted));
	}

	:global(.shepherd-title) {
		font-weight: 600;
		font-size: 1.25rem;
		line-height: 1.75rem;
	}

	:global(.shepherd-text) {
		font-size: inherit;
		line-height: inherit;
	}

	:global(.shepherd-arrow:before) {
		background: transparent;
	}
</style>

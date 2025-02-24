<script lang="ts">
	import LL from '$i18n/i18n-svelte';
	import { cn } from '$lib/utils';
	import { ArrowDown, X } from 'lucide-svelte';
	import Shepherd, { type StepOptionsButton, type Tour } from 'shepherd.js';
	import 'shepherd.js/dist/css/shepherd.css';
	import { onMount } from 'svelte';
	import Button from './ui/button/button.svelte';

	let opened = $state(false);
	let tour: Tour | undefined;

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
			defaultStepOptions: {
				classes: 'shepherd-theme-custom',
			}
		});
	});

	$effect(() => {
		if (!tour) return;
		for (const step of tour.steps) {
			tour.removeStep(step.id);
		}
		const nextButton = {
			text: $LL.welcome.tourSteps.buttons.next(),
			action: tour.next,
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
		tour.addStep({
			id: 'welcome',
			title: $LL.welcome.tourSteps.welcome.title(),
			text: $LL.welcome.tourSteps.welcome.text(),
			buttons: [cancelButton, nextButton]
		})
		tour.addStep({
			id: 'unitSelect',
			title: $LL.welcome.tourSteps.unitSelect.title(),
			text: $LL.welcome.tourSteps.unitSelect.text(),
			attachTo: {
				element: '[data-id="stations-select"]',
				on: "right"
			},
			buttons: [cancelButton, prevButton, finishButton]
		})
	})

	const handleClose = () => {
		localStorage.setItem('welcome-opened', 'false');
		opened = false;
	};

	const handleOpen = () => {
		localStorage.setItem('welcome-opened', 'true');
		opened = true;
	};
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
			<Button variant="outline" on:click={() => tour?.start()}>
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

	:global(.shepherd-modal-overlay-container path) {
		fill: hsl(var(--muted));
	}

	:global(.shepherd-button) {
		border: 1px solid transparent;
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
	}

	:global(.shepherd-button:not(:disabled):focus-visible) {
		outline: none;
		--tw-ring-offset-width: 2px;
		--tw-ring-color: hsl(var(--ring) / var(--tw-ring-opacity, 1));
		--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
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
		padding-bottom: var(--shepherd-padding);
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
</style>

# Data2Resilience

A collaborative research project developing a data visualization platform for climate resilience analysis in Dortmund. Led by Prof. Dr. Benjamin Bechtel and Prof. Dr. Christian Albert, this joint initiative between [Ruhr University Bochum](https://www.ruhr-uni-bochum.de/en/) and [Leibniz University Hannover](https://www.uni-hannover.de/) aims to improve urban resilience against extreme heat through innovative biometeorological measurement networks and community engagement.

The dashboard enables citizens and stakeholders to:

- Monitor real-time heat stress data across Dortmund
- Visualize climate patterns through interactive maps
- Access detailed measurements from weather stations
- Understand thermal comfort metrics through various indicators
- Make informed decisions for climate adaptation

Funded by the [ICLEI Action Fund 2.0](https://iclei.org/activity/iclei-action-fund-2-0/) and [Google.org](https://www.google.org/), this project combines technological innovation with citizen participation to minimize the impact of extreme heat on urban life.

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) 2.0
- **UI Components**: [shadcn-svelte](https://www.shadcn-svelte.com/)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **State Management**:
  - URL State: [sveltekit-search-params](https://github.com/paoloricciuti/sveltekit-search-params)
  - UI State: [Svelte stores](https://svelte.dev/docs/svelte-store) with debounced updates
- **Type Safety**: [Zod](https://zod.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Containerization**: [Docker](https://www.docker.com/)

## Installation

```bash
# Clone the repository
git clone https://github.com/vogelino/data2resilience.git
cd data2resilience

# Install dependencies
pnpm install

# Copy and configure environment variables
cp .env.example .env
```

## Local Development

```bash
# Start development server
pnpm run dev

# Generate i18n types
pnpm run typesafe-i18n
```

## Docker Deployment

```bash
# Build the Docker image
docker build -t data2resilience .

# Run the container
docker run -p 3000:3000 data2resilience
```

### GitHub Actions Release Pipeline

The app is automatically containerized and published to GitHub Container Registry on releases.

To create a new release:

1. Tag your commit with a version
2. Create a GitHub release
3. The action will automatically build and publish the container

## State Management

We use a combination of URL-synchronized state and UI state management:

### URL State with [sveltekit-search-params](https://github.com/paoloricciuti/sveltekit-search-params)

```typescript
import { queryParam, ssp } from 'sveltekit-search-params';

// Define URL parameters with type safety and defaults
const hourQueryParam = queryParam('hour', ssp.number(12));
const unitQueryParam = queryParam('unit', ssp.string('utci'));

// Create derived stores with validation
export const hour = derived(hourQueryParam, (value) =>
	validateQueryParam(value, z.coerce.number(), 12)
);

// Update with debouncing for performance
export const updateHour = debounce((h: number) => {
	hourQueryParam.set(h);
}, 500);
```

### Derived State Management with [Svelte Stores](https://svelte.dev/docs/svelte-store)

```typescript
// Complex derived states combining multiple parameters
export const formattedTimeConfiguration = derived(
	[datavisType, rangeStartDate, rangeEndDate],
	([type, start, end]) => {
		// Compute formatted values based on multiple parameters
		return computedValue;
	}
);
```

## Components and UI

We use [shadcn-svelte](https://www.shadcn-svelte.com/) for core UI components:

```bash
# Install new shadcn component
pnpm dlx shadcn-svelte@latest add button
```

## Data Fetching

[TanStack Query](https://tanstack.com/query) integration for efficient data fetching:

```typescript
import { createQuery } from '@tanstack/svelte-query';

const query = createQuery({
	queryKey: ['data'],
	queryFn: fetchData
});
```

## Internationalization

We use [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n) for type-safe translations:

- Translations are stored in `src/i18n/{locale}/index.ts`
- Auto-generated types on the fly with the following command:

```bash
pnpm typesafe-i18n
```

Example translation usage:

```typescript
import LL from '$i18n/i18n-svelte';

// In your component
$LL.pages.about.title(); // Type-safe translation
```

## Theme Support

The app supports light, dark, and system theme modes using [tailwindcss](https://tailwindcss.com/docs/dark-mode):

```typescript
// Toggle theme modes
const theme = $state('light' | 'dark' | 'system');
```

Theme preferences are:

- Persisted in localStorage
- Synced with system preferences
- Automatically applied using Tailwind's dark mode classes

# Data2Resilience

A collaborative research project developing a data visualization platform for climate resilience analysis in Dortmund. Led by Prof. Dr. Benjamin Bechtel and Prof. Dr. Christian Albert, this joint initiative between [Ruhr University Bochum](https://www.ruhr-uni-bochum.de/en/) and [Leibniz University Hannover](https://www.uni-hannover.de/) aims to improve urban resilience against extreme heat through innovative biometeorological measurement networks and community engagement.

The dashboard enables citizens and stakeholders to:

- Monitor real-time heat stress data across Dortmund
- Visualize climate patterns through interactive maps
- Access detailed measurements from weather stations
- Understand thermal comfort metrics through various indicators
- Make informed decisions for climate adaptation

Funded by the [ICLEI Action Fund 2.0](https://iclei.org/activity/iclei-action-fund-2-0/) and [Google.org](https://www.google.org/), this project combines technological innovation with citizen participation to minimize the impact of extreme heat on urban life.

## Project Overview

Data2Resilience is a comprehensive platform designed to visualize climate data from various weather stations. The application allows users to:

- View climate data on an interactive map
- Select specific weather stations for detailed analysis
- Compare measurements across different stations
- Visualize data through various charts (line charts, bar charts, histograms)
- Switch between different climate indicators (temperature, humidity, UTCI, etc.)
- View historical data across different time ranges
- Explore heat stress measurements and thermal comfort indices

## Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) 2.0 with TypeScript - Serves as the foundation of the application, providing server-side rendering, routing, and integration with other tools. TypeScript adds type safety throughout the codebase.

- **UI Components**: [shadcn-svelte](https://www.shadcn-svelte.com/) - Provides accessible, customizable UI components that are integrated throughout the application interface, ensuring a consistent design system while maintaining flexibility.

- **Data Visualization**:
  - [LayerChart](https://layerchart.com/) - Used for declarative chart composition, allowing complex visualizations to be built through a composable API. This powers the time series charts and comparison visualizations.
  - [D3.js](https://d3js.org/) - Handles lower-level data manipulation and specialized visualizations like wind direction charts and histograms that require custom rendering.

- **Mapping**: [MapLibre GL](https://maplibre.org/) - Powers the interactive map at the core of the application, displaying station locations, heat maps, and allowing users to select stations directly from the map interface.

- **Geocoding**: [DigiStadtDO](https://digistadtdo.de/) Geocoding API - Enables location search functionality within Dortmund, allowing users to find specific addresses or points of interest and see nearby weather stations. The application uses the BKG API at `https://geoweb1.digistadtdo.de/doris_gdi/geocoder` with the Address search  endpoint: `/geosearch?query=address&outputformat=JSON`.
The geocoding service is specifically limited to addresses in and around Dortmund, as the BKG search has been geographically restricted to this area.

- **Data Fetching**: [TanStack Query](https://tanstack.com/query) - Manages server state with intelligent caching, background updates, and optimistic UI updates when fetching climate data from weather station APIs.

- **State Management**:
  - URL State: [sveltekit-search-params](https://github.com/paoloricciuti/sveltekit-search-params) - Synchronizes application state with URL parameters, enabling shareable links that preserve selected stations, time ranges, and visualization settings.
  - UI State: [Svelte stores](https://svelte.dev/docs/svelte-store) - Manages local UI state like sidebar visibility, selected tabs, and temporary user selections with debounced updates to prevent excessive re-renders.

- **Type Safety**: [Zod](https://zod.dev/) - Validates external data at runtime and provides TypeScript type inference, ensuring that API responses match expected schemas before being used in the application.

- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Handles all styling through utility classes, enabling rapid UI development while maintaining consistent design tokens across the application.

- **Internationalization**: [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n) - Provides type-safe translations for the entire application, with automatic code generation to ensure translation keys are always valid.

- **Containerization**: [Docker](https://www.docker.com/) - Packages the application and its dependencies into containers for consistent deployment across different environments, with automated builds via GitHub Actions.

- **User Onboarding**: [Shepherd.js](https://shepherdjs.dev/) - Creates interactive guided tours to help new users understand the dashboard's features and functionality, with customized steps for different parts of the application.

![simplified-architecture-diagram](https://github.com/user-attachments/assets/dce04604-c999-418f-ae29-b92d93dbaf4e)

## External APIs

The Data2Resilience platform integrates with several external APIs to provide climate data, geocoding, and mapping capabilities.

### Climate Data API

**Base URL**: `https://api.data2resilience.de`

**Key Endpoints**:
- `/v1/stations/metadata` - Retrieves metadata about all weather stations
- `/v1/data/{stationId}` - Fetches historical data for a specific station
- `/v1/network-snapshot` - Gets measurements across all stations at a point in time
- `/v1/download/{stationId}` - Downloads full station dataset as CSV
- `/tms/singleband/{unit}/{year}/{doy}/{hour}/{z}/{x}/{y}.png` - Tile service for heat stress visualization
- `/tms/metadata/{unit}/{year}/{doy}/{hour}` - Metadata for heat stress visualization
- `/tms/colormap` - Color mapping for heat stress visualization

**Used For**: Fetching weather station data, heat stress information, and climate measurements across Dortmund.

**Implementation**: Centralized in `lib/utils/api.ts` using TanStack Query for data fetching and caching. These endpoints are consumed by various components like `StationsLineChart`, `DailySationsValuesBarChart`, and `MapMeasurementsRasterLayer`.

### DigiStadtDO Geocoding API

**Base URL**: `https://geoweb1.digistadtdo.de/doris_gdi/geocoder`

**Key Endpoints**:
- `/geosearch?query={address}&outputformat=JSON` - Address search

**Used For**: Location search functionality within the map interface. The geocoding service is specifically limited to addresses in and around Dortmund.

**Implementation**: Integrated in `MapSearchInput.svelte` component with debounced queries and response validation.

### Mapping Services

#### Vector Tiles

**Approach**: 
The application uses custom styled vector tiles for the base map, with light and dark mode variants. The map styles are stored in `$lib/stores/mapStyle.ts` as `positronMapStyleDay` and `positronMapStyleNight`.

**Used For**: Base map vector tiles rendered through MapLibre GL.

**Implementation**: Used in `Map.svelte` to provide the base vector tiles for the map interface, with theme-based switching between light and dark styles.

#### Dortmund Orthophotos

**Endpoint**: `https://www.wms.nrw.de/geobasis/wms_nw_dop`

**Used For**: High-resolution orthophoto layer for Dortmund when satellite view is enabled.

**Implementation**: Implemented in `SatelliteRasterLayer.svelte` as an optional satellite/orthophoto view that can be toggled by users.

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

## Project Structure

```
src/
├── app.css               # Global CSS with Tailwind imports
├── app.d.ts              # TypeScript type declarations
├── app.html              # Base HTML template
├── error.html            # Error page template
├── hooks.server.ts       # Server-side hooks for SvelteKit
├── i18n/                 # Internationalization
├── lib/                  # Library code
│   ├── components/       # Reusable UI components
│   ├── schemas/          # Data validation schemas
│   ├── stores/           # Svelte stores for state management
│   └── utils/            # Utility functions
├── params/               # URL parameter matchers
└── routes/               # SvelteKit routes
```

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

## Key Components

- **Header**: Main navigation component (`Header.svelte`)
- **LeftSidebar**: Contains station selection and filters (`LeftSidebar.svelte`)
- **Map**: Interactive map for visualizing location data
- **Charts**: Various data visualization components:
  - `TimeseriesLineChart.svelte`: Line chart for time series data
  - `DailySationsValuesBarChart.svelte`: Bar chart for daily station values
  - `Histogram.svelte`: Histogram for data distribution
  - `WindDirectionChart.svelte`: Specialized chart for wind direction

## Components and UI

We use [shadcn-svelte](https://www.shadcn-svelte.com/) for core UI components:

```bash
# Install new shadcn component
pnpm dlx shadcn-svelte@latest add button
```

## Key Stores

- `mapData.ts`: Manages the stations GeoJSON data
- `stationsStore.ts`: Handles selected stations state
- `uiStore.ts`: UI-related state (sidebar visibility, date ranges, selected units, etc.)

## Data Flow

1. Station data is loaded from the API during the initial page load
2. Users can select stations from the map or the station selector
3. Selected stations are stored in the state and URL parameters
4. When stations are selected, data visualizations are updated
5. Users can change time ranges, measurement units, and other parameters to update visualizations

## Data Fetching

[TanStack Query](https://tanstack.com/query) integration for efficient data fetching:

```typescript
import { createQuery } from '@tanstack/svelte-query';

const query = createQuery({
	queryKey: ['data'],
	queryFn: fetchData
});
```

We also use reactive query arguments with our custom utilities:

```typescript
import { reactiveQueryArgs } from '$lib/utils/queryUtils.svelte';

const query = createQuery(
	reactiveQueryArgs(() => ({
		queryKey: ['stations-snapshot', dateKey, unitWithMinMaxAvg, scale],
		queryFn: async () => {
			/* fetch data */
		},
		enabled: Boolean(dateVal && unitWithMinMaxAvg)
	}))
);
```

## Features

### Station Selection

Users can select multiple stations to compare data. Selected station IDs are stored in URL parameters for sharing.

### Time Range Selection

- **Hour**: View data for a specific hour
- **Day**: View daily aggregated data (min/max/avg)
- **Range**: View data over a custom date range

### Measurement Units

Various climate indicators can be selected for visualization:

- Temperature (air, dew point, wet bulb)
- Humidity (relative, absolute)
- Pressure (atmospheric)
- Wind (speed, direction)
- Thermal comfort indices (UTCI, PET)
- Precipitation, solar radiation, etc.

### Place Search & Geocoding

The application uses the DigiStadtDO Geocoding API for location search within Dortmund:

```typescript
const GEOCODING_API = 'https://geodaten.digistadtdo.de/api';

async function searchLocation(query: string) {
	const response = await fetch(`${GEOCODING_API}/geocode?q=${encodeURIComponent(query)}`);
	return response.json();
}
```

### Data Visualization

- Line charts for time series data
- Bar charts for comparing stations
- Histograms for data distribution
- Special visualizations for heat stress and wind direction

### Interactive Product Tour

We use Shepherd.js to provide an interactive guide through the application's features:

```typescript
import { createTour } from '$lib/utils/tourUtil';

const tour = createTour([
	{
		id: 'welcome',
		title: 'Welcome to Data2Resilience',
		text: 'Let us show you around the main features...'
	},
	{
		id: 'map',
		element: '.map-container',
		title: 'Interactive Map',
		text: 'Explore weather stations and heat stress data...'
	}
	// Additional tour steps...
]);
```

## Data Visualization

We use [LayerChart](https://layerchart.com/) for building complex, interactive charts through composition:

```typescript
import { Chart, Line, Points } from '@layerchart/svelte';

<Chart data={timeSeriesData}>
  <Line x="time" y="temperature" />
  <Points x="time" y="temperature" />
</Chart>
```

## Internationalization

We use [typesafe-i18n](https://github.com/ivanhofer/typesafe-i18n) for type-safe translations:

- Translations are stored in `src/i18n/{locale}/index.ts`
- Auto-generated types on the fly with `pnpm typesafe-i18n`

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

## Development Workflow

### Adding a New Component

1. Create a new component in `src/lib/components/`
2. Import and use it in relevant pages or parent components
3. Add any necessary state to stores if needed

### Adding a New Measurement Unit

1. Add the unit to the schema in `src/lib/utils/schemas.ts`
2. Add UI labels in the i18n files
3. Configure the color scale in `src/lib/utils/colorScaleUtil.ts`

### Adding a New Page

1. Create a new route in `src/routes/`
2. Create corresponding components for the page
3. Update navigation components if needed

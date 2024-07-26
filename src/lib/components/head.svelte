<script>
	import SvelteSeo from 'svelte-seo';

	const siteNameShort = `Data2Resilience`;
	const author = `Data2Resilience Team`;
	const siteSubtitle = `Enhancing Urban Resilience Against Extreme Heat in Dortmund`;
	const siteNameLong = `${siteNameShort} | ${siteSubtitle}`;
	const siteDescription = `Data2Resilience is a project aimed at improving urban resilience against extreme heat in Dortmund through innovative biometeorological measurement networks and community engagement. Learn more about our initiatives and results.`;
	const keywords = `Data2Resilience, urban resilience, extreme heat, Dortmund, climate change, biometeorological measurement, community engagement, heat resilience, urban climate, climate adaptation`;
	const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:5173';
</script>

<SvelteSeo
	title={siteNameLong}
	description={siteDescription}
	canonical={baseUrl}
	{keywords}
	openGraph={{
		title: siteNameLong,
		description: siteDescription,
		url: `${baseUrl}`,
		type: 'website',
		images: [
			{
				url: `${baseUrl}/images/squatting.jpg`,
				width: 800,
				height: 600,
				alt: 'Squatting'
			},
			{
				url: `${baseUrl}/images/lunging.jpg`,
				width: 900,
				height: 800,
				alt: 'Crawling'
			},
			{
				url: `${baseUrl}/images/crawling.jpg`,
				alt: 'Jumping'
			},
			{
				url: `${baseUrl}/images/jumping.jpg`
			}
		],
		site_name: siteNameShort
	}}
	twitter={{
		card: 'summary_large_image',
		site: '@RUBclim',
		title: siteNameLong,
		description: siteDescription,
		image: `${baseUrl}/images/squatting.jpg`,
		imageAlt: 'Squatting'
	}}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: siteNameLong,
		description: siteDescription,
		url: `${baseUrl}`,
		author: {
			'@type': 'Organization',
			name: author
		}
	}}
/>

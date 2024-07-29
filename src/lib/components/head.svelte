<script>
	import LL from '$i18n/i18n-svelte';
	import SvelteSeo from 'svelte-seo';
	import HeadHrefLangs from './HeadHrefLangs.svelte';

	const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:5173';
</script>

<svelte:head>
	<HeadHrefLangs />
	<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
	<link rel="sitemap" type="application/xml" title="Sitemap" href={`${baseUrl}/sitemap.xml}`} />
</svelte:head>
<SvelteSeo
	title={$LL.siteNameLong()}
	description={$LL.siteDescription()}
	canonical={baseUrl}
	keywords={$LL.keywords()}
	manifest={`${baseUrl}/manifest.json`}
	openGraph={{
		title: $LL.siteNameLong(),
		description: $LL.siteDescription(),
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
		site_name: $LL.siteNameShort()
	}}
	twitter={{
		card: 'summary_large_image',
		site: `@${$LL.twitterHandle()}`,
		title: $LL.siteNameLong(),
		description: $LL.siteDescription(),
		image: `${baseUrl}/images/squatting.jpg`,
		imageAlt: 'Squatting'
	}}
	jsonLd={{
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: $LL.siteNameLong(),
		description: $LL.siteDescription(),
		url: `${baseUrl}`,
		author: {
			'@type': 'Organization',
			name: $LL.author()
		}
	}}
/>

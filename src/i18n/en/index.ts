import type { Translation } from '../i18n-types';

const siteNameShort = `Data2Resilience`;
const siteSubtitle = `Enhancing Urban Resilience Against Extreme Heat in Dortmund`;
const en = {
	siteNameShort,
	author: `Data2Resilience Team`,
	siteSubtitle,
	siteNameLong: `${siteNameShort} | ${siteSubtitle}`,
	siteDescription: `Data2Resilience is a project aimed at improving urban resilience against extreme heat in Dortmund through innovative biometeorological measurement networks and community engagement. Learn more about our initiatives and results.`,
	keywords: `Data2Resilience, urban resilience, extreme heat, Dortmund, climate change, biometeorological measurement, community engagement, heat resilience, urban climate, climate adaptation`,
	twitterHandle: `RUBclim`,
	log: `This log was called from '{fileName}'`,
	themeColor: `#007bff`,
	headImages: {
		og: {
			large: 'Screenshot of the Data2Resilience map dashboard',
			square: 'Logo of the Data2Resilience project'
		},
		twitter: 'Screenshot of the Data2Resilience map dashboard'
	},
	errors: {
		genericErrorLabel: 'Error',
		unexpectedError: {
			label: 'Unexpected error',
			description: `Oops, it looks like something unexpected has went wrong: "{errorMessage}". We're sorry. Please try again or navigate to the homepage.`
		},
		fourOhFour: {
			label: 'Page not found',
			description: `Oops, it looks like the page you were looking for doesn't exist. Don't worry, we can help you get back on track.`,
			homepageLinkText: 'To the homepage'
		}
	}
} satisfies Translation;

export default en;

import type { BaseTranslation } from '../i18n-types';

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
	log: `This log was called from '{fileName:string}'`
} satisfies BaseTranslation;

export default en;

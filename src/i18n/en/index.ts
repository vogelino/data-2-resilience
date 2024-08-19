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
	},
	generic: {
		expand: 'Know more',
		collapse: 'Collapse'
	},
	navigation: {
		header: {
			about: 'About this dashboard'
		},
		tabs: {
			thermicalComfort: 'Thermal comfort',
			actualMeasurements: 'Actual measurements',
			stations: 'Stations'
		}
	},
	pages: {
		thermicalComfort: {
			title: 'Wie warm fühlt sich deine Stadt an?',
			intro: [
				'Thermal comfort is the state of well-being in which a person is satisfied with the thermal environment. This means that temperature, humidity, air movement and radiant heat are within a range perceived as comfortable. It can be measured using various indicators:'
			],
			indicatorsNavAriaLabel: 'Select an indicator to change the data displayed on the map.'
		},
		measurements: {
			title: 'What is currently being measured?',
			intro: [
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
				'Current measured values can be displayed both for the measuring stations and for the individual city districts.'
			]
		},
		stations: {
			title: 'How are we measuring thermal comfort?',
			intro: [
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'
			],
			stationsDescriptions: {
				wheather: {
					title: 'Weather station with Blackglobe sensor',
					description:
						'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'
				},
				airTemperatureAndHumidity: {
					title: 'Air temperature and humidity sensor',
					description:
						'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'
				}
			}
		}
	},
	indicators: {
		utci: {
			title: 'Universal Thermic Comfort Index (UTCI)',
			description:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.',
			types: {
				byClass: {
					title: 'By class',
					description:
						'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.'
				},
				byValue: {
					title: 'By value',
					description:
						'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.'
				}
			}
		},
		pet: {
			title: 'Physiological equivalent temperature (PET)',
			description:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.'
		},
		mrt: {
			title: 'Mean regional temperature (MRT)',
			description:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.'
		}
	}
} satisfies Translation;

export default en;

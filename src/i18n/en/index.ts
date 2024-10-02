import type { Translation } from '../i18n-types';

const siteNameShort = `Data2Resilience`;
const siteSubtitle = `Dashboard for thermal comfort in Dortmund`;
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
	welcome: {
		title: 'Welcome',
		text: [
			'The Data2Resilience project uses a new biometeorological measurement network to observe and predict heat and involves citizens early to address challenges and needs in Dortmund. This dashboard allows you to explore real-time data on thermal comfort in the city.'
		],
		buttons: {
			confirm: "Understood, let's go",
			launchTour: 'Start the tour'
		},
		expandButtonLabel: 'Show the introduction message again'
	},
	navigation: {
		header: {
			about: 'About this dashboard'
		},
		tabs: {
			thermicalComfort: 'Thermal comfort',
			actualMeasurements: 'Current measurements',
			stations: 'Weather stations'
		}
	},
	rightSidebar: {
		title: 'Selected stations'
	},
	pages: {
		thermicalComfort: {
			title: 'How warm does your city feel?',
			intro: [
				'Thermal comfort is the state of well-being in which a person is satisfied with the thermal environment. This means that temperature, humidity, air movement and radiant heat are within a range perceived as comfortable. It can be measured using various indicators:'
			],
			timeRangeAlert: `Data only available from {startDate} to {endDate}.`,
			indicatorsNavAriaLabel: 'Select an indicator to change the data displayed on the map.'
		},
		measurements: {
			title: 'What is currently being measured?',
			intro: [
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
				'Current measured values can be displayed both for the measuring stations and for the individual city districts.'
			],
			stationsSelect: {
				placeholder: 'Select one or more stations',
				label: 'Selected stations'
			},
			unitSelect: {
				noUnitFound: 'No unit found',
				placeholder: 'Select a unit',
				searchPlaceholder: 'Search unit...',
				xOutOfY: '{part} of {total} stations',
				units: {
					utci: {
						label: 'Universal Thermic Comfort Index (UTCI) (°C)',
						shortLabel: 'UTCI (°C)',
						description:
							'The <strong>Universal Thermic Comfort Index (UTCI)</strong> describes a measure of human thermal comfort that combines air temperature, humidity, wind speed, and radiation.'
					},
					pet: {
						label: 'Physiological equivalent temperature (PET) (°C)',
						shortLabel: 'PET (°C)',
						description:
							'The <strong>Physiological equivalent temperature (PET)</strong> describes an index that represents the thermal conditions experienced by a standard person in a standard indoor setting.'
					},
					temp: {
						label: 'Air temperature (°C)',
						shortLabel: 'Temp (°C)',
						description:
							'The <strong>Air temperature</strong> describes the degree of hotness or coldness of the air measured in Celsius.'
					},
					pressure: {
						label: 'Air pressure (hPa)',
						shortLabel: 'Pressure (hPa)',
						description:
							'The <strong>Air pressure</strong> describes the force exerted by the weight of air in the atmosphere, measured in hectopascals.'
					},
					precipitation: {
						label: 'Precipitation (mm)',
						shortLabel: 'Precip (mm)',
						description:
							'The <strong>Precipitation</strong> describes the amount of water falling from the sky as rain, snow, or other forms, measured in millimeters.'
					},
					relativeHumidity: {
						label: 'Relative humidity (%)',
						shortLabel: 'RH (%)',
						description:
							'The <strong>Relative humidity</strong> describes the amount of water vapor in the air compared to the maximum amount it could hold at that temperature.'
					},
					windSpeed: {
						label: 'Wind speed (m/s)',
						shortLabel: 'WS (m/s)',
						description:
							'The <strong>Wind speed</strong> describes the rate at which air is moving, measured in meters per second.'
					},
					maxWindSpeed: {
						label: 'Maximum wind speed (m/s)',
						shortLabel: 'Max WS (m/s)',
						description:
							'The <strong>Maximum wind speed</strong> describes the highest rate of air movement recorded during a specific time period.'
					},
					windDirection: {
						label: 'Wind direction (°)',
						shortLabel: 'WD (°)',
						description:
							'The <strong>Wind direction</strong> describes the direction from which the wind is blowing, measured in degrees.'
					},
					midRadiationTemp: {
						label: 'Mid-range radiation temperature (°C)',
						shortLabel: 'MRT (°C)',
						description:
							'The <strong>Mid-range radiation temperature</strong> describes the average temperature of surrounding surfaces that emit radiant heat.'
					},
					lighningStrikesCount: {
						label: 'Lightning strikes count',
						shortLabel: 'LS Count',
						description:
							'The <strong>Lightning strikes count</strong> describes the number of times lightning has struck within a given area and time period.'
					},
					avgLighningStrikesDist: {
						label: 'Average lightning strike distance (m)',
						shortLabel: 'Avg LS Dist (m)',
						description:
							'The <strong>Average lightning strike distance</strong> describes the mean distance of lightning strikes from a reference point, measured in meters.'
					},
					solarradiation: {
						label: 'Solar radiation (W/m²)',
						shortLabel: 'SR (W/m²)',
						description:
							'The <strong>Solar radiation</strong> describes the amount of energy received from the sun per unit area, measured in watts per square meter.'
					},
					vaporPressure: {
						label: 'Vapor pressure (hPa)',
						shortLabel: 'VP (hPa)',
						description:
							'The <strong>Vapor pressure</strong> describes the pressure exerted by water vapor in the air, measured in hectopascals.'
					}
				}
			}
		},
		stations: {
			title: 'How are we measuring thermal comfort?',
			intro: [
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'
			],
			stationsDescriptions: {
				weather: {
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
		relative_humidity: {
			title: 'Relative humidity',
			description:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.'
		},
		temp: {
			title: 'Air temperature',
			description:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.'
		}
	},
	map: {
		zoom: {
			navAlt: 'Zoom navigation',
			zoomIn: 'Zoom in',
			zoomOut: 'Zoom out'
		}
	}
} satisfies Translation;

export default en;

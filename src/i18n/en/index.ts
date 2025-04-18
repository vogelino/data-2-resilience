import type { Translation } from '../i18n-types';

const siteNameShort = 'Data2Resilience';
const siteSubtitle = 'Dashboard for heat stress in Dortmund';
const en = {
	siteNameShort,
	author: 'Data2Resilience Team',
	siteSubtitle,
	siteNameLong: `${siteNameShort} | ${siteSubtitle}`,
	siteDescription:
		'Data2Resilience is a project aimed at improving urban resilience against extreme heat in Dortmund through innovative biometeorological measurement networks and community engagement. Learn more about our initiatives and results.',
	keywords:
		'Data2Resilience, urban resilience, extreme heat, Dortmund, climate change, biometeorological measurement, community engagement, heat resilience, urban climate, climate adaptation',
	twitterHandle: 'RUBclim',
	log: "This log was called from '{fileName}'",
	themeColor: '#eff3f8',
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
			description:
				"Oops, it looks like something unexpected has went wrong. We're sorry. Please try again or navigate to the homepage."
		},
		fourOhFour: {
			label: 'Page not found',
			description:
				"Oops, it looks like the page you were looking for doesn't exist. Don't worry, we can help you get back on track.",
			homepageLinkText: 'To the homepage'
		},
		unsupported: {
			unsupportedStation: 'Does not collect this data'
		},
		invalidExportConfig: 'Invalid export configuration'
	},
	generic: {
		expand: 'Know more',
		collapse: 'Collapse',
		dismiss: 'Dismiss',
		leftSidebar: {
			showAriaLabel: 'Expand left sidebar',
			hideAriaLabel: 'Collapse left sidebar'
		},
		hourInput: {
			label: 'Hour of the day',
			inputAriaLabel: 'Select hour of the day',
			buttonUpAriaLabel: 'Select an hour later',
			buttonDownAriaLabel: 'Select an hour earlier',
			nextHourInFuture: 'An hour in the future cannot be selected'
		},
		combobox: {
			selectOption: 'Select an optionOption auswählen',
			noResults: 'No results'
		},
		chartExportButtonLabel: 'Export chart'
	},
	themeSwitch: {
		light: 'Light',
		dark: 'Dark',
		system: 'System'
	},
	welcome: {
		title: 'Welcome',
		text: [
			'The Data2Resilience project uses a new biometeorological measurement network to observe and predict heat and involves citizens early to address challenges and needs in Dortmund. This dashboard allows you to explore real-time data on heat stress in the city.'
		],
		buttons: {
			confirm: "Understood, let's go",
			launchTour: 'Start the tour'
		},
		expandButtonLabel: 'Show the introduction message again',
		tourSteps: {
			buttons: {
				next: 'Next',
				prev: 'Previous',
				cancel: 'Cancel',
				last: 'Finish'
			},
			welcome: {
				title: 'Welcome',
				text: 'Welcome to Data2Resilience. We are glad that you are interested in our project. We have developed this dashboard to give you insights into the biometeorological data we collect in Dortmund. We hope you will find it useful.'
			},
			map: {
				title: 'Map',
				text: 'The map shows the location of the monitoring stations. You can select stations on the map by clicking on them.'
			},
			stationSelect: {
				title: 'Station Selection',
				text: 'We have collected data from various monitoring stations in Dortmund. You can select which stations you want to see on the map by clicking on them.'
			},
			unitSelect: {
				title: 'Unit Selection',
				text: 'We have converted the biometeorological data in this dashboard into different indicators to help you better understand them. You can change the indicators at any time by clicking on the indicator symbols.'
			},
			stationsDatavis: {
				title: 'Data visualization',
				text: 'The data visualization shows you the current measurements for the selected stations. You can view the data for different time periods by clicking on the buttons in the upper right corner.'
			},
			dateRangeSlider: {
				title: 'Select time period',
				text: 'You can view the data for different time periods by selecting or deselecting them in the time filter.'
			},
			stationsHistogram: {
				title: 'Data histogram',
				text: 'The data histogram shows you the distribution of measurements for the selected stations. You can view the distribution for different time periods by clicking on the buttons in the upper right corner.'
			},
			stationsTable: {
				title: 'Data table',
				text: 'The data table shows you the current measurements for the selected stations. You can view the data for different time periods by clicking on the buttons in the upper right corner.'
			}
		}
	},
	navigation: {
		header: {
			about: 'About this dashboard'
		},
		aboutModal: {
			backToHome: 'Back to the homepage'
		},
		tabs: {
			actualMeasurements: 'Measurements',
			heatStress: 'Heat atlas',
			stations: 'Weather stations'
		}
	},
	pages: {
		heatStress: {
			title: 'How warm does the city feel?',
			intro: [
				"The heat atlas for Dortmund provides an overview of the city's heat stress. The heat stress is depicted through three maps: the Universal Thermal Climate Index (UTCI) to assess the thermal sensation of residents, as well as relative humidity and air temperature as key influencing factors.",
				'Maps are based on modelled calculations derived from station measurements. The modelled maps are less accurate than the measurement data and should only be used as a starting point. For detailed analyses, please rely on the station measurement data.'
			],
			timeRangeAlert: 'Data only available from {startDate} to {endDate}.',
			timeRangeAlertTooltipTitle: 'This visualization is only available for the last 30 days.',
			timeRangeAlertTooltipContent:
				'The data necessary for the heat map visualization of the map requires large amount of storage that therefore includes only the last 30 days.',
			indicatorsNavAriaLabel: 'Select an indicator to change the data displayed on the map.'
		},
		measurements: {
			title: 'What is being measured?',
			intro: [
				'The measurements show weather data from various parts of Dortmund, collected by monitoring stations. This data, such as air temperature and humidity, helps to understand the current heat stress in the city. You can see the monitoring stations as points on the map and track both current and past values.'
			],
			noDataAvailable: 'No data available for the selected configuration',
			noValueMeasured: 'No value measured',
			noStationsSelected: 'Select at least one station to display its data',
			someUnsupportedStations:
				'The stations <strong>{stations}</strong> do not collect data for the selected indicator <strong>{unit}</strong>.',
			allUnsupportedStations:
				'None of the selected stations collect data for the indicator <strong>{unit}</strong>.',
			singleUnsupportedStation:
				'The station <strong>{station}</strong> does not collect data for the indicator <strong>{unit}</strong>.',
			singleUnsupportedStationShort:
				'This station does not collect data for the indicator <strong>{unit}</strong>.',
			someStationsWithoutAvailableData:
				'The stations <strong>{stations}</strong> have no available data for the indicator <strong>{unit}</strong>, and the current time configuration.',
			allStationsWithoutAvailableData:
				'None of the selected stations have data available for the indicator <strong>{unit}</strong>, and the current time configuration.',
			singleStationWithoutAvailableData:
				'The station <strong>{station}</strong> has no data available for the indicator <strong>{unit}</strong>, and the current time configuration.',
			stationsSelect: {
				placeholder: 'Select one or more stations',
				label: 'Selected stations'
			},
			unitSelect: {
				noUnitFound: 'No indicator found',
				placeholder: 'Select a indicator',
				searchPlaceholder: 'Search indicator...',
				xOutOfY: '{part} of {total} stations',
				stationsHeaderLabel: 'Station name',
				units: {
					utci_max: {
						label: 'Maximum Universal Thermic Climate Index (UTCI)',
						description:
							'The <strong>Maximum Universal Thermic Climate Index (UTCI)</strong> describes the highest recorded UTCI during a specific time period.',
						unitOnly: '°C'
					},
					utci_min: {
						label: 'Minimum Universal Thermic Climate Index (UTCI)',
						description:
							'The <strong>Minimum Universal Thermic Climate Index (UTCI)</strong> describes the lowest recorded UTCI during a specific time period.',
						unitOnly: '°C'
					},
					utci: {
						label: 'Universal Thermic Climate Index (UTCI)',
						description:
							'The <strong>Universal Thermic Climate Index (UTCI)</strong> describes a measure of human heat stress that combines air temperature, humidity, wind speed, and radiation.',
						unitOnly: '°C'
					},
					utci_category: {
						label: 'Universal Thermic Climate Index  (UTCI) category',
						description:
							'The <strong>UTCI category</strong> describes the classification of the universal heat stress index in terms of heat stress.',
						unitOnly: ''
					},
					absolute_humidity_max: {
						label: 'Maximum absolute humidity',
						description:
							'The <strong>Maximum absolute humidity</strong> describes the highest amount of water vapor in the air, measured in grams per cubic meter.',
						unitOnly: 'g/m³'
					},
					absolute_humidity_min: {
						label: 'Minimum absolute humidity',
						description:
							'The <strong>Minimum absolute humidity</strong> describes the lowest amount of water vapor in the air, measured in grams per cubic meter.',
						unitOnly: 'g/m³'
					},
					absolute_humidity: {
						label: 'Absolute humidity',
						description:
							'The <strong>Absolute humidity</strong> describes the amount of water vapor in the air, measured in grams per cubic meter.',
						unitOnly: 'g/m³'
					},
					air_temperature_max: {
						label: 'Maximum air temperature',
						description:
							'The <strong>Maximum air temperature</strong> describes the highest recorded temperature of the surrounding air in degrees Celsius.',
						unitOnly: '°C'
					},
					air_temperature_min: {
						label: 'Minimum air temperature',
						description:
							'The <strong>Minimum air temperature</strong> describes the lowest recorded temperature of the surrounding air in degrees Celsius.',
						unitOnly: '°C'
					},
					air_temperature: {
						label: 'Air temperature',
						description:
							'The <strong>Air temperature</strong> describes the degree of hotness or coldness of the air measured in Celsius.',
						unitOnly: '°C'
					},
					atmospheric_pressure_max: {
						label: 'Maximum atmospheric pressure',
						description:
							'The <strong>Maximum atmospheric pressure</strong> describes the highest force exerted by the weight of air in the atmosphere, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure_min: {
						label: 'Minimum atmospheric pressure',
						description:
							'The <strong>Minimum atmospheric pressure</strong> describes the lowest force exerted by the weight of air in the atmosphere, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure_reduced_max: {
						label: 'Maximum reduced atmospheric pressure',
						description:
							'The <strong>Maximum reduced atmospheric pressure</strong> describes the highest sea-level adjusted pressure, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure_reduced_min: {
						label: 'Minimum reduced atmospheric pressure',
						description:
							'The <strong>Minimum reduced atmospheric pressure</strong> describes the lowest sea-level adjusted pressure, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure_reduced: {
						label: 'Reduced atmospheric pressure',
						description:
							'The <strong>Reduced atmospheric pressure</strong> describes the sea-level adjusted pressure, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure: {
						label: 'Air pressure',
						description:
							'The <strong>Air pressure</strong> describes the force exerted by the weight of air in the atmosphere, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					dew_point_max: {
						label: 'Maximum dew point',
						description:
							'The <strong>Maximum dew point</strong> describes the highest temperature at which air is saturated with water vapor, measured in degrees Celsius.',
						unitOnly: '°C'
					},
					dew_point_min: {
						label: 'Minimum dew point',
						description:
							'The <strong>Minimum dew point</strong> describes the lowest temperature at which air is saturated with water vapor, measured in degrees Celsius.',
						unitOnly: '°C'
					},
					dew_point: {
						label: 'Dew point',
						description:
							'The <strong>Dew point</strong> describes the temperature at which air is saturated with water vapor, measured in degrees Celsius.',
						unitOnly: '°C'
					},
					heat_index_max: {
						label: 'Maximum heat index',
						description:
							'The <strong>Maximum heat index</strong> describes the highest perceived temperature based on air temperature and humidity.',
						unitOnly: '°C'
					},
					heat_index_min: {
						label: 'Minimum heat index',
						description:
							'The <strong>Minimum heat index</strong> describes the lowest perceived temperature based on air temperature and humidity.',
						unitOnly: '°C'
					},
					heat_index: {
						label: 'Heat index',
						description:
							'The <strong>Heat index</strong> describes the perceived temperature based on air temperature and humidity.',
						unitOnly: '°C'
					},
					lightning_average_distance_max: {
						label: 'Maximum average lightning strike distance',
						description:
							'The <strong>Maximum average lightning strike distance</strong> describes the greatest mean distance of lightning strikes from a reference point, measured in meters.',
						unitOnly: 'm'
					},
					lightning_average_distance_min: {
						label: 'Minimum average lightning strike distance',
						description:
							'The <strong>Minimum average lightning strike distance</strong> describes the smallest mean distance of lightning strikes from a reference point, measured in meters.',
						unitOnly: 'm'
					},
					lightning_average_distance: {
						label: 'Average lightning strike distance',
						description:
							'The <strong>Average lightning strike distance</strong> describes the mean distance of lightning strikes from a reference point, measured in meters.',
						unitOnly: 'm'
					},
					lightning_strike_count_max: {
						label: 'Maximum lightning strikes count',
						description:
							'The <strong>Maximum lightning strikes count</strong> describes the highest number of times lightning has struck within a given area and time period.',
						unitOnly: ''
					},
					lightning_strike_count_min: {
						label: 'Minimum lightning strikes count',
						description:
							'The <strong>Minimum lightning strikes count</strong> describes the lowest number of times lightning has struck within a given area and time period.',
						unitOnly: ''
					},
					lightning_strike_count: {
						label: 'Lightning strikes count',
						description:
							'The <strong>Lightning strikes count</strong> describes the number of times lightning has struck within a given area and time period.',
						unitOnly: ''
					},
					maximum_wind_speed_max: {
						label: 'Maximum maximum wind speed',
						description:
							'The <strong>Maximum maximum wind speed</strong> describes the highest recorded wind speed during a specific time period.',
						unitOnly: 'm/s'
					},
					maximum_wind_speed_min: {
						label: 'Minimum maximum wind speed',
						description:
							'The <strong>Minimum maximum wind speed</strong> describes the lowest recorded wind speed during a specific time period.',
						unitOnly: 'm/s'
					},
					maximum_wind_speed: {
						label: 'Maximum wind speed',
						description:
							'The <strong>Maximum wind speed</strong> describes the highest rate of air movement recorded during a specific time period.',
						unitOnly: 'm/s'
					},
					mrt_max: {
						label: 'Maximum mid-range radiation temperature',
						description:
							'The <strong>Maximum mid-range radiation temperature</strong> describes the highest average temperature of surrounding surfaces that emit radiant heat.',
						unitOnly: '°C'
					},
					mrt_min: {
						label: 'Minimum mid-range radiation temperature',
						description:
							'The <strong>Minimum mid-range radiation temperature</strong> describes the lowest average temperature of surrounding surfaces that emit radiant heat.',
						unitOnly: '°C'
					},
					mrt: {
						label: 'Mid-range radiation temperature',
						description:
							'The <strong>Mid-range radiation temperature</strong> describes the average temperature of surrounding surfaces that emit radiant heat.',
						unitOnly: '°C'
					},
					pet_category: {
						label: 'Physiological equivalent temperature (PET) category',
						description:
							'The <strong>PET category</strong> describes the classification of the physiological equivalent temperature in terms of heat stress.',
						unitOnly: ''
					},
					pet_max: {
						label: 'Maximum physiological equivalent temperature (PET)',
						description:
							'The <strong>Maximum physiological equivalent temperature (PET)</strong> describes the highest recorded PET during a specific time period.',
						unitOnly: '°C'
					},
					pet_min: {
						label: 'Minimum physiological equivalent temperature (PET)',
						description:
							'The <strong>Minimum physiological equivalent temperature (PET)</strong> describes the lowest recorded PET during a specific time period.',
						unitOnly: '°C'
					},
					pet: {
						label: 'Physiological equivalent temperature (PET)',
						description:
							'The <strong>Physiological equivalent temperature (PET)</strong> describes an index that represents the thermal conditions experienced by a standard person in a standard indoor setting.',
						unitOnly: '°C'
					},
					precipitation_sum_max: {
						label: 'Maximum precipitation sum',
						description:
							'The <strong>Maximum precipitation sum</strong> describes the highest amount of water falling from the sky as rain, snow, or other forms, measured in millimeters.',
						unitOnly: 'mm'
					},
					precipitation_sum_min: {
						label: 'Minimum precipitation sum',
						description:
							'The <strong>Minimum precipitation sum</strong> describes the lowest amount of water falling from the sky as rain, snow, or other forms, measured in millimeters.',
						unitOnly: 'mm'
					},
					precipitation_sum: {
						label: 'Precipitation',
						description:
							'The <strong>Precipitation</strong> describes the amount of water falling from the sky as rain, snow, or other forms, measured in millimeters.',
						unitOnly: 'mm'
					},
					relative_humidity_max: {
						label: 'Maximum relative humidity',
						description:
							'The <strong>Maximum relative humidity</strong> describes the highest amount of water vapor in the air compared to the maximum amount it could hold at that temperature.',
						unitOnly: '%'
					},
					relative_humidity_min: {
						label: 'Minimum relative humidity',
						description:
							'The <strong>Minimum relative humidity</strong> describes the lowest amount of water vapor in the air compared to the maximum amount it could hold at that temperature.',
						unitOnly: '%'
					},
					relative_humidity: {
						label: 'Relative humidity',
						description:
							'The <strong>Relative humidity</strong> describes the amount of water vapor in the air compared to the maximum amount it could hold at that temperature.',
						unitOnly: '%'
					},
					solar_radiation_max: {
						label: 'Maximum solar radiation',
						description:
							'The <strong>Maximum solar radiation</strong> describes the highest amount of energy received from the sun per unit area, measured in watts per square meter.',
						unitOnly: 'W/m²'
					},
					solar_radiation_min: {
						label: 'Minimum solar radiation',
						description:
							'The <strong>Minimum solar radiation</strong> describes the lowest amount of energy received from the sun per unit area, measured in watts per square meter.',
						unitOnly: 'W/m²'
					},
					solar_radiation: {
						label: 'Solar radiation',
						description:
							'The <strong>Solar radiation</strong> describes the amount of energy received from the sun per unit area, measured in watts per square meter.',
						unitOnly: 'W/m²'
					},

					vapor_pressure_max: {
						label: 'Maximum vapor pressure',
						description:
							'The <strong>Maximum vapor pressure</strong> describes the highest pressure exerted by water vapor in the air, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					vapor_pressure_min: {
						label: 'Minimum vapor pressure',
						description:
							'The <strong>Minimum vapor pressure</strong> describes the lowest pressure exerted by water vapor in the air, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					vapor_pressure: {
						label: 'Vapor pressure',
						description:
							'The <strong>Vapor pressure</strong> describes the pressure exerted by water vapor in the air, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					wet_bulb_temperature_max: {
						label: 'Maximum wet bulb temperature',
						description:
							'The <strong>Maximum wet bulb temperature</strong> describes the highest temperature a thermometer would read if it were covered with a wet cloth and exposed to the air.',
						unitOnly: '°C'
					},
					wet_bulb_temperature_min: {
						label: 'Minimum wet bulb temperature',
						description:
							'The <strong>Minimum wet bulb temperature</strong> describes the lowest temperature a thermometer would read if it were covered with a wet cloth and exposed to the air.',
						unitOnly: '°C'
					},
					wet_bulb_temperature: {
						label: 'Wet bulb temperature',
						description:
							'The <strong>Wet bulb temperature</strong> describes the temperature a thermometer would read if it were covered with a wet cloth and exposed to the air.',
						unitOnly: '°C'
					},
					wind_direction_max: {
						label: 'Maximum wind direction',
						description:
							'The <strong>Maximum wind direction</strong> describes the highest recorded direction from which the wind is blowing, measured in degrees.',
						unitOnly: '°'
					},
					wind_direction_min: {
						label: 'Minimum wind direction',
						description:
							'The <strong>Minimum wind direction</strong> describes the lowest recorded direction from which the wind is blowing, measured in degrees.',
						unitOnly: '°'
					},
					wind_direction: {
						label: 'Wind direction',
						description:
							'The <strong>Wind direction</strong> describes the direction from which the wind is blowing, measured in degrees.',
						unitOnly: '°'
					},
					wind_speed_max: {
						label: 'Maximum wind speed',
						description:
							'The <strong>Maximum wind speed</strong> describes the highest rate of air movement recorded during a specific time period.',
						unitOnly: 'm/s'
					},
					wind_speed_min: {
						label: 'Minimum wind speed',
						description:
							'The <strong>Minimum wind speed</strong> describes the lowest rate of air movement recorded during a specific time period.',
						unitOnly: 'm/s'
					},
					wind_speed: {
						label: 'Wind speed',
						description:
							'The <strong>Wind speed</strong> describes the rate at which air is moving, measured in meters per second.',
						unitOnly: 'm/s'
					}
				}
			},
			minMaxAvgSelect: {
				min: 'Minimum',
				avg: 'Average',
				max: 'Maximum'
			},
			dateRangeSlider: {
				today: 'Today',
				day: 'Per day',
				hour: 'Per hour',
				range: 'Time range',
				infoTitle: 'How does the time range work?',
				infoDescription:
					'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'
			},
			histogram: {
				title: 'Overview of all stations',
				tooltip: {
					numberic:
						'There {{is|are}} <strong>{count}</strong> station{{s}} with values between <strong>{start} {unit}</strong> and <strong>{end} {unit}</strong>.',
					category:
						'There {{is|are}} <strong>{count}</strong> station{{s}} values in the category <strong>{category}</strong>.',
					stations: `Including the following {{|selected station|?? selected stations}}:`,
					clickToSelect: `Click to select {{|the station|?? stations}}.`
				}
			}
		},
		stations: {
			title: 'How do we measure thermal comfort?',
			titleTable: 'Overview of all stations',
			intro: [
				'Below you will find technical information about the monitoring stations, as well as a summary of the criteria for selecting their locations.'
			],
			stationsDescriptions: {
				supportedIndicatorsLabel: 'Supported indicators',
				weather: {
					title: 'Weather station with Blackglobe sensor',
					description:
						'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
					supportedIndicators: [
						'absolute_humidity',
						'air_temperature',
						'atmospheric_pressure_reduced',
						'atmospheric_pressure',
						'dew_point',
						'heat_index',
						'lightning_average_distance',
						'lightning_strike_count',
						'maximum_wind_speed',
						'mrt',
						'pet_category',
						'pet',
						'precipitation_sum',
						'relative_humidity',
						'solar_radiation',
						'specific_humidity',
						'utci_category',
						'utci',
						'vapor_pressure',
						'wet_bulb_temperature',
						'wind_direction',
						'wind_speed'
					]
				},
				airTemperatureAndHumidity: {
					title: 'Air temperature and humidity sensor',
					description:
						'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.',
					supportedIndicators: [
						'absolute_humidity',
						'air_temperature',
						'dew_point',
						'heat_index',
						'relative_humidity',
						'specific_humidity',
						'wet_bulb_temperature'
					]
				}
			},
			table: {
				search: {
					placeholder: 'Search...',
					label: 'Search table'
				},
				headers: {
					name: 'Station name',
					stationType: 'Station type',
					id: 'ID',
					geolocation: 'Geolocation',
					district: 'District',
					installation_at: 'Installation at',
					status: 'Status',
					details: 'Details',
					dataDownload: 'Data',
					dataDownloadTooltip: 'Download raw data for this station'
				},
				cells: {
					stationTypes: {
						biomet: 'Weather Station',
						temprh: 'Temperature'
					},
					status: {
						active: 'active',
						inactive: 'inactive'
					},
					coordinates: {
						googleMapsLinkText: 'Open in Google Maps',
						copyCoordinates: 'Copy to the clipboard',
						copiedToClipboard: 'Copied to the clipboard'
					}
				}
			}
		},
		about: {
			title: 'About this project',
			description:
				"This dashboard was developed as part of the Data2Resilience project, a joint research project of the Ruhr University Bochum and the Leibniz University Hannover. The project aims to improve Dortmund's resilience to climate change by using innovative technologies and citizen participation to minimize the impact of extreme heat on urban life. Data2Resilience is led by Prof. Dr. Benjamin Bechtel and Prof. Dr. Christian Albert and is funded by the <a href='https://iclei.org/activity/iclei-action-fund-2-0/' target='_blank' rel='noopener noreferrer'>ICLEI Action Fund 2.0</a> and <a href='https://www.google.org/' target='_blank' rel='noopener noreferrer'>Google.org</a>.",
			mainLink: {
				url: `https://dortmund.de/hitze`,
				label: 'dortmund.de/hitze'
			},
			contactLink: {
				url: `mailto:info@data2resilience.org`,
				label: 'Write us an email'
			},
			links: [
				{
					label: 'imprint',
					url: '/imprint'
				},
				{
					label: 'privacy policy',
					url: '/privacy-policy'
				}
			],
			logos: {
				RUB: {
					title: 'Logo of the Ruhr University Bochum (RUB)',
					url: 'https://www.ruhr-uni-bochum.de/en/'
				},
				LUH: {
					title: 'Logo of Leibniz University Hannover (LUH)',
					url: 'https://www.uni-hannover.de/'
				},
				ICLEI: {
					title: 'Logo of the Local Government for Sustainability EUROPE (ICLEI)',
					url: 'https://iclei.org/'
				},
				googleOrg: {
					title: 'Logo of Google.org',
					url: 'https://www.google.org/'
				}
			}
		}
	},
	indicators: {
		utci: {
			title: 'Universal Thermic Climate Index (UTCI)',
			description:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.',
			types: {
				byClass: {
					title: 'By heat stress category',
					description:
						'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.'
				},
				byValue: {
					title: 'By temperature in °C',
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
		air_temperature: {
			title: 'Air temperature',
			description:
				'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.'
		}
	},
	map: {
		search: {
			label: 'Search location',
			placeholder: 'Enter a location...',
			loading: 'Searching for results...',
			noResults: 'No results found',
			tooltip: 'You searched for the following place',
			error: 'An error occurred while searching for results'
		},
		zoom: {
			navAlt: 'Zoom navigation',
			zoomIn: 'Zoom in',
			zoomOut: 'Zoom out'
		},
		layersSelection: {
			ariaLabel: 'Map layer selection',
			districts: 'City districts',
			districtsTooltip: {
				title: 'City districts',
				description:
					'The city districts are the individual districts of the city of Dortmund. They are usually smaller than the city districts and action areas.'
			},
			lors: 'City districts<br/>& action areas',
			lorsTooltip: {
				title: 'City districts & action areas',
				description:
					'The city districts are the individual buildings of the city of Dortmund. The action areas are the public spaces operated by the city administration.'
			},
			satellite: 'Digital Orthophotos',
			satelliteTooltip: {
				title: 'Digital Orthophotos',
				description:
					'The digital orthophotos are a digital representation of the city of Dortmund. They show the city as a large, flat, black surface operated by digitalization of the city.'
			}
		},
		layersTooltips: {
			vulnerableArea: 'Action area',
			type: {
				stadtbezirk: 'City district',
				statistischer_bezirk: 'Neighborhood'
			}
		},
		choroplethLegend: {
			showHealthRisks: 'Show health risks',
			hideHealthRisks: 'Hide health risks',
			title: 'Heath risks',
			notCollectingData: 'Does not collect data',
			noValueAvailable: 'No data available',
			healthRisks: {
				'extreme cold stress': {
					title: {
						thermalComfort: '',
						heatStress: 'Extreme cold stress'
					},
					description: 'Life-threatening hypothermia, severe frostbite possible within minutes.',
					ranges: {
						pet: '',
						utci: 'below -40 °C'
					}
				},
				'very strong cold stress': {
					title: {
						thermalComfort: 'Very cold',
						heatStress: 'Very strong cold stress'
					},
					description: 'Life-threatening hypothermia, severe frostbite possible within minutes.',
					ranges: {
						pet: 'below 4 °C',
						utci: '-40 to -27 °C'
					}
				},
				'strong cold stress': {
					title: {
						thermalComfort: 'Cold',
						heatStress: 'Strong cold stress'
					},
					description: 'Risk of frostbite for exposed skin areas, increased risk of cold injuries.',
					ranges: {
						pet: '4 to 8 °C',
						utci: '-27 to -13 °C'
					}
				},
				'moderate cold stress': {
					title: {
						thermalComfort: 'Cool',
						heatStress: 'Moderate cold stress'
					},
					description: 'Shivering, discomfort, risk of frostbite with prolonged exposure.',
					ranges: {
						pet: '8 to 13 °C',
						utci: '-13 to 0 °C'
					}
				},
				'slight cold stress': {
					title: {
						thermalComfort: 'Slightly cool',
						heatStress: 'Slight cold stress'
					},
					description: 'Mild discomfort, temporary shivering.',
					ranges: {
						pet: '13 to 18 °C',
						utci: '0 to 9 °C'
					}
				},
				'no thermal stress': {
					title: {
						thermalComfort: 'No thermal stress',
						heatStress: 'Neutral'
					},
					description: 'Thermal comfort, no significant health risks.',
					ranges: {
						pet: '18 to 23 °C',
						utci: '9 to 26 °C'
					}
				},
				'moderate heat stress': {
					title: {
						thermalComfort: 'Slightly warm',
						heatStress: 'Moderate heat stress'
					},
					description: 'Mild discomfort, increased sweating.',
					ranges: {
						pet: '23 to 29 °C',
						utci: '26 to 32 °C'
					}
				},
				'strong heat stress': {
					title: {
						thermalComfort: 'Warm',
						heatStress: 'Strong heat stress'
					},
					description: 'Increased cardiovascular strain, risk of dehydration and exhaustion.',
					ranges: {
						pet: '29 to 35 °C',
						utci: '32 to 38 °C'
					}
				},
				'very strong heat stress': {
					title: {
						thermalComfort: 'Hot',
						heatStress: 'Very strong heat stress'
					},
					description:
						'Risk of heat cramps, heat exhaustion, increased risk of heat-related illnesses, especially during physical activity.',
					ranges: {
						pet: '35 to 41 °C',
						utci: '38 to 46 °C'
					}
				},
				'extreme heat stress': {
					title: {
						thermalComfort: 'Very hot',
						heatStress: 'Extreme heat stress'
					},
					description:
						'Life-threatening heat stroke, acute cardiovascular strain, high risk of severe heat-related illnesses and death.',
					ranges: {
						pet: 'above 41 °C',
						utci: 'above 46 °C'
					}
				}
			}
		},
		tiles: {
			tilesNotFound: {
				title: `{count} tiles could not be loaded.`,
				description: `No data for the unit "{measure}" available on {date} at {hour}.`
			}
		}
	}
} satisfies Translation;

export default en;

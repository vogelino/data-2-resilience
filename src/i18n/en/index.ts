import type { Translation } from "../i18n-types";

const siteNameShort = "Data2Resilience";
const siteSubtitle = "Dashboard for heat stress in Dortmund";
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
	themeColor: '#007bff',
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
		}
	},
	generic: {
		expand: 'Know more',
		collapse: 'Collapse',
		leftSidebar: {
			showAriaLabel: 'Expand left sidebar',
			hideAriaLabel: 'Collapse left sidebar'
		},
		hourInput: {
			label: 'Hour of the day',
			inputAriaLabel: 'Select hour of the day',
			buttonUpAriaLabel: 'Select an hour later',
			buttonDownAriaLabel: 'Select an hour earlier'
		},
		combobox: {
			selectOption: 'Select an optionOption auswählen',
			noResults: 'No results'
		}
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
		expandButtonLabel: 'Show the introduction message again'
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
				"The heat atlas for Dortmund provides an overview of the city's heat stress. The heat stress is depicted through three maps: the Universal Thermal Climate Index (UTCI) to assess the thermal sensation of residents, as well as relative humidity and air temperature as key influencing factors."
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
			noStationsSelected: 'Select at least one station to display its data',
			someInsufficientDataStations:
				'Not enought data is collected for the selected indicator <strong>{unit}</strong> at the stations <strong>{stations}</strong> for us to aggregate it.',
			allInsufficientDataStations:
				'None of the selected stations collect enough data for the indicator <strong>{unit}</strong> for us to aggregate it.',
			singleInsufficientDataStation:
				'The station <strong>{station}</strong> does not collect enough data for the indicator <strong>{unit}</strong> for us to aggregate it.',
			someUnsupportedStations:
				'The stations <strong>{stations}</strong> do not collect data for the selected indicator <strong>{unit}</strong>.',
			allUnsupportedStations:
				'None of the selected stations collect data for the indicator <strong>{unit}</strong>.',
			singleUnsupportedStation:
				'The station <strong>{station}</strong> does not collect data for the indicator <strong>{unit}</strong>.',
			singleUnsupportedStationShort:
				'This station does not collect data for the indicator <strong>{unit}</strong>.',
			stationsSelect: {
				placeholder: 'Select one or more stations',
				label: 'Selected stations'
			},
			unitSelect: {
				noUnitFound: 'No unit found',
				placeholder: 'Select a unit',
				searchPlaceholder: 'Search unit...',
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
						label: 'UTCI category',
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
						label: 'PET category',
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
				title: 'Overview of all stations'
			}
		},
		stations: {
			title: 'How do we measure thermal comfort?',
			titleTable: 'Overview of all stations',
			intro: [
				'Below you will find technical information about the monitoring stations, as well as a summary of the criteria for selecting their locations.'
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
					details: 'Details'
				},
				cells: {
					stationTypes: {
						thisStationMeasures: 'This station measures:',
						biomet: {
							nameShort: 'Weather Station',
							title: 'Weather station (including Blackglobe sensor)',
							description:
								'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.'
						},
						temprh: {
							nameShort: 'Temperature',
							title: 'Temperature and humidity sensor',
							description:
								'Ex consequat duis do adipisicing ipsum velit minim aliqua. Labore cillum nostrud id tempor id in sint qui sunt qui.'
						}
					},
					status: {
						active: 'active',
						inactive: 'inactive'
					}
				}
			}
		},
		about: {
			title: 'About this project',
			description:
				"This dashboard was developed as part of the Data2Resilience project, a joint research project of the Ruhr University Bochum and the Leibniz University Hannover. The project aims to improve Dortmund's resilience to climate change by using innovative technologies and citizen participation to minimize the impact of extreme heat on urban life. Data2Resilience is led by Prof. Dr. Benjamin Bechtel and Prof. Dr. Christian Albert and is funded by the <a href='https://iclei.org/activity/iclei-action-fund-2-0/' target='_blank' rel='noopener noreferrer'>ICLEI Action Fund 2.0</a> and <a href='https://www.google.org/' target='_blank' rel='noopener noreferrer'>Google.org</a>.",
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
			lors: 'Action areas',
			satellite: 'Digital Orthophotos'
		},
		layersTooltips: {
			vulnerableArea: 'Vulnerable action area',
			type: {
				stadtbezirk: 'City district',
				statistischer_bezirk: 'Neighborhood'
			}
		},
		choroplethLegend: {
			showHealthRisks: 'Show health risks',
			hideHealthRisks: 'Hide health risks',
			title: 'Heath risks',
			noValueAvailable: 'No value available',
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
		}
	}
} satisfies Translation;

export default en;

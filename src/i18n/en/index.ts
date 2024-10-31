import type { Translation } from '../i18n-types';

const siteNameShort = `Data2Resilience`;
const siteSubtitle = `Dashboard for heat stress in Dortmund`;
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
			description: `Oops, it looks like something unexpected has went wrong. We're sorry. Please try again or navigate to the homepage.`
		},
		fourOhFour: {
			label: 'Page not found',
			description: `Oops, it looks like the page you were looking for doesn't exist. Don't worry, we can help you get back on track.`,
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
			showAriaLabel: 'Expande left sidebar',
			hideAriaLabel: 'Collapse left sidebar'
		},
		hourInput: {
			inputAriaLabel: 'Select hour of the day',
			buttonUpAriaLabel: 'Select an hour later',
			buttonDownAriaLabel: 'Select an hour earlier'
		}
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
		tabs: {
			actualMeasurements: 'Current measurements',
			heatStress: 'Heat stress',
			stations: 'Weather stations'
		}
	},
	pages: {
		heatStress: {
			title: 'How warm does your city feel?',
			intro: [
				"Heat stress is the state of discomfort and physiological strain experienced when the thermal environment exceeds a person's ability to dissipate heat. This means that temperature, humidity, air movement, and radiant heat are at levels that can cause discomfort or health risks. It can be assessed using various indicators:"
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
			stationsSelect: {
				placeholder: 'Select one or more stations',
				label: 'Selected stations'
			},
			unitSelect: {
				noUnitFound: 'No unit found',
				placeholder: 'Select a unit',
				searchPlaceholder: 'Search unit...',
				xOutOfY: '{part} of {total} stations',
				stationsHeaderLabel: `Station name`,
				units: {
					absolute_humidity_max: {
						label: 'Maximum absolute humidity (g/m³)',
						shortLabel: 'Max AH (g/m³)',
						description:
							'The <strong>Maximum absolute humidity</strong> describes the highest amount of water vapor in the air, measured in grams per cubic meter.',
						unitOnly: 'g/m³'
					},
					absolute_humidity_min: {
						label: 'Minimum absolute humidity (g/m³)',
						shortLabel: 'Min AH (g/m³)',
						description:
							'The <strong>Minimum absolute humidity</strong> describes the lowest amount of water vapor in the air, measured in grams per cubic meter.',
						unitOnly: 'g/m³'
					},
					absolute_humidity: {
						label: 'Absolute humidity (g/m³)',
						shortLabel: 'AH (g/m³)',
						description:
							'The <strong>Absolute humidity</strong> describes the amount of water vapor in the air, measured in grams per cubic meter.',
						unitOnly: 'g/m³'
					},
					air_temperature_max: {
						label: 'Maximum air temperature (°C)',
						shortLabel: 'Max Temp (°C)',
						description:
							'The <strong>Maximum air temperature</strong> describes the highest recorded temperature of the surrounding air in degrees Celsius.',
						unitOnly: '°C'
					},
					air_temperature_min: {
						label: 'Minimum air temperature (°C)',
						shortLabel: 'Min Temp (°C)',
						description:
							'The <strong>Minimum air temperature</strong> describes the lowest recorded temperature of the surrounding air in degrees Celsius.',
						unitOnly: '°C'
					},
					air_temperature: {
						label: 'Air temperature (°C)',
						shortLabel: 'Temp (°C)',
						description:
							'The <strong>Air temperature</strong> describes the degree of hotness or coldness of the air measured in Celsius.',
						unitOnly: '°C'
					},
					atmospheric_pressure_max: {
						label: 'Maximum atmospheric pressure (hPa)',
						shortLabel: 'Max Pressure (hPa)',
						description:
							'The <strong>Maximum atmospheric pressure</strong> describes the highest force exerted by the weight of air in the atmosphere, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure_min: {
						label: 'Minimum atmospheric pressure (hPa)',
						shortLabel: 'Min Pressure (hPa)',
						description:
							'The <strong>Minimum atmospheric pressure</strong> describes the lowest force exerted by the weight of air in the atmosphere, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure_reduced_max: {
						label: 'Maximum reduced atmospheric pressure (hPa)',
						shortLabel: 'Max Red. Pressure (hPa)',
						description:
							'The <strong>Maximum reduced atmospheric pressure</strong> describes the highest sea-level adjusted pressure, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure_reduced_min: {
						label: 'Minimum reduced atmospheric pressure (hPa)',
						shortLabel: 'Min Red. Pressure (hPa)',
						description:
							'The <strong>Minimum reduced atmospheric pressure</strong> describes the lowest sea-level adjusted pressure, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure_reduced: {
						label: 'Reduced atmospheric pressure (hPa)',
						shortLabel: 'Red. Pressure (hPa)',
						description:
							'The <strong>Reduced atmospheric pressure</strong> describes the sea-level adjusted pressure, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					atmospheric_pressure: {
						label: 'Air pressure (hPa)',
						shortLabel: 'Pressure (hPa)',
						description:
							'The <strong>Air pressure</strong> describes the force exerted by the weight of air in the atmosphere, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					dew_point_max: {
						label: 'Maximum dew point (°C)',
						shortLabel: 'Max DP (°C)',
						description:
							'The <strong>Maximum dew point</strong> describes the highest temperature at which air is saturated with water vapor, measured in degrees Celsius.',
						unitOnly: '°C'
					},
					dew_point_min: {
						label: 'Minimum dew point (°C)',
						shortLabel: 'Min DP (°C)',
						description:
							'The <strong>Minimum dew point</strong> describes the lowest temperature at which air is saturated with water vapor, measured in degrees Celsius.',
						unitOnly: '°C'
					},
					dew_point: {
						label: 'Dew point (°C)',
						shortLabel: 'DP (°C)',
						description:
							'The <strong>Dew point</strong> describes the temperature at which air is saturated with water vapor, measured in degrees Celsius.',
						unitOnly: '°C'
					},
					heat_index_max: {
						label: 'Maximum heat index (°C)',
						shortLabel: 'Max HI (°C)',
						description:
							'The <strong>Maximum heat index</strong> describes the highest perceived temperature based on air temperature and humidity.',
						unitOnly: '°C'
					},
					heat_index_min: {
						label: 'Minimum heat index (°C)',
						shortLabel: 'Min HI (°C)',
						description:
							'The <strong>Minimum heat index</strong> describes the lowest perceived temperature based on air temperature and humidity.',
						unitOnly: '°C'
					},
					heat_index: {
						label: 'Heat index (°C)',
						shortLabel: 'HI (°C)',
						description:
							'The <strong>Heat index</strong> describes the perceived temperature based on air temperature and humidity.',
						unitOnly: '°C'
					},
					lightning_average_distance_max: {
						label: 'Maximum average lightning strike distance (m)',
						shortLabel: 'Max Avg LS Dist (m)',
						description:
							'The <strong>Maximum average lightning strike distance</strong> describes the greatest mean distance of lightning strikes from a reference point, measured in meters.',
						unitOnly: 'm'
					},
					lightning_average_distance_min: {
						label: 'Minimum average lightning strike distance (m)',
						shortLabel: 'Min Avg LS Dist (m)',
						description:
							'The <strong>Minimum average lightning strike distance</strong> describes the smallest mean distance of lightning strikes from a reference point, measured in meters.',
						unitOnly: 'm'
					},
					lightning_average_distance: {
						label: 'Average lightning strike distance (m)',
						shortLabel: 'Avg LS Dist (m)',
						description:
							'The <strong>Average lightning strike distance</strong> describes the mean distance of lightning strikes from a reference point, measured in meters.',
						unitOnly: 'm'
					},
					lightning_strike_count_max: {
						label: 'Maximum lightning strikes count',
						shortLabel: 'Max LS Count',
						description:
							'The <strong>Maximum lightning strikes count</strong> describes the highest number of times lightning has struck within a given area and time period.',
						unitOnly: ''
					},
					lightning_strike_count_min: {
						label: 'Minimum lightning strikes count',
						shortLabel: 'Min LS Count',
						description:
							'The <strong>Minimum lightning strikes count</strong> describes the lowest number of times lightning has struck within a given area and time period.',
						unitOnly: ''
					},
					lightning_strike_count: {
						label: 'Lightning strikes count',
						shortLabel: 'LS Count',
						description:
							'The <strong>Lightning strikes count</strong> describes the number of times lightning has struck within a given area and time period.',
						unitOnly: ''
					},
					maximum_wind_speed_max: {
						label: 'Maximum maximum wind speed (m/s)',
						shortLabel: 'Max Max WS (m/s)',
						description:
							'The <strong>Maximum maximum wind speed</strong> describes the highest recorded wind speed during a specific time period.',
						unitOnly: 'm/s'
					},
					maximum_wind_speed_min: {
						label: 'Minimum maximum wind speed (m/s)',
						shortLabel: 'Min Max WS (m/s)',
						description:
							'The <strong>Minimum maximum wind speed</strong> describes the lowest recorded wind speed during a specific time period.',
						unitOnly: 'm/s'
					},
					maximum_wind_speed: {
						label: 'Maximum wind speed (m/s)',
						shortLabel: 'Max WS (m/s)',
						description:
							'The <strong>Maximum wind speed</strong> describes the highest rate of air movement recorded during a specific time period.',
						unitOnly: 'm/s'
					},
					mrt_max: {
						label: 'Maximum mid-range radiation temperature (°C)',
						shortLabel: 'Max MRT (°C)',
						description:
							'The <strong>Maximum mid-range radiation temperature</strong> describes the highest average temperature of surrounding surfaces that emit radiant heat.',
						unitOnly: '°C'
					},
					mrt_min: {
						label: 'Minimum mid-range radiation temperature (°C)',
						shortLabel: 'Min MRT (°C)',
						description:
							'The <strong>Minimum mid-range radiation temperature</strong> describes the lowest average temperature of surrounding surfaces that emit radiant heat.',
						unitOnly: '°C'
					},
					mrt: {
						label: 'Mid-range radiation temperature (°C)',
						shortLabel: 'MRT (°C)',
						description:
							'The <strong>Mid-range radiation temperature</strong> describes the average temperature of surrounding surfaces that emit radiant heat.',
						unitOnly: '°C'
					},
					pet_category: {
						label: 'PET category',
						shortLabel: 'PET Cat.',
						description:
							'The <strong>PET category</strong> describes the classification of the physiological equivalent temperature in terms of heat stress.',
						unitOnly: ''
					},
					pet_max: {
						label: 'Maximum physiological equivalent temperature (PET) (°C)',
						shortLabel: 'Max PET (°C)',
						description:
							'The <strong>Maximum physiological equivalent temperature (PET)</strong> describes the highest recorded PET during a specific time period.',
						unitOnly: '°C'
					},
					pet_min: {
						label: 'Minimum physiological equivalent temperature (PET) (°C)',
						shortLabel: 'Min PET (°C)',
						description:
							'The <strong>Minimum physiological equivalent temperature (PET)</strong> describes the lowest recorded PET during a specific time period.',
						unitOnly: '°C'
					},
					pet: {
						label: 'Physiological equivalent temperature (PET) (°C)',
						shortLabel: 'PET (°C)',
						description:
							'The <strong>Physiological equivalent temperature (PET)</strong> describes an index that represents the thermal conditions experienced by a standard person in a standard indoor setting.',
						unitOnly: '°C'
					},
					precipitation_sum_max: {
						label: 'Maximum precipitation sum (mm)',
						shortLabel: 'Max Precip (mm)',
						description:
							'The <strong>Maximum precipitation sum</strong> describes the highest amount of water falling from the sky as rain, snow, or other forms, measured in millimeters.',
						unitOnly: 'mm'
					},
					precipitation_sum_min: {
						label: 'Minimum precipitation sum (mm)',
						shortLabel: 'Min Precip (mm)',
						description:
							'The <strong>Minimum precipitation sum</strong> describes the lowest amount of water falling from the sky as rain, snow, or other forms, measured in millimeters.',
						unitOnly: 'mm'
					},
					precipitation_sum: {
						label: 'Precipitation (mm)',
						shortLabel: 'Precip (mm)',
						description:
							'The <strong>Precipitation</strong> describes the amount of water falling from the sky as rain, snow, or other forms, measured in millimeters.',
						unitOnly: 'mm'
					},
					relative_humidity_max: {
						label: 'Maximum relative humidity (%)',
						shortLabel: 'Max RH (%)',
						description:
							'The <strong>Maximum relative humidity</strong> describes the highest amount of water vapor in the air compared to the maximum amount it could hold at that temperature.',
						unitOnly: '%'
					},
					relative_humidity_min: {
						label: 'Minimum relative humidity (%)',
						shortLabel: 'Min RH (%)',
						description:
							'The <strong>Minimum relative humidity</strong> describes the lowest amount of water vapor in the air compared to the maximum amount it could hold at that temperature.',
						unitOnly: '%'
					},
					relative_humidity: {
						label: 'Relative humidity (%)',
						shortLabel: 'RH (%)',
						description:
							'The <strong>Relative humidity</strong> describes the amount of water vapor in the air compared to the maximum amount it could hold at that temperature.',
						unitOnly: '%'
					},
					solar_radiation_max: {
						label: 'Maximum solar radiation (W/m²)',
						shortLabel: 'Max SR (W/m²)',
						description:
							'The <strong>Maximum solar radiation</strong> describes the highest amount of energy received from the sun per unit area, measured in watts per square meter.',
						unitOnly: 'W/m²'
					},
					solar_radiation_min: {
						label: 'Minimum solar radiation (W/m²)',
						shortLabel: 'Min SR (W/m²)',
						description:
							'The <strong>Minimum solar radiation</strong> describes the lowest amount of energy received from the sun per unit area, measured in watts per square meter.',
						unitOnly: 'W/m²'
					},
					solar_radiation: {
						label: 'Solar radiation (W/m²)',
						shortLabel: 'SR (W/m²)',
						description:
							'The <strong>Solar radiation</strong> describes the amount of energy received from the sun per unit area, measured in watts per square meter.',
						unitOnly: 'W/m²'
					},
					utci_category: {
						label: 'UTCI category',
						shortLabel: 'UTCI Cat.',
						description:
							'The <strong>UTCI category</strong> describes the classification of the universal heat stress index in terms of heat stress.',
						unitOnly: ''
					},
					utci_max: {
						label: 'Maximum Universal Thermic Comfort Index (UTCI) (°C)',
						shortLabel: 'Max UTCI (°C)',
						description:
							'The <strong>Maximum Universal Thermic Comfort Index (UTCI)</strong> describes the highest recorded UTCI during a specific time period.',
						unitOnly: '°C'
					},
					utci_min: {
						label: 'Minimum Universal Thermic Comfort Index (UTCI) (°C)',
						shortLabel: 'Min UTCI (°C)',
						description:
							'The <strong>Minimum Universal Thermic Comfort Index (UTCI)</strong> describes the lowest recorded UTCI during a specific time period.',
						unitOnly: '°C'
					},
					utci: {
						label: 'Universal Thermic Comfort Index (UTCI) (°C)',
						shortLabel: 'UTCI (°C)',
						description:
							'The <strong>Universal Thermic Comfort Index (UTCI)</strong> describes a measure of human heat stress that combines air temperature, humidity, wind speed, and radiation.',
						unitOnly: '°C'
					},
					vapor_pressure_max: {
						label: 'Maximum vapor pressure (hPa)',
						shortLabel: 'Max VP (hPa)',
						description:
							'The <strong>Maximum vapor pressure</strong> describes the highest pressure exerted by water vapor in the air, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					vapor_pressure_min: {
						label: 'Minimum vapor pressure (hPa)',
						shortLabel: 'Min VP (hPa)',
						description:
							'The <strong>Minimum vapor pressure</strong> describes the lowest pressure exerted by water vapor in the air, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					vapor_pressure: {
						label: 'Vapor pressure (hPa)',
						shortLabel: 'VP (hPa)',
						description:
							'The <strong>Vapor pressure</strong> describes the pressure exerted by water vapor in the air, measured in hectopascals.',
						unitOnly: 'hPa'
					},
					wet_bulb_temperature_max: {
						label: 'Maximum wet bulb temperature (°C)',
						shortLabel: 'Max WBT (°C)',
						description:
							'The <strong>Maximum wet bulb temperature</strong> describes the highest temperature a thermometer would read if it were covered with a wet cloth and exposed to the air.',
						unitOnly: '°C'
					},
					wet_bulb_temperature_min: {
						label: 'Minimum wet bulb temperature (°C)',
						shortLabel: 'Min WBT (°C)',
						description:
							'The <strong>Minimum wet bulb temperature</strong> describes the lowest temperature a thermometer would read if it were covered with a wet cloth and exposed to the air.',
						unitOnly: '°C'
					},
					wet_bulb_temperature: {
						label: 'Wet bulb temperature (°C)',
						shortLabel: 'WBT (°C)',
						description:
							'The <strong>Wet bulb temperature</strong> describes the temperature a thermometer would read if it were covered with a wet cloth and exposed to the air.',
						unitOnly: '°C'
					},
					wind_direction_max: {
						label: 'Maximum wind direction (°)',
						shortLabel: 'Max WD (°)',
						description:
							'The <strong>Maximum wind direction</strong> describes the highest recorded direction from which the wind is blowing, measured in degrees.',
						unitOnly: '°'
					},
					wind_direction_min: {
						label: 'Minimum wind direction (°)',
						shortLabel: 'Min WD (°)',
						description:
							'The <strong>Minimum wind direction</strong> describes the lowest recorded direction from which the wind is blowing, measured in degrees.',
						unitOnly: '°'
					},
					wind_direction: {
						label: 'Wind direction (°)',
						shortLabel: 'WD (°)',
						description:
							'The <strong>Wind direction</strong> describes the direction from which the wind is blowing, measured in degrees.',
						unitOnly: '°'
					},
					wind_speed_max: {
						label: 'Maximum wind speed (m/s)',
						shortLabel: 'Max WS (m/s)',
						description:
							'The <strong>Maximum wind speed</strong> describes the highest rate of air movement recorded during a specific time period.',
						unitOnly: 'm/s'
					},
					wind_speed_min: {
						label: 'Minimum wind speed (m/s)',
						shortLabel: 'Min WS (m/s)',
						description:
							'The <strong>Minimum wind speed</strong> describes the lowest rate of air movement recorded during a specific time period.',
						unitOnly: 'm/s'
					},
					wind_speed: {
						label: 'Wind speed (m/s)',
						shortLabel: 'WS (m/s)',
						description:
							'The <strong>Wind speed</strong> describes the rate at which air is moving, measured in meters per second.',
						unitOnly: 'm/s'
					}
				}
			},
			dateRangeSlider: {
				today: 'Today',
				day: 'Per day',
				hour: 'Per hour',
				range: 'Time range'
			}
		},
		stations: {
			title: 'How are we measuring heat stress?',
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
			},
			table: {
				headers: {
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
						biomet: 'Weather station (including Blackglobe sensor)',
						temprh: 'Temperature and humidity sensor'
					},
					status: {
						active: 'active',
						inactive: 'inactive'
					}
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
		air_temperature: {
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
		},
		layersSelection: {
			ariaLabel: 'Map layer selection',
			districts: 'District boundaries',
			lors: 'Neighborhood areas',
			satellite: 'Satellite imagery'
		},
		choroplethLegend: {
			showHealthRisks: 'Show health risks',
			hideHealthRisks: 'Hide health risks',
			title: 'Heath risks',
			heatStressCategories: {
				'extreme cold stress': 'Extreme Cold Stress',
				'very strong cold stress': 'Very Strong Cold Stress',
				'strong cold stress': 'Strong Cold Stress',
				'moderate cold stress': 'Moderate Cold Stress',
				'slight cold stress': 'Slight Cold Stress',
				'no thermal stress': 'No Thermal Stress',
				'slight heat stress': 'Slight Heat Stress',
				'moderate heat stress': 'Moderate Heat Stress',
				'strong heat stress': 'Strong Heat Stress',
				'very strong heat stress': 'Very Strong Heat Stress',
				'extreme heat stress': 'Extreme Heat Stress'
			},
			healthRisks: {
				veryCold: {
					title: 'Very cold',
					description: 'Risk of hypothermia and frostbite with prolonged exposure'
				},
				cold: {
					title: 'Cold',
					description: 'Risk of lowered body temperature and discomfort'
				},
				slightlyWarm: {
					title: 'Slightly warm',
					description: 'Risk of discomfort and increased sweating'
				},
				warm: {
					title: 'Warm',
					description:
						'Risk of heat cramps, heat exhaustion and other heat-related illnesses, especially during physical activity'
				},
				veryWarm: {
					title: 'Very warm',
					description: 'Risk of heat stroke and organ failure'
				}
			}
		}
	}
} satisfies Translation;

export default en;

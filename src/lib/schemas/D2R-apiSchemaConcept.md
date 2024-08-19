# REST API ENDPOINTS:

## GET /stations/metadata

- **Usage**: For the table on the "Messstationen" page
- **Input**: None
- **Output**: An array of objects with the following keys:
  - **id**: string | number
  - **name**: string
  - **latitude**: number
  - **longitude**: number
  - **station_type**: enum('weather', 'sensor', etc.)
  - ...and any additional metadata relevant to the station

## GET /stations/`{data_type}`

- **Usage**: For the map on the "Aktuelle Messwerte" page
- **Param `data_type`**: enum('utci_category', 'utci_value', 'pet_value', 'mrt_value', and any other analysis types such as air_humidity, wind, etc.)
- **Input**: None
- **Output**: An array of station objects with the following keys:
  - **id**: string | number
  - **name**: string
  - **latitude**: number
  - **longitude**: number
  - ...additionally, **ONE** of the following key-value pairs is returned depending on the `data_type`:
  - **utci_category**: enum('moderate', 'strong', 'very_strong', 'extreme')
  - **utci_value**: number
  - **pet_value**: number
  - **mrt_value**: number
  - ...and all other analysis types such as Lufttemperatur, Wind, etc.

## GET /districts

- **Usage**: For the map on the "Aktuelle Messwerte" page
- **Input**:
  - `data_type`: enum('utci_category', 'utci_value', 'pet_value', 'mrt_value')
    - If omitted, defaults to 'utci_category'
- **Output**: An array of objects with the following keys:
  - **id**: string (ideally some kind of standardized id from open street map or GIS for easy mapping to district GeoJSON shapes)
  - **name**: string (The display name of the district)
  - **[key: `data_type`]**: the value for the `data_type` for the district

## GET /trends/`{data_type}`

- **Usage**: For the line charts on the "Aktuelle Messwerte" page when selecting one or more stations or districts
- **Param `data_type`**: enum('utci_category', 'utci_value', 'pet_value', 'mrt_value', and any other analysis types such as air_humidity, wind, etc.)
- **Input**:
  - **item_type**: enum('stations', 'districts')
  - **item_ids**: string (comma-separated list of station or district ids)
  - **start_date**: date string (e.g., '2023-01-01')
  - **end_date**: date string (e.g., '2023-01-01')
    - If omitted, returns data for the start_date
  - **hour**: number between 0 and 23
  - **value_type**: enum('min', 'max', 'median')
- **Output**: An object with the following keys:
  - **supported_ids**: An array of station or district ids that support the `data_type`
  - **unit**: string (The unit id of the `data_type`, e.g., 'celsius', 'hPa', 'm/s', etc. for us to easily translate the values to the correct unit)
  - **trends**: An array of objects with the following keys:
    - **date**: date string (e.g., '2023-01-01')
      ...additionally, one of the following key-value pairs is returned depending on the `data_type`:
    - **[key: station_id or district_id]**: value for the station or district corresponding to the `data_type` (If not supported, the station key-value pair is not included in the values object. If not available, the value is null)

## GET /stats/`{data_type}`

- **Usage**: For the bar charts on the "Aktuelle Messwerte" page when selecting one or more stations or districts
- **Param `data_type`**: enum('utci_category', 'utci_value', 'pet_value', 'mrt_value', and any other analysis types such as air_humidity, wind, etc.)
- **Input**: All parameters from `GET /trends/{data_type}`
- **Output**: An object with the following keys:
  - **supported_item_ids**: An array of station or district ids that support the `data_type`
  - **unit**: string (The unit id of the `data_type`, e.g., 'celsius', 'hPa', 'm/s', etc. for us to easily translate the values to the correct unit)
  - **stats**: An object with the following key-value pairs (one key-value pair for each station or district):
    - **[key: station_id or district_id]**: avg or aggregated value for the station or district corresponding to the `data_type` (If not supported, the station key-value pair is not included in the values object. If not available, the value is null)

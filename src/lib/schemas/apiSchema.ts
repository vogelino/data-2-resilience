import { z } from 'zod';

/*
Data needed:
- All stations values (for display on map [as tiles?])
  - On hover we should be able to read the value
    - For gradual values the value below the hovered pixel (maybe averaged over a certain radius?)
    - For categorical values the category of the hovered pixel
- All stations basic infos
  - name
  - latitude
  - longitude
- All bezirke basic infos
  - name
  - id (mapped to layer name or shape id)
  - avg_utci_category

- Individual station
- 
*/

const UTCIOutputSchema = z.object({});

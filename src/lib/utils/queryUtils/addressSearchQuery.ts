import { PUBLIC_GEOCODING_URL } from "$env/static/public";
import { z } from "zod";

const responseSchema = z.object({
  type: z.literal("FeatureCollection"),
  features: z.array(
    z.object({
      id: z.string(),
      type: z.literal("Feature"),
      bbox: z.array(z.number()).length(4),
      properties: z.object({
        text: z.string(),
        score: z.number(),
      }),
      geometry: z.object({
        type: z.literal("Point"),
        coordinates: z.array(z.number()),
      }),
    }),
  ),
});

type AddressResultType =
  | null
  | undefined
  | {
    address: string;
    coordinates: number[];
  };

export const searchAddress = async (
  searchTerm: string,
): Promise<AddressResultType> => {
  if (!searchTerm?.trim()) return null;
  const response = await fetch(
    `${PUBLIC_GEOCODING_URL}?query=${encodeURIComponent(searchTerm)}&outputformat=JSON`,
  );

  if (!response.ok) {
    console.error(`Geocoding error: ${response.status} ${response.statusText}`);
    return null;
  }

  const data = await response.json();
  const parsedData = responseSchema.safeParse(data).data?.features || [];
  if (parsedData.length === 0) return null;
  const firstResult = parsedData.find(
    (f) => f.properties.text && f.geometry.coordinates.length === 2,
  );
  if (!firstResult) return null;
  return {
    address: firstResult.properties.text,
    coordinates: firstResult.geometry.coordinates,
  };
};

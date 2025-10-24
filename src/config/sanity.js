import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Sanity client configuration
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || "your-project-id", // Replace with your Sanity project ID
  dataset: import.meta.env.VITE_SANITY_DATASET || "production", // or 'development'
  useCdn: true, // Enable CDN for faster response times
  apiVersion: "2024-01-01", // Use current date in YYYY-MM-DD format
  token: import.meta.env.VITE_SANITY_TOKEN, // Optional: only if you need to write data from the frontend
});

// Helper function to generate image URLs
const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
  return builder.image(source);
};

// Fetch all panel members grouped by year
export const fetchPanelData = async () => {
  try {
    const query = `*[_type == "panelYear"] | order(year desc) {
      _id,
      year,
      title,
      members[]-> {
        _id,
        name,
        position,
        department,
        email,
        phone,
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        bio,
        order
      }
    }`;

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching panel data:", error);
    return [];
  }
};

// Fetch a specific panel year
export const fetchPanelByYear = async (year) => {
  try {
    const query = `*[_type == "panelYear" && year == $year][0] {
      _id,
      year,
      title,
      members[]-> {
        _id,
        name,
        position,
        department,
        email,
        phone,
        image {
          asset-> {
            _id,
            url
          },
          alt
        },
        bio,
        order
      }
    }`;

    const data = await client.fetch(query, { year });
    return data;
  } catch (error) {
    console.error("Error fetching panel data for year:", year, error);
    return null;
  }
};

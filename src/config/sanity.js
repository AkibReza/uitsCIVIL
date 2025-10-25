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

// Fetch all achievements
export const fetchAchievements = async () => {
  try {
    const query = `*[_type == "achievement"] | order(order asc, date desc) {
      _id,
      title,
      description,
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      isInternational,
      date,
      location,
      gallery[] {
        asset-> {
          _id,
          url
        },
        alt,
        caption
      },
      order
    }`;

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching achievements:", error);
    return [];
  }
};

// Fetch a specific achievement by ID
export const fetchAchievementById = async (id) => {
  try {
    const query = `*[_type == "achievement" && _id == $id][0] {
      _id,
      title,
      description,
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      isInternational,
      date,
      location,
      gallery[] {
        asset-> {
          _id,
          url
        },
        alt,
        caption
      },
      order
    }`;

    const data = await client.fetch(query, { id });
    return data;
  } catch (error) {
    console.error("Error fetching achievement by ID:", id, error);
    return null;
  }
};

// Fetch all past events (for Events page)
export const fetchEvents = async () => {
  try {
    const query = `*[_type == "event"] | order(date desc, order asc) {
      _id,
      title,
      date,
      description,
      images[] {
        asset-> {
          _id,
          url
        },
        alt,
        caption
      },
      featured,
      order
    }`;

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching past events:", error);
    return [];
  }
};

// Fetch upcoming events (for UpcomingEvents page)
export const fetchUpcomingEvents = async () => {
  try {
    const query = `*[_type == "upcomingEvent"] | order(date asc) {
      _id,
      title,
      date,
      time,
      venue,
      description,
      details,
      organizer,
      capacity,
      registered,
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      images[] {
        asset-> {
          _id,
          url
        },
        alt,
        caption
      },
      featured,
      order
    }`;

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    return [];
  }
};

// Fetch a specific event by ID (past events)
export const fetchEventById = async (id) => {
  try {
    const query = `*[_type == "event" && _id == $id][0] {
      _id,
      title,
      date,
      description,
      images[] {
        asset-> {
          _id,
          url
        },
        alt,
        caption
      },
      featured,
      order
    }`;

    const data = await client.fetch(query, { id });
    return data;
  } catch (error) {
    console.error("Error fetching event by ID:", id, error);
    return null;
  }
};

// Fetch a specific upcoming event by ID
export const fetchUpcomingEventById = async (id) => {
  try {
    const query = `*[_type == "upcomingEvent" && _id == $id][0] {
      _id,
      title,
      date,
      time,
      venue,
      description,
      details,
      organizer,
      capacity,
      registered,
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      images[] {
        asset-> {
          _id,
          url
        },
        alt,
        caption
      },
      featured,
      order
    }`;

    const data = await client.fetch(query, { id });
    return data;
  } catch (error) {
    console.error("Error fetching upcoming event by ID:", id, error);
    return null;
  }
};

// Fetch all articles
export const fetchArticles = async () => {
  try {
    const query = `*[_type == "article"] | order(order asc, date desc) {
      _id,
      title,
      slug,
      author,
      date,
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      excerpt,
      readTime,
      tags,
      content,
      featured,
      order
    }`;

    console.log("Sanity Config:", {
      projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
      dataset: import.meta.env.VITE_SANITY_DATASET,
      apiVersion: "2024-01-01"
    });
    console.log("Executing Sanity query for articles...");
    
    const data = await client.fetch(query);
    console.log("Sanity response:", data);
    
    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    console.error("Error details:", {
      message: error.message,
      statusCode: error.statusCode,
      response: error.response
    });
    return [];
  }
};

// Fetch a specific article by ID
export const fetchArticleById = async (id) => {
  try {
    const query = `*[_type == "article" && _id == $id][0] {
      _id,
      title,
      slug,
      author,
      date,
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      excerpt,
      readTime,
      tags,
      content,
      featured,
      order
    }`;

    const data = await client.fetch(query, { id });
    return data;
  } catch (error) {
    console.error("Error fetching article by ID:", id, error);
    return null;
  }
};

// Fetch article by slug
export const fetchArticleBySlug = async (slug) => {
  try {
    const query = `*[_type == "article" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      author,
      date,
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      excerpt,
      readTime,
      tags,
      content,
      featured,
      order
    }`;

    const data = await client.fetch(query, { slug });
    return data;
  } catch (error) {
    console.error("Error fetching article by slug:", slug, error);
    return null;
  }
};

// Fetch all media gallery items
export const fetchMediaGallery = async () => {
  try {
    const query = `*[_type == "mediaGallery"] | order(order asc) {
      _id,
      title,
      category,
      image {
        asset-> {
          _id,
          url
        },
        alt,
        caption
      },
      description,
      featured,
      order
    }`;

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching media gallery:", error);
    return [];
  }
};

// Fetch featured media gallery items for homepage slider
export const fetchFeaturedMediaGallery = async () => {
  try {
    const query = `*[_type == "mediaGallery" && featured == true] | order(order asc) {
      _id,
      title,
      category,
      image {
        asset-> {
          _id,
          url
        },
        alt,
        caption
      },
      description,
      featured,
      order
    }`;

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching featured media gallery:", error);
    return [];
  }
};

// Fetch active faculty advisor
export const fetchFacultyAdvisor = async () => {
  try {
    const query = `*[_type == "facultyAdvisor" && active == true][0] {
      _id,
      name,
      title,
      credentials,
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      message,
      email,
      phone,
      active
    }`;

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching faculty advisor:", error);
    return null;
  }
};

// Fetch active leadership messages
export const fetchLeadershipMessages = async () => {
  try {
    const query = `*[_type == "leadership" && active == true] | order(order asc) {
      _id,
      name,
      position,
      academicInfo,
      image {
        asset-> {
          _id,
          url
        },
        alt
      },
      message,
      email,
      order,
      active
    }`;

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching leadership messages:", error);
    return [];
  }
};

// Fetch all FAQs
export const fetchFAQs = async () => {
  try {
    const query = `*[_type == "faq"] | order(order asc) {
      _id,
      question,
      answer,
      category,
      order,
      featured
    }`;

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return [];
  }
};

// Fetch featured FAQs for homepage
export const fetchFeaturedFAQs = async () => {
  try {
    const query = `*[_type == "faq" && featured == true] | order(order asc) {
      _id,
      question,
      answer,
      category,
      order,
      featured
    }`;

    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching featured FAQs:", error);
    return [];
  }
};

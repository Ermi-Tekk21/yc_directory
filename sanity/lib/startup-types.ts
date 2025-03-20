// lib/startup-types.ts
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Startup, Author, Slug } from "@/sanity/types"; // Adjust path to your generated types.ts

// Define a minimal Author type that matches the query projection
export type QueryAuthor = {
    _id: string;
    name?: string | null;
    image?: string | null;
    bio?: string | null;
};

// Define the type for the STARTUPS_QUERY result
export type StartupQueryResult = Omit<Startup, "author"> & {
    author?: QueryAuthor | null; // Override author with the query-specific shape
};

export type { Slug }; // Re-export if needed elsewhere
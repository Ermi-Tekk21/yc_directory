import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";
// sanity read client to fetch data from the Sanity API
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
});
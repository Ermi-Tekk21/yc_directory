// src/sanity/lib/client.ts
import { createClient } from "next-sanity";

import { dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion: "vX",
  useCdn: false
});
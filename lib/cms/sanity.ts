import { createClient } from "@sanity/client";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.SANITY_API_VERSION || "2026-07-13",
  useCdn: true
};

export const sanityClient =
  sanityConfig.projectId
    ? createClient({
        projectId: sanityConfig.projectId,
        dataset: sanityConfig.dataset,
        apiVersion: sanityConfig.apiVersion,
        useCdn: true
      })
    : null;

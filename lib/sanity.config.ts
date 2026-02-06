export const config = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Trouvé sur sanity.io/manage
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2023-01-01",
    useCdn: true,
  };
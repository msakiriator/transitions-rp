import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './studio/schemas'
import { StudioNavbar } from './sanity/StudioNavbar'

export default defineConfig({
  name: 'default',
  title: 'Transitions',
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID! || process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  studio: {
    components: {
      navbar: StudioNavbar
    }
  },
  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})

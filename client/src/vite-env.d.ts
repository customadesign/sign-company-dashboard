/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // Add more env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// CSS Module declarations
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Leaflet CSS import declaration
declare module "leaflet/dist/leaflet.css" {
  const content: string;
  export default content;
}

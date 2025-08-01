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

// Leaflet image asset declarations
declare module "leaflet/dist/images/marker-icon.png" {
  const src: string;
  export default src;
}

declare module "leaflet/dist/images/marker-shadow.png" {
  const src: string;
  export default src;
}

declare module "leaflet/dist/images/marker-icon-2x.png" {
  const src: string;
  export default src;
}

// PNG image declarations
declare module "*.png" {
  const src: string;
  export default src;
}

// SVG image declarations
declare module "*.svg" {
  const src: string;
  export default src;
}

// JPG image declarations
declare module "*.jpg" {
  const src: string;
  export default src;
}

// JPEG image declarations
declare module "*.jpeg" {
  const src: string;
  export default src;
}

// GIF image declarations
declare module "*.gif" {
  const src: string;
  export default src;
}

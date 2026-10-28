import type { MetadataRoute } from "next";
import { content } from "@/content";

const { site } = content;

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "rgb(15, 17, 21)",
    theme_color: "rgb(15, 17, 21)",
    icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
  };
}

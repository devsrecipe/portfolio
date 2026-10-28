import { content } from "@/content";
import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = content.site.defaultTitle;

const { headline, eyebrow } = content.home.hero;

export default function Image() {
  return renderOg(`${headline.before} ${headline.highlight} ${headline.after}`, eyebrow);
}

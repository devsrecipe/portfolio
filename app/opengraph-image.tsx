import { ogContentType, ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Devs Recipe: software that cuts costs and automates operations";

export default function Image() {
  return renderOg(
    "We help businesses cut costs and automate their operations.",
    "Software and automation",
  );
}

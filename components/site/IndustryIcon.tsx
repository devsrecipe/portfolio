import type { ComponentProps } from "react";

type IconProps = ComponentProps<"svg">;

export function IndustryIcon({
  slug,
  className,
  ...props
}: { slug: string } & IconProps) {
  switch (slug) {
    case "ecommerce":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          {...props}
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      );

    case "franchises":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          {...props}
        >
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <path d="M7 2v20" />
          <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
        </svg>
      );

    case "travel-and-tours":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          {...props}
        >
          <circle cx="12" cy="12" r="10" />
          <polygon
            points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
            fill="currentColor"
            fillOpacity="0.2"
          />
        </svg>
      );

    case "clinics-and-doctors":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          {...props}
        >
          <path d="M4.5 3v5a4.5 4.5 0 0 0 9 0V3" />
          <path d="M4.5 3H3" />
          <path d="M13.5 3H15" />
          <path d="M9 12.5v2.75A4.75 4.75 0 0 0 13.75 20h2.5a4.75 4.75 0 0 0 4.75-4.75V13" />
          <circle cx="21" cy="12" r="2" fill="currentColor" fillOpacity="0.25" />
        </svg>
      );

    case "diagnostic-centers":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          {...props}
        >
          <path d="M10 2v7.31L4.17 19.82A2 2 0 0 0 5.89 22h12.22a2 2 0 0 0 1.72-2.18L14 9.31V2" />
          <path d="M8.5 2h7" />
          <path d="M7 16h10" />
          <circle cx="10" cy="18.5" r="1" fill="currentColor" />
          <circle cx="13.5" cy="17" r="1" fill="currentColor" />
        </svg>
      );

    case "schools":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          {...props}
        >
          <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
          <path d="M6 12.5v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
          <path d="M22 10v6" />
        </svg>
      );

    case "pet-businesses":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          {...props}
        >
          <circle
            cx="12"
            cy="16.5"
            r="3.5"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <ellipse
            cx="6.5"
            cy="10"
            rx="1.8"
            ry="2.5"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <ellipse
            cx="10.2"
            cy="6"
            rx="1.8"
            ry="2.5"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <ellipse
            cx="13.8"
            cy="6"
            rx="1.8"
            ry="2.5"
            fill="currentColor"
            fillOpacity="0.2"
          />
          <ellipse
            cx="17.5"
            cy="10"
            rx="1.8"
            ry="2.5"
            fill="currentColor"
            fillOpacity="0.2"
          />
        </svg>
      );

    case "fmcg-and-retail":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          {...props}
        >
          <path
            d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"
            fill="currentColor"
            fillOpacity="0.12"
          />
          <path d="m3.3 7 8.7 5 8.7-5" />
          <path d="M12 22V12" />
        </svg>
      );

    case "startup-mvp":
    default:
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
          {...props}
        >
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
  }
}


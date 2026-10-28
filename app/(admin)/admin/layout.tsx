import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Devs Recipe Admin" },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: LayoutProps<"/admin">) {
  return children;
}

import { Sidebar } from "@/components/admin/Sidebar";

export default function PanelLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-dvh">
      <Sidebar />
      <main className="p-5 sm:p-8 lg:ml-60 lg:p-10">{children}</main>
    </div>
  );
}

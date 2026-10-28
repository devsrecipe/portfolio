import { Suspense } from "react";
import { Sidebar } from "@/components/admin/Sidebar";
import { getSidebarData } from "@/lib/admin-data";

async function SidebarWithData() {
  return <Sidebar {...await getSidebarData()} />;
}

export default function PanelLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="min-h-dvh">
      <Suspense fallback={<Sidebar adminName="" newApplications={0} />}>
        <SidebarWithData />
      </Suspense>
      <main className="p-5 sm:p-8 lg:ml-60 lg:p-10">{children}</main>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { adminNav } from "@/content/admin";
import { signOut } from "@/lib/actions";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === href : pathname.startsWith(href);
}

type SidebarProps = { adminName: string; newApplications: number };

function NavContent({
  adminName,
  newApplications,
  onNavigate,
}: SidebarProps & { onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <>
      <div className="px-3 pb-6 pt-1">
        <Logo />
      </div>
      <nav aria-label="Admin" className="flex-1">
        <ul className="space-y-1">
          {adminNav.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3 py-2.5 text-[0.95rem] font-medium transition-colors",
                    active ? "bg-primary text-ground" : "text-ink hover:bg-surface-2",
                  )}
                >
                  {item.label}
                  {item.href === "/admin/applications" && newApplications > 0 ? (
                    <span className="grid size-6 place-items-center rounded-full bg-accent text-xs font-bold text-ground">
                      {newApplications}
                      <span className="sr-only"> new</span>
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="flex items-center gap-3 border-t border-border px-3 pt-4">
        <span aria-hidden className="size-9 rounded-full bg-surface-2" />
        <div className="text-sm">
          <p className="font-semibold">{adminName}</p>
          <form action={signOut}>
            <button type="submit" className="text-muted hover:text-ink">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

/** Fixed sidebar on desktop, drawer on mobile. */
export function Sidebar(props: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-border bg-surface p-3 lg:flex">
        <NavContent {...props} />
      </aside>

      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3 lg:hidden">
        <Logo />
        <button
          type="button"
          aria-expanded={open}
          aria-controls="admin-drawer"
          onClick={() => setOpen(true)}
          className="grid size-11 place-items-center rounded-xl border border-border"
        >
          <span className="sr-only">Open menu</span>
          <span aria-hidden>☰</span>
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-ground/70"
          />
          <aside
            id="admin-drawer"
            className="relative flex h-full w-72 max-w-[85%] flex-col border-r border-border bg-surface p-3"
          >
            <NavContent {...props} onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      ) : null}
    </>
  );
}

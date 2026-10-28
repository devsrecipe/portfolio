import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

/** Centered card used by sign in, forgot password and reset password. */
export function AuthCard({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main className="grid min-h-dvh place-items-center p-5">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center gap-3">
          <Logo />
          <Badge variant="new">Admin</Badge>
        </div>
        <h1 className="mt-8 text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-muted">{intro}</p>
        {children}
      </Card>
    </main>
  );
}

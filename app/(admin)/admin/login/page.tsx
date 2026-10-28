import type { Metadata } from "next";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/brand/Logo";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main className="grid min-h-dvh place-items-center p-5">
      <Card className="w-full max-w-md p-8">
        <div className="flex items-center gap-3">
          <Logo />
          <Badge variant="new">Admin</Badge>
        </div>
        <h1 className="mt-8 text-3xl font-bold">Sign in</h1>
        <p className="mt-2 text-muted">
          Only invited team members can sign in. There is no public sign up.
        </p>
        <LoginForm />
        <p className="mt-5 text-center text-sm text-muted">
          [admin.{site.domain} or {site.domain}/admin]
        </p>
      </Card>
    </main>
  );
}

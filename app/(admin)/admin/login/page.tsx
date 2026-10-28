import type { Metadata } from "next";
import { AuthCard } from "@/components/admin/AuthCard";
import { LoginForm } from "@/components/admin/LoginForm";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <AuthCard
      title="Sign in"
      intro="Only invited team members can sign in. There is no public sign up."
    >
      <LoginForm />
      <p className="mt-5 text-center text-sm text-muted">
        [admin.{site.domain} or {site.domain}/admin]
      </p>
    </AuthCard>
  );
}

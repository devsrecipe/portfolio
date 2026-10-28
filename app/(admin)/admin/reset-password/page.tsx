import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthCard } from "@/components/admin/AuthCard";
import { ResetPasswordForm } from "@/components/admin/ResetPasswordForm";

export const metadata: Metadata = { title: "Choose a new password" };

// The token comes from the emailed link, so it is only known at request time.
async function ResetBody({
  searchParams,
}: Pick<PageProps<"/admin/reset-password">, "searchParams">) {
  const { token } = await searchParams;
  return <ResetPasswordForm token={typeof token === "string" ? token : ""} />;
}

export default function ResetPasswordPage({
  searchParams,
}: PageProps<"/admin/reset-password">) {
  return (
    <AuthCard
      title="Choose a new password"
      intro="This will sign you out everywhere else."
    >
      <Suspense fallback={<p className="mt-6 text-muted">Loading…</p>}>
        <ResetBody searchParams={searchParams} />
      </Suspense>
    </AuthCard>
  );
}

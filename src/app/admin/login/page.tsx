import { Suspense } from "react";
import { DashboardLoginForm } from "./login-form";

function LoginFallback() {
  return (
    <main className="page-container mx-auto flex min-h-screen max-w-md flex-col justify-center py-16">
      <p className="text-center text-caption text-forest/70">Chargement…</p>
    </main>
  );
}

export default function DashboardLoginPage() {
  return (
    <Suspense fallback={<LoginFallback />}>
      <DashboardLoginForm />
    </Suspense>
  );
}

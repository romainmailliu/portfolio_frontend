import { Suspense } from "react";
import { DashboardLoginForm } from "./login-form";

function LoginFallback() {
  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-16">
      <p className="text-center text-sm text-neutral-500">Chargement…</p>
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

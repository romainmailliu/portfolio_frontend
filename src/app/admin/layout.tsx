import type { Metadata } from "next";
import "../../styles/admin.css";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="admin-shell">{children}</div>;
}

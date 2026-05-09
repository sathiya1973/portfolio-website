import type { Metadata } from "next";
import AdminLoginClient from "./AdminLoginClient";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "SATHIYAMOORTHY K Admin Panel — Secure access only.",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return <AdminLoginClient />;
}

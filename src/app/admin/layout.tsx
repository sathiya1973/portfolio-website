export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Admin pages should not show the main Navbar/Footer
  // They manage their own layout
  return <>{children}</>;
}

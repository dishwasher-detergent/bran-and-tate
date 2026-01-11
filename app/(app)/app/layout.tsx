import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Navbar } from "@/components/ui/navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Breadcrumbs />
      <main className="container mx-auto p-4">{children}</main>
    </>
  );
}

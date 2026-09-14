import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/motion";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site min-h-screen">
      <Nav />
      <ScrollProgress />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

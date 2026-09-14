import { Hero } from "@/components/site/Hero";
import { Work } from "@/components/site/Work";
import { Capabilities } from "@/components/site/Capabilities";
import { Stack } from "@/components/site/Stack";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { site } from "@/content/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  jobTitle: site.role,
  email: `mailto:${site.email}`,
  worksFor: { "@type": "Organization", name: site.studio.name, url: site.studio.url },
  sameAs: [site.socials.github, site.socials.linkedin, site.socials.upwork],
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  knowsAbout: ["Next.js", "NestJS", "React Native", "TypeScript", "PostgreSQL", "MongoDB", "Node.js"],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Hero />
      <Work />
      <Capabilities />
      <Stack />
      <About />
      <Contact />
    </>
  );
}

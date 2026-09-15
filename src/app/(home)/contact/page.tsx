import type { Metadata } from "next";
import { Contact } from "@/components/site/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell me what you're building or what needs to work better. I usually reply the same day with a straight answer.",
};

export default function ContactPage() {
  return (
    <div className="pt-16 md:pt-20">
      <Contact />
    </div>
  );
}

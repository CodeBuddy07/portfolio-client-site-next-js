import type { Metadata } from "next";
import { DocumentsPage } from "@/components/site/DocumentsPage";

export const metadata: Metadata = {
  title: "CV",
  description: "Ruhul Amin, two-page CV as A4 documents, with PDF download.",
};

export default function CVPage() {
  return <DocumentsPage doc="cv" />;
}

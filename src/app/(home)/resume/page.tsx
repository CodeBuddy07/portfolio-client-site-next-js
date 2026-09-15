import type { Metadata } from "next";
import { DocumentsPage } from "@/components/site/DocumentsPage";

export const metadata: Metadata = {
  title: "Resume",
  description: "Ruhul Amin, one-page resume as an A4 document, with PDF download.",
};

export default function ResumePage() {
  return <DocumentsPage doc="resume" />;
}

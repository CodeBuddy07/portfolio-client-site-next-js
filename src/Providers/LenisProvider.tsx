"use client"; // 👈 Mark this component as client!

import { useLenis } from "@/hooks/useLenis";
import { ReactNode } from "react";


interface Props {
  children: ReactNode;
}

export const LenisProvider = ({ children }: Props) => {
  useLenis(); // 🧠 Now it's safe here because this file is client-side!

  return <>{children}</>;
};

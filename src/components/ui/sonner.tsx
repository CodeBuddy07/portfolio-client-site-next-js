"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = (props: ToasterProps) => (
  <Sonner
    className="toaster group"
    style={
      {
        "--normal-bg": "#17171b",
        "--normal-text": "#f4f4f5",
        "--normal-border": "rgba(255,255,255,0.14)",
      } as React.CSSProperties
    }
    {...props}
  />
);

export { Toaster };

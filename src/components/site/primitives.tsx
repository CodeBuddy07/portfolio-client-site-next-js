import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps, ReactNode } from "react";

export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-6", className)} {...props} />;
}

export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn("font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3", className)}
      {...props}
    />
  );
}

export function Section({
  id,
  eyebrow,
  title,
  lede,
  children,
  className,
  aside,
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  lede?: ReactNode;
  children: ReactNode;
  className?: string;
  aside?: ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 border-t border-line py-24 md:py-32", className)}>
      <Container>
        {(eyebrow || title) && (
          <div className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
              {title && (
                <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-[2.5rem] md:leading-[1.1]">
                  {title}
                </h2>
              )}
              {lede && <p className="mt-4 text-base leading-relaxed text-ink-2 md:text-lg">{lede}</p>}
            </div>
            {aside}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

type ButtonVariant = "primary" | "secondary" | "ghost";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal/60 focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:pointer-events-none disabled:opacity-50";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-canvas hover:bg-white",
  secondary: "border border-line-strong text-ink hover:border-ink-3 hover:bg-surface-2",
  ghost: "text-ink-2 hover:text-ink",
};

const buttonSizes = {
  md: "h-11 px-5",
  lg: "h-12 px-6 text-[15px]",
} as const;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  external,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: keyof typeof buttonSizes;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant; size?: keyof typeof buttonSizes }) {
  return (
    <button className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)} {...props} />
  );
}

export function Chip({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[11px] text-ink-2",
        className
      )}
      {...props}
    />
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className={cn("h-4 w-4", className)}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

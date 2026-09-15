// Re-mounts on every route change, so a CSS entrance here doubles as the page
// transition: visible in the server HTML, no hydration dependency.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}

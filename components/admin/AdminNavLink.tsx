import type { ReactNode } from "react";

/**
 * Full document navigation for admin console links.
 * Soft Link+RSC flights through auth middleware have been unreliable on the
 * production host; hard navigation always sends cookies and returns 200.
 */
export function AdminNavLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}

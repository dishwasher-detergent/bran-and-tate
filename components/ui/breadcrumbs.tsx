"use client";

import { IconChevronRight, IconHome } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const pathLabelMap: Record<string, string> = {
  app: "Home",
  signin: "Sign In",
  signup: "Sign Up",
  recover: "Recover Password",
  reset: "Reset Password",
  accept: "Accept Invitation",
};

export function Breadcrumbs() {
  const pathname = usePathname();

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    let currentPath = "";
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      const label =
        pathLabelMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
      breadcrumbs.push({
        label,
        href: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length < 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="border-b bg-muted/30">
      <ol className="container mx-auto flex items-center gap-2 text-sm px-4 py-3">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isFirst = index === 0;

          return (
            <Fragment key={breadcrumb.href}>
              {index > 0 && (
                <IconChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              <li className="flex items-center">
                {!isFirst ? (
                  <span className="font-medium text-foreground">
                    {breadcrumb.label}
                  </span>
                ) : (
                  <Link
                    href={breadcrumb.href}
                    className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                  >
                    {isFirst && <IconHome className="h-4 w-4" />}
                    {breadcrumb.label}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}

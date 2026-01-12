"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { getLabelById } from "@/lib/db";
import { IconChevronRight, IconHome } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

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
  labels: "Labels",
  create: "Create",
};

export function Breadcrumbs() {
  const pathname = usePathname();
  const [dynamicLabels, setDynamicLabels] = useState<Record<string, string>>(
    {}
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDynamicData = async () => {
      const paths = pathname.split("/").filter(Boolean);
      const newDynamicLabels: Record<string, string> = {};

      const labelIndex = paths.indexOf("labels");
      if (
        labelIndex !== -1 &&
        paths[labelIndex + 1] &&
        paths[labelIndex + 1] !== "create"
      ) {
        const labelId = paths[labelIndex + 1];
        setIsLoading(true);
        try {
          const result = await getLabelById(labelId);
          if (result.success && result.data) {
            newDynamicLabels[labelId] = result.data.scent || "Label";
          }
        } catch (error) {
          console.error("Failed to fetch label:", error);
        } finally {
          setIsLoading(false);
        }
      }

      setDynamicLabels(newDynamicLabels);
    };

    fetchDynamicData();
  }, [pathname]);

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split("/").filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [];

    let currentPath = "";
    paths.forEach((path) => {
      currentPath += `/${path}`;

      let label: string;
      if (dynamicLabels[path]) {
        label = dynamicLabels[path];
      } else {
        label =
          pathLabelMap[path] || path.charAt(0).toUpperCase() + path.slice(1);
      }

      breadcrumbs.push({
        label,
        href: currentPath,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  const paths = pathname.split("/").filter(Boolean);
  const labelIndex = paths.indexOf("labels");
  const hasDynamicLabel =
    labelIndex !== -1 &&
    paths[labelIndex + 1] &&
    paths[labelIndex + 1] !== "create";

  if (breadcrumbs.length < 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="border-b bg-muted/30">
      <ol className="container mx-auto flex items-center gap-2 text-sm px-4 py-3">
        {breadcrumbs.map((breadcrumb, index) => {
          const isFirst = index === 0;

          return (
            <Fragment key={breadcrumb.href}>
              {index > 0 && (
                <IconChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              <li className="flex items-center">
                {!isFirst ? (
                  isLoading && hasDynamicLabel ? (
                    <Skeleton className="h-4 w-24" />
                  ) : (
                    <span className="font-medium text-foreground">
                      {breadcrumb.label}
                    </span>
                  )
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

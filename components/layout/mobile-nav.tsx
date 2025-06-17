"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const routes = [
  {
    href: "/dashboard",
    label: "Dashboard",
  },
  {
    href: "/dashboard/produtos",
    label: "Produtos",
  },
  {
    href: "/dashboard/culturas",
    label: "Culturas",
  },
  {
    href: "/dashboard/documentacao",
    label: "Tutorial",
  },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px] z-50">
        <div className="px-2 py-6">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            AgroWise
          </h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <div key={route.href}>
                <Link
                  href={route.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    pathname === route.href
                      ? "bg-accent text-accent-foreground"
                      : "transparent"
                  )}
                >
                  {route.label}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
} 
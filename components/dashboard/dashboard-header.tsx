"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { BellIcon, UserIcon } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Produtos", href: "/dashboard/produtos" },
  { name: "Culturas", href: "/dashboard/culturas" },
  { name: "Tutorial", href: "/dashboard/documentacao" },
];

export function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    // Implementar lógica de logout aqui
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          {/* Mobile: Logo abre o menu lateral */}
          <div className="flex items-center gap-2">
            <button
              className="block lg:hidden p-0 border-0 bg-transparent focus:outline-none"
              aria-label="Abrir menu"
              onClick={() => setOpen(true)}
              type="button"
            >
              <Logo className="h-7 w-7" />
            </button>
            {/* Desktop: Logo e nome */}
            <div className="hidden lg:flex items-center gap-2">
              <Logo className="h-6 w-6" />
              <span className="text-lg font-bold">
                AgroWise
              </span>
            </div>
          </div>

          {/* Navegação desktop */}
          <nav className="hidden md:flex md:gap-4">
            {navigation.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                asChild
              >
                <Link href={item.href}>{item.name}</Link>
              </Button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <BellIcon className="h-5 w-5" />
            <span className="sr-only">Notificações</span>
          </Button>
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
                <UserIcon className="h-5 w-5" />
                <span className="sr-only">Menu do usuário</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Perfil</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Configurações</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Menu lateral mobile */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] z-50">
          <div className="px-2 py-6">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              AgroWise
            </h2>
            <div className="space-y-1">
              {navigation.map((route) => (
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
                    {route.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
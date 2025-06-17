"use client";

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
import { MobileNav } from "@/components/layout/mobile-nav";

export function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    // Implementar lógica de logout aqui
    router.push("/auth/login");
  };

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Produtos", href: "/dashboard/produtos" },
    { name: "Culturas", href: "/dashboard/culturas" },
  ];

  return (
    <header className="sticky top-0 z-30 border-b bg-background">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="lg:hidden">
              <MobileNav />
            </div>
            <div className="hidden lg:flex items-center gap-2">
              <Logo className="h-6 w-6" />
              <span className="text-lg font-bold">
                AgroWise
              </span>
            </div>
          </div>

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
    </header>
  );
}
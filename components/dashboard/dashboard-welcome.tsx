import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, BookOpenIcon } from "lucide-react";
import Link from "next/link";

export function DashboardWelcome() {
  return (
    <Card className="col-span-2 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpenIcon className="h-6 w-6 text-primary" />
          Bem-vindo ao AgroWise
        </CardTitle>
        <CardDescription>
          Sistema de gestão agrícola inteligente para otimizar suas operações
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Comece a usar o AgroWise explorando os recursos disponíveis no menu. Você pode gerenciar suas plantações, monitorar o clima, acompanhar a produtividade e muito mais.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button asChild className="hover:scale-105 transition-transform duration-300">
            <Link href="/dashboard/culturas">
              Explorar recursos
              <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button variant="outline" asChild className="hover:scale-105 transition-transform duration-300">
            <Link href="/dashboard/documentacao">
              Ver tutorial
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
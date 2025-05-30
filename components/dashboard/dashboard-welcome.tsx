import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";

export function DashboardWelcome() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Bem-vindo ao AgroWise</CardTitle>
        <CardDescription>
          Sistema de gestão agrícola inteligente para otimizar suas operações
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-muted-foreground">
          Comece a usar o AgroWise explorando os recursos disponíveis no menu. Você pode gerenciar suas plantações, monitorar o clima, acompanhar a produtividade e muito mais.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button>
            Explorar recursos
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline">Ver tutorial</Button>
        </div>
      </CardContent>
    </Card>
  );
}
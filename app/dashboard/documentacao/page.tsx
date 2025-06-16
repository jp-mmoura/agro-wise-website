"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function DocumentationPage() {
  return (
    <div className="flex-1 space-y-12 p-4 pt-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="text-3xl">📚</span>
          <h2 className="text-3xl font-bold tracking-tight">Documentação</h2>
        </div>
        <Button variant="outline" asChild className="hover:scale-105 transition-transform">
          <Link href="/dashboard">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Voltar ao Dashboard
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid gap-12">
        {/* Introduction Section */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Bem-vindo ao AgroWise</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Sua plataforma completa de gestão agrícola inteligente
            </p>
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto mt-4">
              No cenário atual da agricultura, a tecnologia se tornou um pilar fundamental para o sucesso das operações no campo. 
              O AgroWise surge como uma solução inovadora, combinando décadas de conhecimento agronômico com as mais avançadas 
              tecnologias digitais para transformar a maneira como você gerencia sua propriedade rural.
            </p>
          </div>

          {/* Video Placeholder */}
          <div className="relative aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden bg-black">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>

          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold">Por que escolher o AgroWise?</h2>
            <p className="text-muted-foreground">
              Em um mundo onde a agricultura enfrenta desafios cada vez mais complexos - desde mudanças climáticas até 
              regulamentações ambientais mais rigorosas - o AgroWise se destaca como uma ferramenta essencial para 
              produtores que buscam não apenas sobreviver, mas prosperar no mercado agrícola moderno.
            </p>
            <p className="text-muted-foreground">
              Nossa plataforma foi desenvolvida por uma equipe de especialistas em agronomia, tecnologia e gestão 
              agrícola, garantindo que cada funcionalidade atenda às necessidades reais do campo. Com o AgroWise, 
              você tem acesso a um conjunto completo de ferramentas que transformam dados em decisões inteligentes, 
              otimizando cada aspecto da sua operação agrícola.
            </p>
          </div>
        </section>

        {/* Quick Start Guide */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Comece sua Jornada</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A agricultura moderna exige precisão, eficiência e conhecimento. Com o AgroWise, você tem todas as 
              ferramentas necessárias para transformar sua propriedade em um exemplo de excelência agrícola.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-black text-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🚀</span>
                  Primeiros Passos
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Comece sua jornada com o AgroWise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    O primeiro passo para transformar sua gestão agrícola começa aqui. Neste guia, você aprenderá como:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Configurar seu perfil e preferências</li>
                    <li>Cadastrar sua propriedade e áreas de cultivo</li>
                    <li>Definir suas primeiras culturas</li>
                    <li>Configurar alertas e notificações</li>
                    <li>Navegar pela interface intuitiva</li>
                  </ul>
                  <p className="text-gray-300">
                    A agricultura de precisão começa com dados precisos. O AgroWise foi projetado para ser 
                    intuitivo e fácil de usar, permitindo que você comece a coletar e analisar dados desde o primeiro dia.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black text-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📱</span>
                  Mobilidade no Campo
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Acesse o AgroWise em qualquer lugar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    A agricultura moderna não para, e você também não precisa. Com o AgroWise mobile:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Acesse dados em tempo real no campo</li>
                    <li>Registre observações e fotos instantaneamente</li>
                    <li>Receba alertas importantes onde estiver</li>
                    <li>Gerencie sua equipe em movimento</li>
                    <li>Monitore condições climáticas locais</li>
                  </ul>
                  <p className="text-gray-300">
                    A mobilidade é essencial na agricultura moderna. Com o AgroWise, você tem acesso a todas as 
                    ferramentas necessárias diretamente no seu dispositivo móvel, permitindo decisões rápidas e 
                    precisas no campo.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Main Features */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Funcionalidades Principais</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              O AgroWise oferece um conjunto completo de ferramentas para transformar sua gestão agrícola. 
              Conheça as principais funcionalidades que farão a diferença no seu dia a dia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Culturas */}
            <Card className="bg-black text-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🌱</span>
                  Gestão de Culturas
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Controle total sobre suas culturas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    A gestão eficiente de culturas é fundamental para o sucesso agrícola. Com o AgroWise, você tem:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Cadastro detalhado de culturas e variedades</li>
                    <li>Monitoramento em tempo real do desenvolvimento</li>
                    <li>Controle integrado de pragas e doenças</li>
                    <li>Análise de produtividade por área</li>
                    <li>Planejamento de safras e rotação de culturas</li>
                  </ul>
                  <p className="text-gray-300">
                    Cada cultura tem suas particularidades e necessidades específicas. O AgroWise entende isso e 
                    oferece ferramentas personalizadas para cada tipo de cultivo, garantindo o melhor resultado 
                    possível para sua produção.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Produtos */}
            <Card className="bg-black text-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🧪</span>
                  Gestão de Insumos
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Controle preciso de produtos e estoque
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    A gestão eficiente de insumos é crucial para a rentabilidade da sua operação. O AgroWise oferece:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Controle detalhado de estoque</li>
                    <li>Gestão de fornecedores e compras</li>
                    <li>Registro de aplicações e tratamentos</li>
                    <li>Alertas de validade e estoque baixo</li>
                    <li>Análise de custos por cultura</li>
                  </ul>
                  <p className="text-gray-300">
                    Com o AgroWise, você tem controle total sobre seus insumos, desde a compra até a aplicação, 
                    garantindo que cada recurso seja utilizado da maneira mais eficiente possível.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Relatórios */}
            <Card className="bg-black text-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📊</span>
                  Análises e Relatórios
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Transforme dados em decisões
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Dados são o novo ouro da agricultura. Com o AgroWise, você transforma informações em insights valiosos:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Dashboard personalizado com KPIs</li>
                    <li>Relatórios exportáveis em diversos formatos</li>
                    <li>Análise de tendências e previsões</li>
                    <li>Comparação entre safras</li>
                    <li>Indicadores de desempenho por área</li>
                  </ul>
                  <p className="text-gray-300">
                    A tomada de decisão baseada em dados é fundamental para o sucesso na agricultura moderna. 
                    O AgroWise fornece todas as ferramentas necessárias para analisar seu desempenho e identificar 
                    oportunidades de melhoria.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Recursos Avançados</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Além das funcionalidades básicas, o AgroWise oferece recursos avançados para produtores que buscam 
              maximizar sua eficiência e produtividade.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Integrações */}
            <Card className="bg-black text-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔄</span>
                  Integrações
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Conecte com outras ferramentas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    A integração com outras ferramentas é essencial para uma gestão agrícola completa. O AgroWise oferece:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>APIs para integração com ERPs</li>
                    <li>Conectores com sistemas meteorológicos</li>
                    <li>Integração com máquinas agrícolas</li>
                    <li>Exportação de dados em diversos formatos</li>
                    <li>Webhooks para automação</li>
                  </ul>
                  <p className="text-gray-300">
                    A interoperabilidade é fundamental na agricultura moderna. O AgroWise se integra perfeitamente 
                    com outras ferramentas do seu ecossistema, garantindo que todos os seus sistemas trabalhem 
                    juntos de forma harmoniosa.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* API */}
            <Card className="bg-black text-white hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  API e Desenvolvimento
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Personalize e expanda o AgroWise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-gray-300">
                    Para desenvolvedores e equipes técnicas, o AgroWise oferece recursos avançados de integração:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Documentação completa da API</li>
                    <li>Exemplos de código em várias linguagens</li>
                    <li>Ambiente de testes e sandbox</li>
                    <li>Suporte técnico especializado</li>
                    <li>Fóruns de desenvolvedores</li>
                  </ul>
                  <p className="text-gray-300">
                    A flexibilidade é uma característica fundamental do AgroWise. Nossa API robusta permite que 
                    você personalize e expanda a plataforma de acordo com suas necessidades específicas, criando 
                    soluções únicas para seu negócio.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Support Section */}
        <section className="text-center space-y-8">
          <h2 className="text-3xl font-bold">Precisa de Ajuda?</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nossa equipe está sempre pronta para ajudar você a aproveitar ao máximo o AgroWise. 
            Conte com nosso suporte especializado para transformar sua gestão agrícola.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild className="hover:scale-105 transition-transform">
              <Link href="/dashboard/suporte">
                Contatar Suporte
              </Link>
            </Button>
            <Button variant="outline" asChild className="hover:scale-105 transition-transform">
              <Link href="mailto:suporte@agrowise.com.br">
                Enviar E-mail
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
} 
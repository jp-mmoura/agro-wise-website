"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { SearchIcon } from "lucide-react";

const activeIngredients = [
  {
    id: "glifosato",
    name: "Glifosato",
    category: "herbicida",
    recommendation: "Controle de plantas daninhas em pós-emergência",
    safety: "Usar EPI completo. Período de reentrada: 24 horas",
    crops: ["soja", "milho", "algodao", "cana"],
  },
  {
    id: "atrazina",
    name: "Atrazina",
    category: "herbicida",
    recommendation: "Controle de plantas daninhas em pré e pós-emergência",
    safety: "Usar EPI completo. Período de reentrada: 24 horas",
    crops: ["milho", "cana"],
  },
  {
    id: "2-4-d",
    name: "2,4-D",
    category: "herbicida",
    recommendation: "Controle de plantas daninhas de folhas largas",
    safety: "Usar EPI completo. Evitar aplicação em condições de vento",
    crops: ["soja", "milho", "arroz"],
  },
  {
    id: "clorpirifos",
    name: "Clorpirifós",
    category: "inseticida",
    recommendation: "Controle de pragas em diversas culturas",
    safety: "Alto período de carência. Usar EPI completo",
    crops: ["soja", "milho", "algodao"],
  },
  {
    id: "imidacloprido",
    name: "Imidacloprido",
    category: "inseticida",
    recommendation: "Controle de insetos sugadores",
    safety: "Tóxico para abelhas. Evitar aplicação durante a floração",
    crops: ["cafe", "algodao", "cana"],
  },
  {
    id: "mancozebe",
    name: "Mancozebe",
    category: "fungicida",
    recommendation: "Controle preventivo de doenças fúngicas",
    safety: "Usar EPI completo. Respeitar período de carência",
    crops: ["feijao", "soja", "milho"],
  },
];

const categories = [
  { id: "todos", name: "Todos" },
  { id: "herbicida", name: "Herbicidas" },
  { id: "inseticida", name: "Inseticidas" },
  { id: "fungicida", name: "Fungicidas" },
];

export function ActiveIngredientList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const filteredIngredients = activeIngredients.filter((ingredient) => {
    const matchesSearch = ingredient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "todos" || ingredient.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar princípio ativo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredIngredients.map((ingredient) => (
          <Card key={ingredient.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {ingredient.name}
                <Badge>{categories.find(c => c.id === ingredient.category)?.name}</Badge>
              </CardTitle>
              <CardDescription>
                Compatível com: {ingredient.crops.length} culturas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="mb-2 font-medium">Recomendação de Uso</h4>
                <p className="text-sm text-muted-foreground">
                  {ingredient.recommendation}
                </p>
              </div>
              <div>
                <h4 className="mb-2 font-medium">Informações de Segurança</h4>
                <p className="text-sm text-muted-foreground">
                  {ingredient.safety}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
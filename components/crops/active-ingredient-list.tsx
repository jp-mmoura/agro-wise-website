"use client";

import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import { AddActiveIngredient } from "./add-active-ingredient";

const crops = [
  { id: "cafe", name: "Café", icon: "☕" },
  { id: "milho", name: "Milho", icon: "🌽" },
  { id: "soja", name: "Soja", icon: "🌿" },
];

interface ActiveIngredient {
  id: string;
  name: string;
  category: string;
  crops: string[];
  description: string;
}

const activeIngredients: ActiveIngredient[] = [
  // Café - Herbicidas
  {
    id: "glyphosate-cafe",
    name: "Glifosato",
    category: "Herbicida",
    crops: ["cafe"],
    description: "Herbicida sistêmico, não seletivo. Usado em pós-emergência das plantas daninhas, com aplicação dirigida.",
  },
  {
    id: "glufosinate",
    name: "Glufosinato de Amônio",
    category: "Herbicida",
    crops: ["cafe"],
    description: "Herbicida de contato, não seletivo. Alternativa ao glifosato, com ação mais rápida.",
  },
  {
    id: "haloxyfop",
    name: "Haloxifope",
    category: "Herbicida",
    crops: ["cafe"],
    description: "Graminicida sistêmico. Específico para controle de gramíneas em pós-emergência.",
  },
  {
    id: "2-4d-cafe",
    name: "2,4-D",
    category: "Herbicida",
    crops: ["cafe"],
    description: "Herbicida seletivo para folhas largas. Usado com muito cuidado em aplicação dirigida.",
  },
  // Café - Inseticidas
  {
    id: "thiamethoxam",
    name: "Tiametoxam",
    category: "Inseticida",
    crops: ["cafe"],
    description: "Neonicotinoide sistêmico. Muito usado via solo ou foliar para controle de bicho-mineiro e cigarras.",
  },
  {
    id: "cyantraniliprole",
    name: "Ciantraniliprole",
    category: "Inseticida",
    crops: ["cafe"],
    description: "Diamida. Excelente para o controle da broca-do-café.",
  },
  // Café - Fungicidas
  {
    id: "copper",
    name: "Cúpricos",
    category: "Fungicida",
    crops: ["cafe"],
    description: "Fungicidas protetores, de amplo espectro. Base do manejo da ferrugem e outras doenças.",
  },
  {
    id: "epoxiconazole-pyraclostrobin",
    name: "Epoxiconazol + Piraclostrobina",
    category: "Fungicida",
    crops: ["cafe"],
    description: "Mistura de Triazol e Estrobilurina. Excelente ação curativa e preventiva contra a ferrugem.",
  },

  // Milho - Herbicidas
  {
    id: "atrazine",
    name: "Atrazina",
    category: "Herbicida",
    crops: ["milho"],
    description: "Herbicida pré e pós-emergente inicial. Base para o controle de folhas largas.",
  },
  {
    id: "glyphosate-milho",
    name: "Glifosato",
    category: "Herbicida",
    crops: ["milho"],
    description: "Usado em pós-emergência em cultivares de milho RR (Roundup Ready).",
  },
  {
    id: "tembotrione",
    name: "Tembotriona / Mesotriona",
    category: "Herbicida",
    crops: ["milho"],
    description: "Herbicidas pós-emergentes para folhas largas e algumas gramíneas.",
  },
  // Milho - Inseticidas
  {
    id: "chlorantraniliprole",
    name: "Clorantraniliprole",
    category: "Inseticida",
    crops: ["milho"],
    description: "Diamida. Padrão ouro para o controle da Lagarta-do-cartucho.",
  },
  {
    id: "lambda-cyhalothrin",
    name: "Lambda-Cialotrina",
    category: "Inseticida",
    crops: ["milho"],
    description: "Piretroide. Ação de choque para o controle de lagartas e percevejos.",
  },
  // Milho - Fungicidas
  {
    id: "pyraclostrobin-epoxiconazole",
    name: "Piraclostrobina + Epoxiconazol",
    category: "Fungicida",
    crops: ["milho"],
    description: "Mistura de Estrobilurina e Triazol. Amplo espectro e efeito fisiológico positivo.",
  },

  // Soja - Herbicidas
  {
    id: "glyphosate-soja",
    name: "Glifosato",
    category: "Herbicida",
    crops: ["soja"],
    description: "Base para o sistema de soja RR (resistente ao Glifosato).",
  },
  {
    id: "2-4d-soja",
    name: "2,4-D",
    category: "Herbicida",
    crops: ["soja"],
    description: "Usado em dessecação pré-plantio e em sojas com tecnologia Enlist®.",
  },
  {
    id: "dicamba",
    name: "Dicamba",
    category: "Herbicida",
    crops: ["soja"],
    description: "Usado em dessecação pré-plantio e em sojas com tecnologia Intacta 2 Xtend®.",
  },
  // Soja - Inseticidas
  {
    id: "thiamethoxam-lambda",
    name: "Tiametoxam + Lambda-Cialotrina",
    category: "Inseticida",
    crops: ["soja"],
    description: "Mistura pronta comum. Efetiva para o controle de percevejos e mosca-branca.",
  },
  {
    id: "imidacloprid-bifenthrin",
    name: "Imidacloprido + Bifentrina",
    category: "Inseticida",
    crops: ["soja"],
    description: "Mistura comum com ação em percevejos e mosca-branca.",
  },
  // Soja - Fungicidas
  {
    id: "mancozeb-soja",
    name: "Mancozeb",
    category: "Fungicida",
    crops: ["soja"],
    description: "Multissítio. Uso obrigatório em misturas nos programas de controle da ferrugem.",
  },
  {
    id: "azoxystrobin-cyproconazole",
    name: "Azoxistrobina + Ciproconazol",
    category: "Fungicida",
    crops: ["soja"],
    description: "Mistura clássica de Estrobilurina e Triazol para controle da ferrugem.",
  },
];

const categories = [
  "Todos",
  "Herbicida",
  "Inseticida",
  "Fungicida",
];

interface ActiveIngredientListProps {
  selectedCrops: string[];
}

export function ActiveIngredientList({ selectedCrops }: ActiveIngredientListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [ingredients, setIngredients] = useState<ActiveIngredient[]>([]);

  useEffect(() => {
    // Carregar ingredientes do localStorage ou usar os padrões
    const savedIngredients = localStorage.getItem("activeIngredients");
    if (savedIngredients) {
      setIngredients(JSON.parse(savedIngredients));
    } else {
      setIngredients(activeIngredients);
      localStorage.setItem("activeIngredients", JSON.stringify(activeIngredients));
    }
  }, []);

  const handleAddIngredient = (newIngredient: ActiveIngredient) => {
    const updatedIngredients = [...ingredients, newIngredient];
    setIngredients(updatedIngredients);
    localStorage.setItem("activeIngredients", JSON.stringify(updatedIngredients));
  };

  const filteredIngredients = ingredients.filter((ingredient) => {
    const matchesSearch = ingredient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || ingredient.category === selectedCategory;
    const matchesCrops =
      selectedCrops.length === 0 ||
      ingredient.crops.some((crop) => selectedCrops.includes(crop));

    return matchesSearch && matchesCategory && matchesCrops;
  });

  return (
    <div className="space-y-4">
      <AddActiveIngredient onAdd={handleAddIngredient} />

      <div className="relative">
        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar princípio ativo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredIngredients.map((ingredient) => (
          <div
            key={ingredient.id}
            className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{ingredient.name}</h3>
                <Badge variant="secondary" className="mt-1">
                  {ingredient.category}
                </Badge>
              </div>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              {ingredient.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {ingredient.crops.map((cropId) => {
                const crop = crops.find((c) => c.id === cropId);
                return (
                  <Badge key={cropId} variant="outline">
                    {crop?.icon} {crop?.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
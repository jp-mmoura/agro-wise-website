"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { AddActiveIngredient } from "@/components/crops/add-active-ingredient";

interface Crop {
  id: string;
  name: string;
  icon: string;
}

interface ActiveIngredient {
  id: string;
  name: string;
  category: string;
  crops: string[];
  description: string;
}

export default function CropsPage() {
  const [crops, setCrops] = useState<Crop[]>([]);
  const [activeIngredients, setActiveIngredients] = useState<ActiveIngredient[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedCrop, setSelectedCrop] = useState("Todos");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar culturas
        const cropsRef = collection(db, "crops");
        const cropsSnapshot = await getDocs(cropsRef);
        const cropsData = cropsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Crop[];
        setCrops(cropsData);

        // Buscar princípios ativos
        const ingredientsRef = collection(db, "activeIngredients");
        const ingredientsSnapshot = await getDocs(ingredientsRef);
        const ingredientsData = ingredientsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ActiveIngredient[];
        setActiveIngredients(ingredientsData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddIngredient = (newIngredient: Omit<ActiveIngredient, "id">) => {
    setActiveIngredients(prev => [{
      id: Date.now().toString(), // Temporário até salvar no Firestore
      ...newIngredient
    }, ...prev]);
  };

  const filteredIngredients = activeIngredients.filter((ingredient) => {
    const matchesSearch = ingredient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || ingredient.category === selectedCategory;
    const matchesCrop =
      selectedCrop === "Todos" || ingredient.crops.includes(selectedCrop);

    return matchesSearch && matchesCategory && matchesCrop;
  });

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <CardTitle>Carregando dados...</CardTitle>
            </div>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">🌱 Culturas e Princípios Ativos</h2>
        <p className="text-muted-foreground">
          Gerencie as culturas e princípios ativos disponíveis na plataforma.
        </p>
        <AddActiveIngredient onAdd={handleAddIngredient} />
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar princípio ativo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex gap-2">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todas as categorias</SelectItem>
                <SelectItem value="herbicida">Herbicida</SelectItem>
                <SelectItem value="inseticida">Inseticida</SelectItem>
                <SelectItem value="fungicida">Fungicida</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedCrop}
              onValueChange={setSelectedCrop}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por cultura" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todas as culturas</SelectItem>
                {crops.map((crop) => (
                  <SelectItem key={crop.id} value={crop.id}>
                    {crop.icon} {crop.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4">
          {filteredIngredients.map((ingredient) => {
            const cropIcons = ingredient.crops
              .map(cropId => crops.find(c => c.id === cropId)?.icon)
              .filter(Boolean)
              .join(" ");

            return (
              <div
                key={ingredient.id}
                className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{ingredient.name}</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <Badge variant="secondary">{ingredient.category}</Badge>
                      <Badge variant="outline">
                        {cropIcons}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {ingredient.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
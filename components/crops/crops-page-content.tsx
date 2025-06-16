"use client";

import { useState } from "react";
import { CropSelector } from "./crop-selector";
import { ActiveIngredientList } from "./active-ingredient-list";

export function CropsPageContent() {
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">🌱 Culturas</h2>
        <p className="text-muted-foreground">
          Selecione as culturas para ver os ingredientes ativos compatíveis.
        </p>
        <CropSelector onCropsChange={setSelectedCrops} />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">🧪 Ingredientes Ativos</h2>
        <p className="text-muted-foreground">
          Ingredientes ativos compatíveis com as culturas selecionadas.
        </p>
        <ActiveIngredientList selectedCrops={selectedCrops} />
      </div>
    </div>
  );
} 
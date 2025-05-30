import { CropSelector } from "@/components/crops/crop-selector";
import { ActiveIngredientList } from "@/components/crops/active-ingredient-list";

export default function CropsPage() {
  return (
    <div className="flex-1 space-y-8 p-4 pt-6 md:p-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Culturas e Princípios Ativos</h2>
        <p className="text-muted-foreground">
          Selecione as culturas para ver os princípios ativos compatíveis
        </p>
      </div>
      
      <div className="space-y-8">
        <CropSelector />
        <ActiveIngredientList />
      </div>
    </div>
  );
}
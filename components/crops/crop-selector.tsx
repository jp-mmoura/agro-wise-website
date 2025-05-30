"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const crops = [
  { id: "cafe", name: "Café", icon: "☕" },
  { id: "milho", name: "Milho", icon: "🌽" },
  { id: "soja", name: "Soja", icon: "🫘" },
  { id: "algodao", name: "Algodão", icon: "🧶" },
  { id: "cana", name: "Cana-de-açúcar", icon: "🎋" },
  { id: "feijao", name: "Feijão", icon: "🫘" },
  { id: "arroz", name: "Arroz", icon: "🍚" },
];

export function CropSelector() {
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleCrop = (cropId: string) => {
    setSelectedCrops((prev) =>
      prev.includes(cropId)
        ? prev.filter((id) => id !== cropId)
        : [...prev, cropId]
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar cultura..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {filteredCrops.map((crop) => (
          <Button
            key={crop.id}
            variant="outline"
            className={cn(
              "h-auto min-h-[80px] w-full flex-col gap-2 p-4",
              selectedCrops.includes(crop.id) &&
                "border-primary bg-primary/5 hover:bg-primary/10"
            )}
            onClick={() => toggleCrop(crop.id)}
          >
            <span className="text-2xl">{crop.icon}</span>
            <span className="text-sm font-medium">{crop.name}</span>
          </Button>
        ))}
      </div>

      {selectedCrops.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCrops.map((cropId) => {
            const crop = crops.find((c) => c.id === cropId);
            return (
              <Badge key={cropId} variant="secondary" className="gap-1">
                {crop?.name}
                <XIcon
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => toggleCrop(cropId)}
                />
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
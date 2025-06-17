"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusIcon, XIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const crops = [
  { id: "cafe", name: "Café", icon: "☕" },
  { id: "milho", name: "Milho", icon: "🌽" },
  { id: "soja", name: "Soja", icon: "🌿" },
];

const categories = ["Herbicida", "Inseticida", "Fungicida"];

interface AddActiveIngredientProps {
  onAdd: (newIngredient: any) => void;
}

export function AddActiveIngredient({ onAdd }: AddActiveIngredientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    crops: [] as string[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Salvar no Firestore
      const ingredientsRef = collection(db, "activeIngredients");
      const docRef = await addDoc(ingredientsRef, {
        ...formData,
        createdAt: new Date().toISOString()
      });

      // Atualizar o estado local com o ID do documento
      onAdd({
        id: docRef.id,
        ...formData
      });

      // Limpar formulário e fechar modal
      setFormData({
        name: "",
        category: "",
        crops: [],
        description: ""
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao adicionar princípio ativo:", error);
    }
  };

  const toggleCrop = (cropId: string) => {
    setFormData(prev => ({
      ...prev,
      crops: prev.crops.includes(cropId)
        ? prev.crops.filter(id => id !== cropId)
        : [...prev.crops, cropId]
    }));
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full mb-4"
        variant="outline"
      >
        <PlusIcon className="mr-2 h-4 w-4" />
        Adicionar Novo Princípio Ativo
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Princípio Ativo</DialogTitle>
            <DialogDescription>
              Preencha os dados do novo princípio ativo abaixo.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Princípio Ativo</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Glifosato"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Culturas Compatíveis</Label>
              <div className="flex flex-wrap gap-2">
                {crops.map((crop) => (
                  <div key={crop.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={crop.id}
                      checked={formData.crops.includes(crop.id)}
                      onCheckedChange={() => toggleCrop(crop.id)}
                    />
                    <Label htmlFor={crop.id} className="flex items-center gap-1">
                      {crop.icon} {crop.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descreva o princípio ativo e seu uso"
                required
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                Adicionar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
} 
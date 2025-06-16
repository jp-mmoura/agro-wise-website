"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

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
}

export function ProductForm() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [activeIngredients, setActiveIngredients] = useState<ActiveIngredient[]>([]);
  const [selectedCrop, setSelectedCrop] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    manufacturer: "",
    category: "",
    crop: "",
    activeIngredient: "",
    description: "",
    dosage: "",
    applicationMethod: "",
    safetyPeriod: "",
    price: ""
  });

  const formatPrice = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, "");
    
    // Converte para número e divide por 100 para ter os centavos
    const amount = numbers ? parseInt(numbers) / 100 : 0;
    
    // Formata o número como moeda
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPrice(e.target.value);
    setFormData(prev => ({ ...prev, price: formattedValue }));
  };

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
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const productsRef = collection(db, "products");
      await addDoc(productsRef, {
        ...formData,
        price: parseFloat(formData.price.replace(/[^\d,-]/g, "").replace(",", ".")),
        createdAt: new Date().toISOString()
      });
      
      // Limpar formulário e fechar modal
      setFormData({
        name: "",
        manufacturer: "",
        category: "",
        crop: "",
        activeIngredient: "",
        description: "",
        dosage: "",
        applicationMethod: "",
        safetyPeriod: "",
        price: ""
      });
      setIsOpen(false);
      
      // Recarregar a página para atualizar a lista
      window.location.reload();
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleCropChange = (value: string) => {
    setSelectedCrop(value);
    setFormData(prev => ({ ...prev, crop: value }));
  };

  const filteredActiveIngredients = activeIngredients.filter(
    ingredient => ingredient.crops.includes(selectedCrop)
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Adicionar Novo Produto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Adicionar Novo Produto</DialogTitle>
          <DialogDescription>
            {step === 1 ? "Informações básicas do produto" : "Detalhes adicionais do produto"}
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center mb-6">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step === 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 1 ? 'border-primary' : 'border-muted'}`}>
                1
              </div>
              <span className="ml-2">Básico</span>
            </div>
            <div className="w-12 h-0.5 bg-muted"></div>
            <div className={`flex items-center ${step === 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step === 2 ? 'border-primary' : 'border-muted'}`}>
                2
              </div>
              <span className="ml-2">Detalhes</span>
            </div>
          </div>
        </div>

        <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-4">
          {step === 1 ? (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Produto</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="manufacturer">Fabricante</Label>
                  <Input
                    id="manufacturer"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData(prev => ({ ...prev, manufacturer: e.target.value }))}
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
                      <SelectItem value="herbicida">Herbicida</SelectItem>
                      <SelectItem value="inseticida">Inseticida</SelectItem>
                      <SelectItem value="fungicida">Fungicida</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Preço</Label>
                  <Input
                    id="price"
                    type="text"
                    value={formData.price}
                    onChange={handlePriceChange}
                    placeholder="R$ 0,00"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Próximo
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="crop">Cultura</Label>
                  <Select
                    value={formData.crop}
                    onValueChange={handleCropChange}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma cultura" />
                    </SelectTrigger>
                    <SelectContent>
                      {crops.map((crop) => (
                        <SelectItem key={crop.id} value={crop.id}>
                          {crop.icon} {crop.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activeIngredient">Princípio Ativo</Label>
                  <Select
                    value={formData.activeIngredient}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, activeIngredient: value }))}
                    required
                    disabled={!selectedCrop}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um princípio ativo" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredActiveIngredients.map((ingredient) => (
                        <SelectItem key={ingredient.id} value={ingredient.name}>
                          {ingredient.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dosage">Dosagem</Label>
                  <Input
                    id="dosage"
                    value={formData.dosage}
                    onChange={(e) => setFormData(prev => ({ ...prev, dosage: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applicationMethod">Método de Aplicação</Label>
                  <Input
                    id="applicationMethod"
                    value={formData.applicationMethod}
                    onChange={(e) => setFormData(prev => ({ ...prev, applicationMethod: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="safetyPeriod">Período de Carência</Label>
                  <Input
                    id="safetyPeriod"
                    value={formData.safetyPeriod}
                    onChange={(e) => setFormData(prev => ({ ...prev, safetyPeriod: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                  Voltar
                </Button>
                <Button type="submit" className="flex-1">
                  Salvar
                </Button>
              </div>
            </>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
}
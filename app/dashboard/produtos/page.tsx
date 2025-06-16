"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, addDoc, doc, deleteDoc } from "firebase/firestore";
import { ProductForm } from "@/components/products/product-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Product {
  id: string;
  name: string;
  manufacturer: string;
  category: string;
  crop: string;
  activeIngredient: string;
  description: string;
  dosage: string;
  applicationMethod: string;
  safetyPeriod: string;
  price: number;
}

interface Crop {
  id: string;
  name: string;
  icon: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedCrop, setSelectedCrop] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar produtos
        const productsRef = collection(db, "products");
        const q = query(productsRef, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const productsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsList);

        // Buscar culturas
        const cropsRef = collection(db, "crops");
        const cropsSnapshot = await getDocs(cropsRef);
        const cropsData = cropsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Crop[];
        setCrops(cropsData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddProduct = async (newProduct: Omit<Product, "id">) => {
    try {
      const productsRef = collection(db, "products");
      const docRef = await addDoc(productsRef, newProduct);
      setProducts(prev => [{
        id: docRef.id,
        ...newProduct
      }, ...prev]);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newProduct = {
        ...formData,
        price: parseFloat(formData.price.replace(/[^\d,-]/g, "").replace(",", ".")),
        createdAt: new Date().toISOString()
      };

      const productsRef = collection(db, "products");
      const docRef = await addDoc(productsRef, newProduct);
      setProducts(prev => [{
        id: docRef.id,
        ...newProduct
      }, ...prev]);

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
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(prev => prev.filter(product => product.id !== id));
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(price);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesCrop =
      selectedCrop === "Todos" || product.crop === selectedCrop;

    return matchesSearch && matchesCategory && matchesCrop;
  });

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <h2 className="text-2xl font-bold">Carregando produtos...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-8 py-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">🧪 Produtos</h2>
        <p className="text-muted-foreground">
          Gerencie seus produtos e princípios ativos.
        </p>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Adicionar Produto</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Novo Produto</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo produto abaixo.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  placeholder="R$ 0,00"
                  required
                />
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

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar produto..."
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
          {filteredProducts.map((product) => {
            const crop = crops.find((c) => c.id === product.crop);
            return (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>
                    {product.manufacturer} • {product.category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Preço:</span> {formatPrice(product.price)}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Dosagem:</span> {product.dosage}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Método de Aplicação:</span> {product.applicationMethod}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Período de Carência:</span> {product.safetyPeriod}
                    </p>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
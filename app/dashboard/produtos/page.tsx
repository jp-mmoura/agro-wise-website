"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { ProductForm } from "@/components/products/product-form";

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
  createdAt: string;
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
        <ProductForm onAdd={handleAddProduct} />
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
              <div
                key={product.id}
                className="rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      <Badge variant="secondary">{product.category}</Badge>
                      <Badge variant="outline">
                        {crop?.icon} {crop?.name}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {product.manufacturer}
                  </p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {product.description}
                </p>
                <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Dosagem:</span>{" "}
                    {product.dosage}
                  </div>
                  <div>
                    <span className="font-medium">Aplicação:</span>{" "}
                    {product.applicationMethod}
                  </div>
                  <div>
                    <span className="font-medium">Carência:</span>{" "}
                    {product.safetyPeriod}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, writeBatch } from "firebase/firestore";

const crops = [
  {
    id: "cafe",
    name: "Café",
    icon: "☕",
    description: "Cultura do café, uma das principais commodities agrícolas do Brasil."
  },
  {
    id: "milho",
    name: "Milho",
    icon: "🌽",
    description: "Cultura do milho, importante para alimentação e produção de ração."
  },
  {
    id: "soja",
    name: "Soja",
    icon: "🌿",
    description: "Cultura da soja, principal commodity agrícola brasileira."
  }
];

const activeIngredients = [
  {
    name: "Glifosato",
    category: "herbicida",
    crops: ["cafe", "milho", "soja"],
    description: "Herbicida sistêmico não seletivo, usado para controle de plantas daninhas."
  },
  {
    name: "2,4-D",
    category: "herbicida",
    crops: ["milho", "soja"],
    description: "Herbicida seletivo para controle de plantas daninhas de folha larga."
  },
  {
    name: "Imidacloprido",
    category: "inseticida",
    crops: ["cafe", "milho", "soja"],
    description: "Inseticida sistêmico do grupo dos neonicotinoides."
  },
  {
    name: "Tiametoxam",
    category: "inseticida",
    crops: ["cafe", "milho", "soja"],
    description: "Inseticida sistêmico para controle de pragas sugadoras e mastigadoras."
  },
  {
    name: "Mancozebe",
    category: "fungicida",
    crops: ["cafe", "milho", "soja"],
    description: "Fungicida protetor para controle de doenças foliares."
  },
  {
    name: "Azoxistrobina",
    category: "fungicida",
    crops: ["cafe", "milho", "soja"],
    description: "Fungicida sistêmico para controle de doenças foliares."
  },
  {
    name: "Atrazina",
    category: "herbicida",
    crops: ["milho"],
    description: "Herbicida seletivo para controle de plantas daninhas em milho."
  },
  {
    name: "Fipronil",
    category: "inseticida",
    crops: ["cafe", "milho", "soja"],
    description: "Inseticida de contato e ingestão para controle de pragas."
  },
  {
    name: "Ciproconazol",
    category: "fungicida",
    crops: ["cafe", "milho", "soja"],
    description: "Fungicida sistêmico para controle de doenças foliares."
  },
  {
    name: "Clorpirifós",
    category: "inseticida",
    crops: ["cafe", "milho", "soja"],
    description: "Inseticida organofosforado para controle de pragas."
  }
];

export default function MigratePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);

  const checkIfDataExists = async () => {
    try {
      const cropsRef = collection(db, "crops");
      const activeIngredientsRef = collection(db, "activeIngredients");
      
      const [cropsSnapshot, ingredientsSnapshot] = await Promise.all([
        getDocs(cropsRef),
        getDocs(activeIngredientsRef)
      ]);

      return {
        hasCrops: !cropsSnapshot.empty,
        hasIngredients: !ingredientsSnapshot.empty
      };
    } catch (error) {
      console.error("Erro ao verificar dados:", error);
      return { hasCrops: false, hasIngredients: false };
    }
  };

  const handleMigrate = async () => {
    setIsLoading(true);
    setStatus(null);

    try {
      // Verificar se já existem dados
      const { hasCrops, hasIngredients } = await checkIfDataExists();
      
      if (hasCrops || hasIngredients) {
        setStatus({
          type: "error",
          message: "Dados já existem no banco. Não é possível fazer a migração novamente."
        });
        return;
      }

      // Usar batch write para garantir atomicidade
      const batch = writeBatch(db);

      // Migrar culturas
      setStatus({ type: "info", message: "Migrando culturas..." });
      const cropsRef = collection(db, "crops");
      for (const crop of crops) {
        const docRef = doc(cropsRef);
        batch.set(docRef, crop);
      }

      // Migrar princípios ativos
      setStatus({ type: "info", message: "Migrando princípios ativos..." });
      const activeIngredientsRef = collection(db, "activeIngredients");
      for (const ingredient of activeIngredients) {
        const docRef = doc(activeIngredientsRef);
        batch.set(docRef, ingredient);
      }

      // Commit todas as operações
      await batch.commit();

      setStatus({
        type: "success",
        message: "Migração concluída com sucesso! Você pode remover esta página agora."
      });
    } catch (error) {
      console.error("Erro durante a migração:", error);
      setStatus({
        type: "error",
        message: "Erro durante a migração. Por favor, tente novamente."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Migração de Dados</CardTitle>
          <CardDescription>
            Esta página é usada para migrar os dados iniciais para o Firestore.
            Após a migração bem-sucedida, você pode removê-la.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-medium">Dados a serem migrados:</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>{crops.length} culturas</li>
              <li>{activeIngredients.length} princípios ativos</li>
            </ul>
          </div>

          {status && (
            <div
              className={`p-4 rounded-lg ${
                status.type === "success"
                  ? "bg-green-100 text-green-800"
                  : status.type === "error"
                  ? "bg-red-100 text-red-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {status.message}
            </div>
          )}

          <Button
            onClick={handleMigrate}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? "Migrando..." : "Iniciar Migração"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
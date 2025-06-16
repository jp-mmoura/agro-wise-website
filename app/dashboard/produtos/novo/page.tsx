"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function NovoProdutoPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    preco: "",
    descricao: "",
    imagem: "",
    estoque: "",
    unidade: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const produtosRef = collection(db, "produtos");
      await addDoc(produtosRef, {
        ...formData,
        preco: parseFloat(formData.preco),
        estoque: parseInt(formData.estoque),
        createdAt: new Date().toISOString()
      });
      
      // Limpar formulário
      setFormData({
        nome: "",
        categoria: "",
        preco: "",
        descricao: "",
        imagem: "",
        estoque: "",
        unidade: ""
      });

      alert("Produto cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar produto:", error);
      alert("Erro ao cadastrar produto. Tente novamente.");
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Novo Produto</CardTitle>
          <CardDescription>
            {step === 1 ? "Informações básicas do produto" : "Detalhes adicionais do produto"}
          </CardDescription>
        </CardHeader>
        <CardContent>
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

          <form onSubmit={step === 1 ? handleNext : handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome do Produto</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoria">Categoria</Label>
                    <Select
                      value={formData.categoria}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, categoria: value }))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fertilizantes">Fertilizantes</SelectItem>
                        <SelectItem value="pesticidas">Pesticidas</SelectItem>
                        <SelectItem value="sementes">Sementes</SelectItem>
                        <SelectItem value="equipamentos">Equipamentos</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="preco">Preço (R$)</Label>
                    <Input
                      id="preco"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.preco}
                      onChange={(e) => setFormData(prev => ({ ...prev, preco: e.target.value }))}
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="estoque">Estoque</Label>
                      <Input
                        id="estoque"
                        type="number"
                        min="0"
                        value={formData.estoque}
                        onChange={(e) => setFormData(prev => ({ ...prev, estoque: e.target.value }))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="unidade">Unidade de Medida</Label>
                      <Select
                        value={formData.unidade}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, unidade: value }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a unidade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="kg">Quilograma (kg)</SelectItem>
                          <SelectItem value="l">Litro (L)</SelectItem>
                          <SelectItem value="un">Unidade</SelectItem>
                          <SelectItem value="sc">Saca</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição</Label>
                    <Textarea
                      id="descricao"
                      value={formData.descricao}
                      onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imagem">URL da Imagem</Label>
                    <Input
                      id="imagem"
                      type="url"
                      value={formData.imagem}
                      onChange={(e) => setFormData(prev => ({ ...prev, imagem: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
                    Voltar
                  </Button>
                  <Button type="submit" className="flex-1">
                    Cadastrar Produto
                  </Button>
                </div>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
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

export default function SojaColetaPage() {
  const [formData, setFormData] = useState({
    data: "",
    area: "",
    variedade: "",
    estagio: "",
    pragas: "",
    doencas: "",
    observacoes: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const coletasRef = collection(db, "coletas");
      await addDoc(coletasRef, {
        ...formData,
        cultura: "soja",
        createdAt: new Date().toISOString()
      });
      
      // Limpar formulário
      setFormData({
        data: "",
        area: "",
        variedade: "",
        estagio: "",
        pragas: "",
        doencas: "",
        observacoes: ""
      });

      alert("Coleta registrada com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar coleta:", error);
      alert("Erro ao registrar coleta. Tente novamente.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>🌿 Coleta de Dados - Soja</CardTitle>
          <CardDescription>
            Registre as informações da sua lavoura de soja
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="data">Data da Coleta</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData(prev => ({ ...prev, data: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="area">Área (ha)</Label>
                <Input
                  id="area"
                  type="number"
                  step="0.01"
                  value={formData.area}
                  onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="variedade">Variedade</Label>
                <Select
                  value={formData.variedade}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, variedade: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a variedade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Convencional">Convencional</SelectItem>
                    <SelectItem value="RR">RR</SelectItem>
                    <SelectItem value="Intacta">Intacta</SelectItem>
                    <SelectItem value="IPRO">IPRO</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estagio">Estágio Fenológico</Label>
                <Select
                  value={formData.estagio}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, estagio: value }))}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o estágio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Germinação">Germinação</SelectItem>
                    <SelectItem value="Vegetativo">Vegetativo</SelectItem>
                    <SelectItem value="Floração">Floração</SelectItem>
                    <SelectItem value="Formação de Vagens">Formação de Vagens</SelectItem>
                    <SelectItem value="Enchimento de Grãos">Enchimento de Grãos</SelectItem>
                    <SelectItem value="Maturação">Maturação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="pragas">Pragas Observadas</Label>
              <Textarea
                id="pragas"
                value={formData.pragas}
                onChange={(e) => setFormData(prev => ({ ...prev, pragas: e.target.value }))}
                placeholder="Descreva as pragas encontradas..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doencas">Doenças Observadas</Label>
              <Textarea
                id="doencas"
                value={formData.doencas}
                onChange={(e) => setFormData(prev => ({ ...prev, doencas: e.target.value }))}
                placeholder="Descreva as doenças encontradas..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações Gerais</Label>
              <Textarea
                id="observacoes"
                value={formData.observacoes}
                onChange={(e) => setFormData(prev => ({ ...prev, observacoes: e.target.value }))}
                placeholder="Adicione observações relevantes..."
              />
            </div>

            <Button type="submit" className="w-full">
              Registrar Coleta
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
} 
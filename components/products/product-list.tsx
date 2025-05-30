"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Dados mockados para exemplo
const products = [
  {
    id: 1,
    name: "Herbicida Premium",
    manufacturer: "AgroTech",
    category: "Herbicida",
    registrationNumber: "123456",
    expirationDate: new Date("2025-12-31"),
    status: "Ativo",
  },
  {
    id: 2,
    name: "Inseticida Plus",
    manufacturer: "BioDefense",
    category: "Inseticida",
    registrationNumber: "789012",
    expirationDate: new Date("2024-06-30"),
    status: "Rascunho",
  },
];

export function ProductList() {
  const handleEdit = (id: number) => {
    console.log("Editar produto", id);
  };

  const handleDelete = (id: number) => {
    console.log("Excluir produto", id);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Fabricante</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Nº Registro</TableHead>
            <TableHead>Validade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[70px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.manufacturer}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.registrationNumber}</TableCell>
              <TableCell>
                {format(product.expirationDate, "dd/MM/yyyy", { locale: ptBR })}
              </TableCell>
              <TableCell>{product.status}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontalIcon className="h-4 w-4" />
                      <span className="sr-only">Abrir menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleEdit(product.id)}>
                      <PencilIcon className="mr-2 h-4 w-4" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => handleDelete(product.id)}
                    >
                      <TrashIcon className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
import { ProductList } from "@/components/products/product-list";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Produtos Agrícolas</h2>
        <Button asChild>
          <Link href="/dashboard/produtos/novo">
            <PlusIcon className="mr-2 h-4 w-4" />
            Novo Produto
          </Link>
        </Button>
      </div>
      <ProductList />
    </div>
  );
}
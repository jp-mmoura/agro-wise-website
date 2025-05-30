import { ProductForm } from "@/components/products/product-form";

export default function NewProductPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Novo Produto</h2>
      </div>
      <ProductForm />
    </div>
  );
}
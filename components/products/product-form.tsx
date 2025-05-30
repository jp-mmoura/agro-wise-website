"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { CalendarIcon, Loader2Icon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const productFormSchema = z.object({
  name: z.string().min(1, "Nome do produto é obrigatório"),
  manufacturer: z.string().min(1, "Fabricante é obrigatório"),
  category: z.string({
    required_error: "Selecione uma categoria",
  }),
  activeIngredient: z.string().min(1, "Princípio ativo é obrigatório"),
  formulation: z.string().min(1, "Concentração/Formulação é obrigatória"),
  registrationNumber: z.string().min(1, "Número de registro é obrigatório"),
  expirationDate: z.date({
    required_error: "Data de validade é obrigatória",
  }),
  storageRequirements: z.string().min(1, "Requisitos de armazenamento são obrigatórios"),
  instructions: z.string().min(1, "Instruções de uso são obrigatórias"),
  isDraft: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productFormSchema>;

export function ProductForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      isDraft: false,
    },
  });

  async function onSubmit(data: ProductFormValues) {
    setIsLoading(true);
    try {
      // Aqui seria implementada a lógica de salvamento
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Produto salvo com sucesso",
        description: data.isDraft 
          ? "O produto foi salvo como rascunho."
          : "O produto foi cadastrado com sucesso.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao salvar produto",
        description: "Ocorreu um erro ao tentar salvar o produto. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Produto</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="manufacturer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fabricante</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do fabricante" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="herbicida">Herbicida</SelectItem>
                    <SelectItem value="inseticida">Inseticida</SelectItem>
                    <SelectItem value="fungicida">Fungicida</SelectItem>
                    <SelectItem value="fertilizante">Fertilizante</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="activeIngredient"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Princípio Ativo</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o princípio ativo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="formulation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Concentração/Formulação</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 500 g/L" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registrationNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Registro</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o número de registro" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="expirationDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Validade</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="storageRequirements"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requisitos de Armazenamento</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva os requisitos de armazenamento"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="instructions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instruções de Uso</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva as instruções de uso"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.setValue("isDraft", true)}
            disabled={isLoading}
          >
            Salvar como Rascunho
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Salvando..." : "Salvar Produto"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
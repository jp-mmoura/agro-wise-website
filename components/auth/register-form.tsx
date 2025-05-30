"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const registerFormSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: "Nome completo é obrigatório" })
      .min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
    email: z
      .string()
      .min(1, { message: "Email é obrigatório" })
      .email({ message: "Email inválido" }),
    password: z
      .string()
      .min(1, { message: "Senha é obrigatória" })
      .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }),
    confirmPassword: z.string().min(1, { message: "Confirme sua senha" }),
    accountType: z.string({
      required_error: "Selecione um tipo de conta",
    }),
    termsAccepted: z.literal(true, {
      errorMap: () => ({ message: "Você deve aceitar os termos de uso" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  // Inicializa o formulário com valores padrão
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
  });

  async function onSubmit(data: RegisterFormValues) {
    setIsLoading(true);
    
    // Simula uma requisição de registro
    try {
      // Aqui seria implementada a lógica real de registro
      console.log("Register data:", data);
      
      // Simula um pequeno delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Conta criada com sucesso",
        description: "Verifique seu email para confirmar seu cadastro.",
      });
      
      // Redireciona para o login
      router.push("/auth/login");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao criar conta",
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input
                  placeholder="João Silva"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="exemplo@email.com"
                  type="email"
                  autoComplete="email"
                  disabled={isLoading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      disabled={isLoading}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={togglePasswordVisibility}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4\" aria-hidden="true" />
                      ) : (
                        <EyeIcon className="h-4 w-4\" aria-hidden="true" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Ocultar senha" : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmar senha</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="••••••••"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      disabled={isLoading}
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={toggleConfirmPasswordVisibility}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOffIcon className="h-4 w-4\" aria-hidden="true" />
                      ) : (
                        <EyeIcon className="h-4 w-4\" aria-hidden="true" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="accountType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de conta</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isLoading}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de conta" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="agricultor">Agricultor</SelectItem>
                  <SelectItem value="agronomo">Agrônomo</SelectItem>
                  <SelectItem value="administrador">Administrador</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isLoading}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-medium">
                  Li e aceito os{" "}
                  <Link
                    href="/terms"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    termos de uso
                  </Link>
                </FormLabel>
                <FormDescription>
                  Você deve aceitar os termos para criar uma conta.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Criando conta..." : "Criar conta"}
        </Button>
        <div className="mt-4 text-center text-sm">
          Já tem uma conta?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Faça login
          </Link>
        </div>
      </form>
    </Form>
  );
}
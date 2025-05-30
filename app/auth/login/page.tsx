import { LoginForm } from '@/components/auth/login-form';
import { Logo } from '@/components/logo';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Lado esquerdo - Banner */}
      <div className="relative hidden flex-1 flex-col bg-gradient-to-b from-green-600 to-green-800 p-10 text-white dark:from-green-800 dark:to-green-950 md:flex">
        <div className="flex items-center gap-2">
          <Logo className="h-10 w-10" />
          <h1 className="text-2xl font-bold">AgroWise</h1>
        </div>
        <div className="relative mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;O AgroWise transformou a maneira como gerenciamos nossa fazenda, 
              aumentando nossa produtividade e reduzindo custos.&rdquo;
            </p>
            <footer className="text-sm">Carlos Silva, Produtor Rural</footer>
          </blockquote>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-green-900/50 to-transparent" />
      </div>
      
      {/* Lado direito - Formulário */}
      <div className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8 md:p-12">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[400px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="mb-4 flex justify-center md:hidden">
              <Logo className="h-10 w-10" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Bem-vindo de volta</h1>
            <p className="text-sm text-muted-foreground">
              Digite seus dados para acessar sua conta
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
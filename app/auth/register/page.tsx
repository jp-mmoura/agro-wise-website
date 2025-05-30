import { RegisterForm } from '@/components/auth/register-form';
import { Logo } from '@/components/logo';

export default function RegisterPage() {
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
              &ldquo;Junte-se a milhares de profissionais do agronegócio que 
              já utilizam o AgroWise para otimizar suas operações.&rdquo;
            </p>
            <footer className="text-sm">AgroWise - Gestão Agrícola Inteligente</footer>
          </blockquote>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-green-900/50 to-transparent" />
      </div>
      
      {/* Lado direito - Formulário */}
      <div className="flex flex-1 flex-col items-center justify-center p-4 sm:p-8 md:p-12">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] md:w-[450px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="mb-4 flex justify-center md:hidden">
              <Logo className="h-10 w-10" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Crie sua conta</h1>
            <p className="text-sm text-muted-foreground">
              Preencha os dados abaixo para começar a usar o AgroWise
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
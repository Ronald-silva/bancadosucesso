import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import logoImg from '@/assets/logo-banca-sucesso.jpg';

const authSchema = z.object({
  email: z.string().email('Email inválido').max(255),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').max(100),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, user, isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!authLoading && user) {
      if (isAdmin) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    }
  }, [user, isAdmin, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      toast({
        title: 'Erro de validação',
        description: validation.error.errors[0].message,
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: 'Erro de login',
              description: 'Email ou senha incorretos.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Erro',
              description: error.message,
              variant: 'destructive',
            });
          }
          return;
        }
        toast({
          title: 'Bem-vindo!',
          description: 'Login realizado com sucesso.',
        });
        // useEffect will handle redirect based on isAdmin
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              title: 'Erro',
              description: 'Este email já está cadastrado.',
              variant: 'destructive',
            });
          } else {
            toast({
              title: 'Erro',
              description: error.message,
              variant: 'destructive',
            });
          }
          return;
        }
        toast({
          title: 'Conta criada!',
          description: 'Sua conta foi criada com sucesso.',
        });
        // useEffect will handle redirect
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="bg-background rounded-xl shadow-xl max-w-md w-full p-8">
        <div className="text-center mb-8">
          <Link to="/">
            <img
              src={logoImg}
              alt="Banca do Sucesso"
              className="h-16 w-auto mx-auto rounded-lg mb-4"
            />
          </Link>
          <h1 className="text-2xl font-bold text-foreground">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin
              ? 'Acesse sua conta de administrador'
              : 'Crie uma conta para gerenciar produtos'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="mt-1"
              required
            />
          </div>

          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1"
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
            size="lg"
          >
            {isLoading
              ? 'Carregando...'
              : isLogin
              ? 'Entrar'
              : 'Criar Conta'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
          >
            {isLogin
              ? 'Não tem conta? Criar conta'
              : 'Já tem conta? Entrar'}
          </button>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-muted-foreground hover:text-foreground text-sm">
            Voltar para o site
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;

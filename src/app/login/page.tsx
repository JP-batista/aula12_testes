"use client"; // Obrigatório para usar "useState" e "useRouter"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        router.push('/home');
      } else {
        const data = await response.json();
        setErro(data.erro || 'Erro ao fazer login');
      }
    } catch (err) {
      setErro('Não foi possível conectar ao servidor');
    }
  };

  const isButtonDisabled = !email || !senha;

  return (
    // Fundo gradiente para claro e escuro
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24 bg-gradient-to-r from-gray-50 to-gray-200 dark:from-black dark:to-neutral-900">
      <div className="bg-white dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-10 rounded-2xl shadow-2xl w-full max-w-sm transform hover:scale-[1.01] transition duration-300">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-gray-100">
          Bem-vindo! 🚀
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100 transition duration-150"
              required
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-gray-100 transition duration-150"
              required
              placeholder="••••••••"
            />
          </div>

          {erro && (
            <p className="text-sm text-red-600 dark:text-red-300 font-medium text-center bg-red-50 dark:bg-red-950 p-2 rounded-md border border-red-200 dark:border-red-800">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={isButtonDisabled}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 dark:disabled:bg-gray-700 dark:disabled:text-gray-400 transition duration-300 ease-in-out"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
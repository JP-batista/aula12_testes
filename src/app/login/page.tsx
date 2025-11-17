"use client";

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
        body: JSON.stringify({
          email,
          password: senha
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/home');
      } else {
        setErro(data.message || 'Erro ao fazer login');
      }
    } catch (err) {
      setErro('Não foi possível conectar ao servidor');
    }
  };

  const isButtonDisabled = !email || !senha;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24 bg-gradient-to-r from-gray-50 to-gray-200 dark:from-black dark:to-neutral-900">
      <div className="bg-white dark:bg-neutral-900 border dark:border-neutral-800 p-10 rounded-2xl shadow-2xl w-full max-w-sm">
        <h1 className="text-3xl font-extrabold mb-8 text-center">
          Bem-vindo! 🚀
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">

          <div>
            <label className="block mb-1">E-mail</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 rounded border"
            />
          </div>

          <div>
            <label className="block mb-1">Senha</label>
            <input
              name="password"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full p-2 rounded border"
            />
          </div>

          {erro && (
            <p className="text-red-600 text-center">{erro}</p>
          )}

          <button
            type="submit"
            disabled={isButtonDisabled}
            className="w-full p-3 rounded bg-indigo-600 text-white disabled:bg-gray-500"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}

"use client"; // Obrigatório para usar "useState" e "useRouter"

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState<string | null>(null); // Para a mensagem de erro 
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null); // Limpa erros anteriores

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        // 1. Sucesso: Redireciona para /home 
        router.push('/home');
      } else {
        // 2. Falha: Exibe mensagem de erro 
        const data = await response.json();
        setErro(data.erro || 'Erro ao fazer login');
      }
    } catch (err) {
      setErro('Não foi possível conectar ao servidor');
    }
  };

  // 3. Lógica do botão desabilitado 
  const isButtonDisabled = !email || !senha;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24 bg-gradient-to-r from-gray-50 to-gray-200">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-sm transform hover:scale-[1.01] transition duration-300">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900">
          Bem-vindo! 🚀
        </h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 transition duration-150"
              required // Validação HTML para campos obrigatórios 
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 transition duration-150"
              required // Validação HTML para campos obrigatórios 
              placeholder="••••••••"
            />
          </div>

          {/* 4. Exibição da mensagem de erro */}
          {erro && (
            <p className="text-sm text-red-600 font-medium text-center bg-red-50 p-2 rounded-md border border-red-200">
              {erro}
            </p>
          )}

          <button
            type="submit"
            disabled={isButtonDisabled} // Botão desabilitado 
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-400 transition duration-300 ease-in-out"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
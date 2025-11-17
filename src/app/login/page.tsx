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
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center text-black">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              E-mail 
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
              required // Validação HTML para campos obrigatórios 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Senha 
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
              required // Validação HTML para campos obrigatórios 
            />
          </div>

          {/* 4. Exibição da mensagem de erro */}
          {erro && (
            <p className="text-sm text-red-600 text-center">{erro}</p>
          )}

          <button
            type="submit"
            disabled={isButtonDisabled} // Botão desabilitado 
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400"
          >
            Entrar 
          </button>
        </form>
      </div>
    </main>
  );
}
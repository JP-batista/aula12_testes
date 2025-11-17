"use client"; // Necessário para usar hooks como useRouter

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleLogout = () => {
    // Aqui você pode adicionar lógica de logout, como limpar cookies/tokens.
    // Por enquanto, apenas redirecionamos.
    router.push('/'); 
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24 bg-gradient-to-br from-indigo-50 to-purple-100">
      
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-lg text-center transform hover:scale-[1.01] transition duration-300 border-t-4 border-indigo-600">
        
        {/* Ícone de Sucesso */}
        <div className="mb-6">
          <svg 
            className="w-16 h-16 text-indigo-600 mx-auto animate-bounce"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
          Login Efetuado com Sucesso! 🎉
        </h1>
        
        <p className="mt-4 text-lg text-gray-600 mb-8">
          Você está agora na Área Restrita da Home Page.
        </p>

        {/* Botão de Logout/Retorno */}
        <button
          onClick={handleLogout}
          className="py-3 px-8 rounded-full shadow-lg text-base font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          Sair e Voltar para o Login
        </button>
      </div>
      
    </main>
  );
}
"use client"; // Necessário para usar hooks como useRouter

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  const handleLogout = () => {
    router.push('/'); 
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24 bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-black dark:to-indigo-950">
      
      <div className="bg-white dark:bg-neutral-900 border border-transparent dark:border-neutral-800 p-12 rounded-3xl shadow-2xl w-full max-w-lg text-center transform hover:scale-[1.01] transition duration-300 border-t-4 border-indigo-600 dark:border-indigo-500">

        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-3">
          Login Efetuado com Sucesso! 🎉
        </h1>
        
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 mb-8">
          Você está agora na Área Restrita da Home Page.
        </p>

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
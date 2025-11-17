import { redirect } from 'next/navigation';

export default function Page() {
  // Redireciona o usuário da raiz (/) para a página de login
  redirect('/login');
}
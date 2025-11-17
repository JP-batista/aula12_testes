import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient'; // Importa o cliente que criamos

export async function POST(request: Request) {
  try {
    // 1. Pega email e senha do corpo da requisição
    const { email, senha } = await request.json();

    // 2. Consulta o banco de dados 
    const { data, error } = await supabase
      .from('usuarios') // Nome da sua tabela
      .select('*')
      .eq('email', email) // Filtra pelo email
      .single(); // Espera apenas um resultado

    // 3. Se o usuário não for encontrado
    if (error || !data) {
      console.log('Usuário não encontrado:', email);
      return NextResponse.json(
        { erro: 'Credenciais inválidas' }, // Mensagem de erro 
        { status: 401 } // Retorna status 401 
      );
    }

    // 4. Valida a senha 
    if (data.senha !== senha) {
      console.log('Senha incorreta para:', email);
      return NextResponse.json(
        { erro: 'Credenciais inválidas' }, // Mensagem de erro 
        { status: 401 } // Retorna status 401 
      );
    }

    // 5. Login com sucesso
    return NextResponse.json(
      { sucesso: 'Login efetuado com sucesso!' }, // Mensagem de sucesso 
      { status: 200 } // Retorna status 200 
    );

  } catch (err) {
    console.error(err);
    return NextResponse.json({ erro: 'Erro interno do servidor' }, { status: 500 });
  }
}
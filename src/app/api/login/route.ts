import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // LOG PARA DEBUG
    console.log('REQ BODY =>', { email, password });

    const { data, error } = await supabase
      .from('usuarios')
      .select('*')
      .eq('email', email)
      .eq('senha', password)
      .single();

    // LOG PARA DEBUG
    console.log('SUPABASE RES =>', { data, error });

    if (!data || error) {
      return NextResponse.json(
        { message: 'Credenciais inválidas' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: 'Login efetuado com sucesso!' },
      { status: 200 }
    );

  } catch (err) {
    console.error('CATCH ERRO =>', err);
    return NextResponse.json(
      { message: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

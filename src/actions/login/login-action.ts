'use server';

import { createLoginSession, verifyPassword } from '@/lib/login/manager-login';
import { asyncDelay } from '@/utils/async-delay';
import { redirect } from 'next/navigation';

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(state: LoginActionState, formData: FormData) {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));
  if (!allowLogin) {
    return {
      username: '',
      error: 'Login desativado',
    };
  }
  await asyncDelay(3000);

  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Dados inválidos',
    };
  }

  // Dados que o usuário digitou no form
  const username = formData.get('username')?.toString() || '';
  const password = formData.get('password')?.toString() || '';

  if (!username || !password) {
    return {
      username,
      error: 'Digite o usuário e a senha',
    };
  }

  //Chegaria se o usuário existe na base de dados
  const isUsernameValid = username === process.env.LOGIN_USER;
  const isPasswordValid = await verifyPassword(
    password,
    process.env.LOGIN_PASS || '',
  );

  if (!isUsernameValid || !isPasswordValid) {
    return {
      username,
      error: 'Credenciais Inválidas',
    };
  }

  // Se chegou até aqui, é porque as credenciais estão corretas
  // gera o cookie e redireciona para a página protegida
  await createLoginSession(username);
  redirect('/admin/post');
}

import { hashPassword } from '@/lib/login/manager-login';

(async () => {
  const minhaSenha = ''; //nunca esquecer de apagar suas informações
  const hahsDaSuaSenhaEmBase64 = await hashPassword(minhaSenha);
  console.log({ hahsDaSuaSenhaEmBase64 });
})();

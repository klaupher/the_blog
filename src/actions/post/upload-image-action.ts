'use server';

import {
  IMAGE_SERVER_URL,
  IMAGE_UPLOAD_FOLDER,
  IMAGE_UPLOAD_MAX_SIZE,
} from '@/lib/constants';
import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path/win32';

type UploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<UploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }): UploadImageActionResult => ({
    url,
    error,
  });

  //TODO: verificar se o usuário está logado

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos!' });
  }

  if (!formData.has('file')) {
    return makeResult({ error: 'Dados enviados inválidos!' });
  }

  const file = formData.get('file');

  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválido!' });
  }

  if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
    return makeResult({ error: 'Arquivo muito grande!' });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Tipo de arquivo inválido!' });
  }

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;
  const uploadFullPath = resolve(process.cwd(), 'public', IMAGE_UPLOAD_FOLDER);
  await mkdir(uploadFullPath, { recursive: true });

  // JS -> bytes -> Node.js (fs) -> salvar o arquivo no sistema de arquivos
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileFullPath = resolve(uploadFullPath, uniqueImageName);
  await writeFile(fileFullPath, buffer);

  const url = `${IMAGE_SERVER_URL}/${uniqueImageName}`;
  console.log(`Imagem enviada com sucesso! ${url}`);
  return makeResult({ url });
}

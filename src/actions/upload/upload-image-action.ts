'use server';

import { verifyLoginSession } from '@/lib/login/manager-login';
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

  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    return makeResult({
      error: 'Faça login novamente.',
    });
  }

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

  const uploadMaxSize =
    Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;
  if (file.size > uploadMaxSize) {
    return makeResult({ error: 'Arquivo muito grande!' });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Tipo de arquivo inválido!' });
  }

  const imageExtension = extname(file.name);
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const uploadDir = process.env.IMAGE_UPLOAD_FOLDER || 'uploads';
  const uploadFullPath = resolve(process.cwd(), 'public', uploadDir);
  await mkdir(uploadFullPath, { recursive: true });

  // JS -> bytes -> Node.js (fs) -> salvar o arquivo no sistema de arquivos
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileFullPath = resolve(uploadFullPath, uniqueImageName);
  await writeFile(fileFullPath, buffer);

  const imageServerUrl =
    process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads';
  const url = `${imageServerUrl}/${uniqueImageName}`;

  return makeResult({ url });
}

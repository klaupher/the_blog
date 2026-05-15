'use client';

import { uploadImageAction } from '@/actions/post/upload-image-action';
import { Button } from '@/components/Button';
import { IMAGE_UPLOAD_MAX_SIZE } from '@/lib/constants';
import { ImageUp } from 'lucide-react';
import { useRef, useTransition } from 'react';
import { toast } from 'react-toastify';

export function ImageUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startUploading] = useTransition();

  function handleChooseFile() {
    if (!fileInputRef.current) return;
    fileInputRef.current?.click();
  }

  function handleFileChange() {
    toast.dismiss(); //fecha toasts anteriores
    if (!fileInputRef.current) return;
    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];
    if (!file) return;

    if (file.size > IMAGE_UPLOAD_MAX_SIZE) {
      toast.error(
        `Imagem excedeu o tamanho permitido: ${IMAGE_UPLOAD_MAX_SIZE / 1024}KB .`,
      );
      fileInput.value = '';
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    startUploading(async () => {
      const result = await uploadImageAction(formData);
      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success(` Imagem enviada com sucesso! URL: ${result.url} `);
    });

    console.log(formData);
    fileInput.value = '';
  }

  return (
    <div className='flex flex-col gap-2 py-4'>
      <Button type='button' className='self-start' onClick={handleChooseFile}>
        <ImageUp />
        Enviar uma imagem
      </Button>
      <input
        ref={fileInputRef}
        className='hidden'
        type='file'
        name='file'
        accept='image/*'
        onChange={handleFileChange}
      />
    </div>
  );
}

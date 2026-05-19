'use client';

import { uploadImageAction } from '@/actions/upload/upload-image-action';
import { Button } from '@/components/Button';
import { ImageUp } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

type ImageUploaderProps = {
  disabled?: boolean;
};

export function ImageUploader({ disabled = false }: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, startUploading] = useTransition();
  const [imgUrl, setImgUrl] = useState('');

  function handleChooseFile() {
    if (!fileInputRef.current) return;
    fileInputRef.current?.click();
  }

  function handleFileChange() {
    toast.dismiss(); //fecha toasts anteriores
    if (!fileInputRef.current) {
      setImgUrl('');
      return;
    }
    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0];
    if (!file) {
      setImgUrl('');
      return;
    }

    const uploadMaxSize =
      Number(process.env.NEXT_PUBLIC_IMAGE_UPLOAD_MAX_SIZE) || 921600;
    if (file.size > uploadMaxSize) {
      toast.error(
        `Imagem excedeu o tamanho permitido: ${uploadMaxSize / 1024}KB .`,
      );
      fileInput.value = '';
      setImgUrl('');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    startUploading(async () => {
      const result = await uploadImageAction(formData);
      if (result.error) {
        toast.error(result.error);
        setImgUrl('');
        return;
      }

      setImgUrl(result.url);
      // toast.success(` Imagem enviada com sucesso! URL: ${result.url} `);
    });

    fileInput.value = '';
  }

  return (
    <div className='flex flex-col gap-4 py-4'>
      <Button
        type='button'
        className='self-start'
        onClick={handleChooseFile}
        disabled={isUploading || disabled}
      >
        <ImageUp />
        Enviar uma imagem
      </Button>

      {!!imgUrl && (
        <div className='flex flex-col gap-4'>
          <p>
            <b>URL:</b> {imgUrl}
          </p>
          {/* eslint-disable-next-line */}
          <img className='rounded-lg' src={imgUrl} />
        </div>
      )}

      <input
        ref={fileInputRef}
        className='hidden'
        type='file'
        name='file'
        accept='image/*'
        onChange={handleFileChange}
        disabled={isUploading || disabled}
      />
    </div>
  );
}

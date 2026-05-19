'use client';

import { Button } from '@/components/Button';
import { InputCheckBox } from '@/components/InputCheckBox';
import { InputText } from '@/components/InputText';
import { MarkdownEditor } from '../MarkdownEditor';
import { useActionState, useEffect, useState } from 'react';
import { ImageUploader } from '../ImageUploader';
import { makePartialPost, PublicPost } from '@/dto/posts/dto';
import { createPostAction } from '@/actions/post/create-post-action';
import { toast } from 'react-toastify';
import { updatePostAction } from '@/actions/post/update-post-action';
import { useRouter, useSearchParams } from 'next/navigation';

type ManagerPostFormUpdateProps = {
  mode: 'update';
  publicPost: PublicPost;
};

type ManagerPostFormCreateProps = {
  mode: 'create';
};

type ManagerPostFormProps =
  | ManagerPostFormUpdateProps
  | ManagerPostFormCreateProps;

export function ManagerPostForm(props: ManagerPostFormProps) {
  const { mode } = props;
  const searchParams = useSearchParams();
  const success = searchParams.get('success');
  const router = useRouter();

  const publicPost = mode === 'update' ? props.publicPost : undefined;

  const actionsMap = {
    create: createPostAction,
    update: updatePostAction,
  };
  const initialState = {
    formState: makePartialPost(publicPost),
    errors: [],
  };
  const [state, action, isPending] = useActionState(
    actionsMap[mode],
    initialState,
  );

  const { formState } = state;
  const [contentValue, setContentValue] = useState(formState.content);

  useEffect(() => {
    if (state.errors.length > 0) {
      toast.dismiss();
      state.errors.forEach(error => toast.error(error));
    }
  }, [state.errors]);

  useEffect(() => {
    if (state.success) {
      toast.dismiss();
      toast.success('Post atualizado com sucesso');
    }
  }, [state.success]);

  useEffect(() => {
    if (success) {
      toast.dismiss();
      toast.success('Post criado com sucesso');
      const url = new URL(window.location.href);
      url.searchParams.delete('success');
      router.replace(url.toString());
    }
  }, [success, router]);

  return (
    <form action={action} className='mb-16'>
      <div className='flex flex-col gap-6'>
        <InputText
          labelText='ID'
          name='id'
          placeholder='ID gerado automaticamente'
          readOnly
          type='text'
          defaultValue={formState.id}
        />
        <InputText
          labelText='Slug'
          name='slug'
          placeholder='Slug gerado automaticamente'
          readOnly
          type='text'
          defaultValue={formState.slug}
        />
        <InputText
          labelText='Autor'
          placeholder='Digite o nome do autor'
          name='author'
          type='text'
          defaultValue={formState.author}
          disabled={isPending}
        />
        <InputText
          labelText='Titulo'
          placeholder='Digite o titulo'
          name='title'
          type='text'
          defaultValue={formState.title}
          disabled={isPending}
        />
        <InputText
          labelText='Resumo'
          placeholder='Digite o resumo'
          name='excerpt'
          type='text'
          defaultValue={formState.excerpt}
          disabled={isPending}
        />
        <MarkdownEditor
          labelText='Conteúdo'
          value={contentValue}
          setValue={setContentValue}
          textAreaName='content'
          disabled={isPending}
        />
        <ImageUploader disabled={isPending} />

        <InputText
          labelText='URL da imagem da Capa'
          placeholder='Digite a url da imagem da capa'
          name='coverImageUrl'
          type='text'
          defaultValue={formState.coverImageUrl}
          disabled={isPending}
        />
        <InputCheckBox
          labelText='Publicar?'
          name='published'
          defaultChecked={formState.published}
          disabled={isPending}
        />
        <div>
          <Button type='submit' className='mt-4' disabled={isPending}>
            Enviar
          </Button>
        </div>
      </div>
    </form>
  );
}

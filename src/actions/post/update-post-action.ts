'use server';

import {
  makePartialPost,
  makePublicPostFromDB,
  PublicPost,
} from '@/dto/posts/dto';
import { verifyLoginSession } from '@/lib/login/manager-login';
import { PostUpdateSchema } from '@/lib/post/validation';
import { postRepository } from '@/repositories/post';
import { getZodErrorMessages } from '@/utils/get-zod-error-messages';
import { makeRandonString } from '@/utils/make-randon-string';
import { revalidateTag } from 'next/cache';

type UpdatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};

export async function updatePostAction(
  prevState: UpdatePostActionState,
  formData: FormData,
): Promise<UpdatePostActionState> {
  const isAuthenticated = await verifyLoginSession();

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos.'],
    };
  }

  const id = formData.get('id')?.toString() || '';

  if (!id || typeof id !== 'string') {
    return {
      formState: prevState.formState,
      errors: ['Id Inválido'],
    };
  }

  const formDataToObj = Object.fromEntries(formData.entries());
  const zodParsedObj = PostUpdateSchema.safeParse(formDataToObj);

  if (!isAuthenticated) {
    return {
      formState: makePartialPost(formDataToObj),
      errors: ['Faça login em outra aba antes de salvar.'],
    };
  }

  if (!zodParsedObj.success) {
    const errorMessages = getZodErrorMessages(zodParsedObj.error);
    return {
      formState: makePartialPost(formDataToObj), // tenta preencher o formulário com os dados enviados, mesmo que sejam inválidos
      errors: errorMessages,
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost = {
    ...validPostData,
  };

  let post;
  try {
    post = await postRepository.update(id, newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: makePartialPost(formDataToObj),
        errors: [e.message],
      };
    }

    return {
      formState: makePartialPost(formDataToObj),
      errors: ['Erro desconhecido'],
    };
  }

  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);

  return {
    formState: makePublicPostFromDB(post),
    errors: [],
    success: makeRandonString(),
  };
}

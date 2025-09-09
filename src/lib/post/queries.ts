import { postRepository } from '@/repositories/post';
import { notFound } from 'next/navigation';
import { cache } from 'react';

export const findAllPublishedPosts = cache(async () => {
  return await postRepository.findAllPublished();
});

export const findPostBySlugCached = cache(async (slug: string) => {
  const post = await postRepository.findBySlug(slug).catch(() => undefined);
  if (!post) notFound();
  return post;
});

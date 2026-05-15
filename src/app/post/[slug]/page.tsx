import { PostSingle } from '@/components/PostSingle';
import { SpinLoader } from '@/components/SpinLoader';
import { findPublicPostBySlugCached } from '@/lib/post/queries/public';
import { Metadata } from 'next';
import React, { Suspense } from 'react';

export const dynamic = 'force-static';

type PostSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Readonly<PostSlugPageProps>): Promise<Metadata> {
  const { slug } = await params;

  const post = await findPublicPostBySlugCached(slug);
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostSlugPage({
  params,
}: Readonly<PostSlugPageProps>) {
  const { slug } = await params;
  return (
    <Suspense fallback={<SpinLoader className='min-h-20 mb-16' />}>
      <PostSingle slug={slug} />;
    </Suspense>
  );
}

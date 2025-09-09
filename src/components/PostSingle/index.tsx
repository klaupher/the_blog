import { findPostBySlugCached } from '@/lib/post/queries';
import Image from 'next/image';
import { PostHeading } from '../PostHeading';
import { PostDate } from '../PostDate';
import { SafeMarkdown } from '../SafeMarkdown';

type PostSingleProps = {
  slug: string;
};

export async function PostSingle({ slug }: Readonly<PostSingleProps>) {
  const post = await findPostBySlugCached(slug);
  return (
    <article className='mb-16'>
      <header className='group flex flex-col gap-4 mb-4'>
        <Image
          className='rounded-xl'
          src={post.coverImageUrl}
          width={1200}
          height={720}
          alt={post.title}
        />
        <PostHeading url={`/post/${post.slug}`}>{post.title}</PostHeading>
        <p>
          {post.author} | <PostDate datetime={post.createdAt} />
        </p>
      </header>
      <p className='italic mb-16 text-xl text-slate-500'>{post.excerpt}</p>
      <SafeMarkdown markdown={post.content} />
    </article>
  );
}

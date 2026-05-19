import { ManagerPostForm } from '@/components/Admin/ManagerPostForm';
import { makePublicPostFromDB } from '@/dto/posts/dto';
import { findPostByIdAdmin } from '@/lib/post/queries/admin';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: 'Editar Post',
  description: 'Edite um post existente do blog',
};

export default async function AdminPostIdPage({
  params,
}: Readonly<AdminPostIdPageProps>) {
  const { id } = await params;
  const post = await findPostByIdAdmin(id).catch(() => undefined);

  if (!post) notFound();

  const publicPost = makePublicPostFromDB(post);

  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-xl font-extrabold'>Editar Post</h1>
      <ManagerPostForm mode='update' publicPost={publicPost} />
    </div>
  );
}

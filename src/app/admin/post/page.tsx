import PostListAdmin from '@/components/Admin/PostListAdmin';
import { SpinLoader } from '@/components/SpinLoader';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Post Admin',
};

export default async function AdminPostsPage() {
  return (
    <Suspense fallback={<SpinLoader className='pb-16' />}>
      <PostListAdmin />
    </Suspense>
  );
}

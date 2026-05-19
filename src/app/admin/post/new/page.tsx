import { ManagerPostForm } from '@/components/Admin/ManagerPostForm';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Criar Post',
  description: 'Crie um novo post para o blog',
};

export default function AdminPostNewPage() {
  return (
    <div className='flex flex-col gap-6'>
      <h1 className='text-xl font-extrabold'>Criar Post</h1>
      <ManagerPostForm mode='create' />
    </div>
  );
}

export const dynamic = 'force-dynamic';

type AdminPostIdPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminPostIdPage({
  params,
}: Readonly<AdminPostIdPageProps>) {
  const { id } = await params;
  return <div className='py-6 text-6xl'>AdminPostIdPage - ${id}</div>;
}

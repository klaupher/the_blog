import { formatDateTime, formateRelativePeriod } from '@/utils/format-datetime';

type PostDateProps = {
  datetime: string;
};
export function PostDate({ datetime }: Readonly<PostDateProps>) {
  return (
    <time
      className='text-slate-600 mb-3 text-sm/tight'
      dateTime={datetime}
      title={formateRelativePeriod(datetime)}
    >
      {formatDateTime(datetime)}
    </time>
  );
}

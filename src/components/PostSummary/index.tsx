import { PostHeading } from '../PostHeading';
import { PostDate } from '../PostDate';

type PostSummaryProps = {
  postLink: string;
  postHeading: 'h1' | 'h2';
  createdAt: string;
  title: string;
  excerpt: string;
};

export function PostSummary({
  createdAt,
  excerpt,
  postHeading,
  postLink,
  title,
}: Readonly<PostSummaryProps>) {
  return (
    <div className='flex flex-col sm: justify-center'>
      <PostDate datetime={createdAt} />
      <PostHeading as={postHeading} url={postLink}>
        {title}
      </PostHeading>
      {excerpt}
    </div>
  );
}

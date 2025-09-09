import clsx from 'clsx';
import Markdown from 'react-markdown';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

type SafeMarkdownProps = {
  markdown: string;
};

export function SafeMarkdown({ markdown }: Readonly<SafeMarkdownProps>) {
  return (
    <div
      className={clsx(
        'prose prose-slate',
        'w-full max-w-none',
        'overflow-hidden',
        'prose-a:transition',
        'prose-a:no-underline',
        'prose-a:text-blue-500',
        'prose-a:hover:text-blue-700',
        'prose-a:hover:underline',
        'prose-img:mx-auto',
        'lg:prose-lg',
      )}
    >
      <Markdown
        rehypePlugins={[rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        components={{
          table: ({ node, ...props }) => {
            if (!node?.children) return '';
            return (
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[600px]' {...props} />
              </div>
            );
          },
        }}
      >
        {markdown}
      </Markdown>
    </div>
  );
}

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

type PostHeadingProps = {
  children: React.ReactNode;
  url: string;
  as?: 'h1' | 'h2';
};

export function PostHeading({
  children,
  url,
  as: Tag = 'h2',
}: Readonly<PostHeadingProps>) {
  const headingClassesMap = {
    h1: 'text-2xl/tight mb-3 sm:text-4xl',
    h2: 'text-xl/tight mb-4 sm:text-2xl',
  };

  const commonClass = 'font-extrabold';

  return (
    <Tag className={clsx(headingClassesMap[Tag], commonClass)}>
      <Link className='hover:text-slate-500 transition' href={url}>
        {' '}
        {children}
      </Link>
    </Tag>
  );
}

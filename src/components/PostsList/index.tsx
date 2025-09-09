import React from 'react';
import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';
import { findAllPublishedPosts } from '@/lib/post/queries';

export async function PostsList() {
  const posts = await findAllPublishedPosts();
  return (
    <div className='grid grid-cols-1 mb-16 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.slice(1).map(post => {
        const postLink = `/post/${post.slug}`;
        return (
          <div className='flex flex-col gap-4 group' key={post.id}>
            <PostCoverImage
              imageProps={{
                src: post.coverImageUrl,
                alt: post.title,
                width: 1200,
                height: 720,
              }}
              linkProps={{
                href: postLink,
              }}
            />
            <PostSummary
              postHeading='h2'
              postLink={postLink}
              createdAt={post.createdAt}
              excerpt={post.excerpt}
              title={post.title}
            />
          </div>
        );
      })}
    </div>
  );
}

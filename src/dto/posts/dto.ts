import { PostModel } from '@/models/post/post-model';

export type PublicPost = Omit<PostModel, 'updatedAt'>;

export const makePartialPost = (post?: Partial<PostModel>): PublicPost => {
  return {
    id: post?.id || '',
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    coverImageUrl: post?.coverImageUrl || '',
    published: post?.published || false,
    author: post?.author || '',
    createdAt: post?.createdAt || '',
  };
};

export const makePublicPostFromDB = (post: PostModel): PublicPost => {
  return makePartialPost(post);
};

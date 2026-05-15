import { DrizzlePostRepository } from './drizzle-post-repository';
// import { JsonPostRepository } from './js-post-repository';

// export const postRepository = new JsonPostRepository();
export const postRepository = new DrizzlePostRepository();

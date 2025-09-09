import { PostModel } from '@/models/post/post-model';

export interface PostRepository {
  // create(post: PostModel): Promise<PostModel>;
  findById(id: string): Promise<PostModel | null>;
  findBySlug(slug: string): Promise<PostModel | null>;
  findAllPublished(): Promise<PostModel[]>;
  // update(id: string, post: Partial<PostModel>): Promise<PostModel | null>;
  // delete(id: string): Promise<boolean>;
}

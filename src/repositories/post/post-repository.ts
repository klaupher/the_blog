import { PostModel } from '@/models/post/post-model';

export interface PostRepository {
  // create(post: PostModel): Promise<PostModel>;
  findAllPublished(): Promise<PostModel[]>;
  findBySlugPublished(slug: string): Promise<PostModel>;
  findById(id: string): Promise<PostModel>;
  findAll(): Promise<PostModel[]>;
  // update(id: string, post: Partial<PostModel>): Promise<PostModel | null>;
  // delete(id: string): Promise<boolean>;
}

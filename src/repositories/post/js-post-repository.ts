import { PostModel } from '@/models/post/post-model';
import { PostRepository } from './post-repository';
import { resolve } from 'path';
import { readFile } from 'fs/promises';

const ROOT_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  ROOT_DIR,
  'src',
  'db',
  'seed',
  'posts.json',
);
const SIMULATE_WAIT_IN_MS = 0;

type PostModelLista = {
  posts: PostModel[];
};
//
export class JsonPostRepository implements PostRepository {
  private async simulateWait() {
    if (SIMULATE_WAIT_IN_MS <= 0) return;

    await new Promise(resolve => setTimeout(resolve, SIMULATE_WAIT_IN_MS));
  }

  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8');
    const parsedJson = JSON.parse(jsonContent) as PostModelLista;
    const { posts } = parsedJson;
    return posts;
  }

  async findAllPublished(): Promise<PostModel[]> {
    await this.simulateWait();
    console.log('Lendo posts do arquivo JSON');
    return (await this.readFromDisk()).filter(post => post.published);
  }

  async findById(id: string): Promise<PostModel> {
    return this.findAllPublished().then(posts => {
      const post = posts.find(p => p.id === id);
      if (!post) throw new Error('Post not found');
      return post;
    });
  }

  async findBySlug(slug: string): Promise<PostModel> {
    return this.findAllPublished().then(posts => {
      const post = posts.find(p => p.slug === slug);
      if (!post) throw new Error('Post not found');
      return post;
    });
  }
}

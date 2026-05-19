import { PostModel } from '@/models/post/post-model';
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

type PostModelLista = {
  posts: PostModel[];
};

//removendo o implements, para evitar erro no Build, já que não preciso dos métodos de criação, atualização e deleção para a minha aplicação, e não quero implementar eles agora, já que não são necessários para o meu caso de uso atual. Se precisar deles no futuro, posso implementar eles depois.
export class JsonPostRepository {
  private async simulateWait() {
    if (Number(process.env.SIMULATE_WAIT_IN_MS) <= 0) return;

    await new Promise(resolve =>
      setTimeout(resolve, Number(process.env.SIMULATE_WAIT_IN_MS)),
    );
  }

  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8');
    const parsedJson = JSON.parse(jsonContent) as PostModelLista;
    const { posts } = parsedJson;
    return posts;
  }

  async findAllPublished(): Promise<PostModel[]> {
    await this.simulateWait();
    return (await this.readFromDisk()).filter(post => post.published);
  }

  async findAll(): Promise<PostModel[]> {
    await this.simulateWait();
    return await this.readFromDisk();
  }

  async findById(id: string): Promise<PostModel> {
    return this.findAllPublished().then(posts => {
      const post = posts.find(p => p.id === id);
      if (!post) throw new Error('Post not found');
      return post;
    });
  }

  async findBySlugPublished(slug: string): Promise<PostModel> {
    return this.findAllPublished().then(posts => {
      const post = posts.find(p => p.slug === slug);
      if (!post) throw new Error('Post not found');
      return post;
    });
  }
}

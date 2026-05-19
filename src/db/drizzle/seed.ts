import { JsonPostRepository } from '@/repositories/post/js-post-repository';
import { drizzleDb } from '.';
import { postsTable } from './schemas';

(async () => {
  const jsonPostsRepository = new JsonPostRepository();
  const posts = await jsonPostsRepository.findAll();

  try {
    await drizzleDb.delete(postsTable); //CUIDADO: Isso apaga todos os posts antes de inserir os novos
    await drizzleDb.insert(postsTable).values(posts);
    console.log('Posts inserted successfully');
  } catch (error) {
    console.error('Error inserting posts:', error);
  }
})();

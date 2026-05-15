'use server'; // só é utilizado para criar server actions... não cria um server component

export async function revalidateExampleAction() {
  console.log('Estou em uma server action');
}

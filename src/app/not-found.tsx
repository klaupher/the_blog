import ErrorMessage from '@/components/ErrorMessage';

export default function NotFoundPage() {
  return (
    <ErrorMessage
      pageTitle='Não encontrado'
      contentTitle='404 🙁'
      content='Erro 404 - Pagina não existe nesse site'
    />
  );
}

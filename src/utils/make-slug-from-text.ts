import slugify from 'slugify';
import { makeRandonString } from './make-randon-string';

export const makeSlugFromText = (text: string): string => {
  const slug = slugify(text, {
    lower: true, // Converte para minúsculas
    strict: true, // Remove caracteres especiais
    trim: true, // Remove espaços extras no início e no fim
  });
  return `${slug}-${makeRandonString()}`;
};

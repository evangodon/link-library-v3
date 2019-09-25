import { categories } from 'components/CategorySelect';

export interface Link {
  id: string | number;
  url: string;
  title: string;
  description: string;
  image?: string | undefined;
  category: Category;
}

export type Category = 'video' | 'article' | 'github' | 'other';

export const checkIfCategory = (str: unknown): Category => {
  return categories.find((category) => str === category) || categories[3];
};

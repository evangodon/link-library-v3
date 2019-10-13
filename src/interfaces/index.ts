import { categories } from 'components/CategorySelect';

export interface Link {
  id: string | number;
  url: string;
  title: string;
  description: string;
  image?: string | undefined;
  category: Category;
  createdAt?: string | null;
  updatedAt?: string | null;
}

const linkObj: Link = {
  id: '',
  url: '',
  title: '',
  description: '',
  image: '',
  category: 'other',
  createdAt: '',
};

const linkKeys = Object.keys(linkObj);

export const isLink = (link: any): link is Link => {
  return linkKeys.every((key) => link.hasOwnProperty(key));
};

export type Category = 'video' | 'article' | 'github' | 'website' | 'other';

export type User = {
  email: string;
  photoURL: string;
  username: string;
};

export const checkIfCategory = (str: unknown): Category => {
  return categories.find((category) => str === category) || categories[3];
};

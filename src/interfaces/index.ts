import { categories } from 'components/CategorySelect';

export interface Link {
  id: string | number;
  userId: string | number;
  url: string;
  title: string;
  description: string;
  image?: string | undefined;
  category: Category;
  createdAt?: { seconds: number; nanoseconds: number } | null;
  updatedAt?: string | null;
}

const link: Link = {
  id: '',
  userId: '',
  url: '',
  title: '',
  description: '',
  image: '',
  category: 'other',
  createdAt: { seconds: 0, nanoseconds: 0 },
};

const linkKeys = Object.keys(link);

export const isLink = (link: any): link is Link => {
  return linkKeys.every((key) => link.hasOwnProperty(key));
};

export type Category = 'video' | 'article' | 'github' | 'website' | 'other';

export interface User {
  uid: string;
  email: string;
  photoURL: string;
  displayName: string;
}

const user: User = {
  uid: '',
  email: '',
  photoURL: '',
  displayName: '',
};

const userKeys = Object.keys(user);

export const verifyUser = (user: any): user is User => {
  return userKeys.every((key) => user.hasOwnProperty(key));
};

export const checkIfCategory = (str: unknown): Category => {
  return categories.find((category) => str === category) || categories[3];
};

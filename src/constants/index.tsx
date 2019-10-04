import React from 'react';
import { Category } from 'src/types';
import { Video, BookOpen, GitHub, Box } from 'react-feather';
import { variables } from 'css/variables.css';

type CategoryData = {
  [key in Category]: {
    name: string;
    icon: React.ReactElement;
    color: string;
  };
};

export const CATEGORIES: CategoryData = {
  video: {
    name: 'Video',
    icon: <Video size="1.6rem" />,
    color: variables.__category_1,
  },
  article: {
    name: 'Article',
    icon: <BookOpen size="1.6rem" />,
    color: variables.__category_2,
  },
  github: {
    name: 'Github',
    icon: <GitHub size="1.6rem" />,
    color: variables.__category_3,
  },
  other: {
    name: 'Other',
    icon: <Box size="1.6rem" />,
    color: variables.__category_4,
  },
};

export const isSSR = !process.browser;
export const dev = process.env.NODE_ENV === 'development';

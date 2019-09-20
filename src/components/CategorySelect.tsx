import * as React from 'react';
import styled from 'styled-components';
import { CATEGORIES } from '../constants/index';
import { Video, BookOpen, GitHub, Box } from 'react-feather';
import { StackOverflow, Reddit } from './icons';

interface Icon {
  [key: string]: React.ReactElement;
}

const icon: Icon = {
  video: <Video />,
  article: <BookOpen />,
  stackoverflow: <StackOverflow />,
  github: <GitHub />,
  reddit: <Reddit />,
  other: <Box />,
};

const CategorySelect: React.FC = () => {
  return (
    <Container>
      <H3>Categories</H3>
      <CategoriesContainer>
        {Object.keys(CATEGORIES).map((category, index) => (
          <CategoryItem key={index} className={category}>
            {icon[category]}
            {category[0].toUpperCase() + category.slice(1)}
          </CategoryItem>
        ))}
      </CategoriesContainer>
    </Container>
  );
};

const Container = styled.div``;

const H3 = styled.h3`
  margin-bottom: 0.8rem;
  font-size: 1.6rem;
`;

const CategoriesContainer = styled.ul``;

const CategoryItem = styled.li`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-column-gap: 0.4rem;
  align-items: center;
  cursor: pointer;
  margin-bottom: 0.6rem;
  font-size: 1.2rem;

  svg {
    width: 1.6rem;
    position: relative;
    bottom: 2px;
  }
`;

export default CategorySelect;

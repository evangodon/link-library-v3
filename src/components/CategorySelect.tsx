import * as React from 'react';
import styled from 'styled-components';
import { Category } from 'interfaces';
import { Video, BookOpen, GitHub, Box, Database } from 'react-feather';
import { StackOverflow, Reddit } from './icons';
import { useLinksContext } from 'context';

interface Icon {
  [key: string]: React.ReactElement;
}

export const categories: Category[] = [
  'video',
  'article',
  'stackoverflow',
  'github',
  'reddit',
  'other',
];

const icon: Icon = {
  video: <Video />,
  article: <BookOpen />,
  stackoverflow: <StackOverflow />,
  github: <GitHub />,
  reddit: <Reddit />,
  other: <Box />,
};

const CategorySelect: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useLinksContext();

  return (
    <Container>
      <H3>Categories</H3>
      <CategoriesContainer>
        <>
          {categories.map((category, index) => (
            <CategoryItem key={index} onClick={() => setSelectedCategory(category)}>
              {icon[category]}
              {category[0].toUpperCase() + category.slice(1)}
            </CategoryItem>
          ))}
          {selectedCategory && (
            <CategoryItem>
              <Database />
              <ClearCategory onClick={() => setSelectedCategory(null)}>All</ClearCategory>
            </CategoryItem>
          )}
        </>
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

const ClearCategory = styled.span`
  color: var(--grey-400);
  font-weight: bold;
  font-size: var(--fs-small);
`;

export default CategorySelect;

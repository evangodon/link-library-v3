import * as React from 'react';
import styled from 'styled-components';
import { Category } from 'interfaces';
import { Video, BookOpen, GitHub, Box, Database } from 'react-feather';
import { StackOverflow, Reddit } from './icons';
import { useLinksContext } from 'context';
import { CATEGORIES } from '../constants/index';
import { lighten } from 'polished';

interface Icon {
  [key: string]: React.ReactElement;
}

export const categories: Category[] = ['video', 'article', 'github', 'other'];

export const icons: Icon = {
  video: <Video size="1.6rem" />,
  article: <BookOpen size="1.6rem" />,
  stackoverflow: <StackOverflow size="1.6rem" />,
  github: <GitHub size="1.6rem" />,
  reddit: <Reddit size="1.6rem" />,
  other: <Box size="1.6rem" />,
};

const CategorySelect: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = useLinksContext();

  return (
    <Container>
      <H3>Categories</H3>
      <CategoriesContainer>
        <>
          <CategoryItem
            active={!Boolean(selectedCategory)}
            onClick={() => setSelectedCategory(null)}
          >
            <Database size="1.4rem" />
            <ClearCategory>All</ClearCategory>
          </CategoryItem>
          {categories.map((category, index) => (
            <CategoryItem
              key={index}
              active={category === selectedCategory}
              activeColor={selectedCategory ? CATEGORIES[selectedCategory].color : null}
              onClick={() => setSelectedCategory(category)}
            >
              {icons[category]}
              {category[0].toUpperCase() + category.slice(1)}
            </CategoryItem>
          ))}
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

const CategoriesContainer = styled.ul`
  display: inline-block;
`;

type CategoryItemProps = {
  active: boolean;
  activeColor?: string | null;
};

const CategoryItem = styled.li<CategoryItemProps>`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-column-gap: 0.4rem;
  align-items: center;
  cursor: pointer;
  padding: 3px 8px;
  border-radius: 10px;
  font-size: 1.2rem;
  color: ${({ active, activeColor }) => (active ? activeColor : 'var(--grey-400)')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  background-color: ${({ active, activeColor }) =>
    active && activeColor ? lighten(0.35, activeColor) : 'normal'};
  transition: color, background-color 0.1s ease;

  svg {
    position: relative;
    bottom: 1px;
    width: 1.4rem;
    color: ${({ active, activeColor }) => (active ? activeColor : 'inherit')};
  }
`;

const ClearCategory = styled.span`
  color: var(--grey-400);
  font-size: var(--fs-small);
`;

export default CategorySelect;

import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import { icons } from './CategorySelect';
import { Category } from 'interfaces';
import { CATEGORIES } from 'constants/index';
import { useLinksContext } from 'context/index';

type Props = {
  category: Category;
};

const CategoryPill: React.FC<Props> = ({ category }) => {
  const categoryData = CATEGORIES[category] || {};
  const { setSelectedCategory } = useLinksContext();

  return (
    <Container
      categoryColor={categoryData.color}
      onClick={() => setSelectedCategory(category)}
    >
      {icons[category]}
    </Container>
  );
};

const Container = styled.span<{ categoryColor: string }>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  --size: 2.1rem;
  height: var(--size);
  width: var(--size);
  min-width: var(--size);
  margin: 0 0.6rem;
  margin-bottom: 0.8rem;
  border-radius: 50%;
  background-color: ${({ categoryColor }) =>
    categoryColor ? lighten(0.35, categoryColor) : 'none'};
  color: ${({ categoryColor }) => categoryColor};
  font-size: var(--fs-small);

  svg {
    width: 1.2rem;
  }

  span {
    line-height: 1;
  }
`;

export default CategoryPill;

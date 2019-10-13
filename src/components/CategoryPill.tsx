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
      <span>{categoryData.name}</span>
    </Container>
  );
};

const Container = styled.span<{ categoryColor: string }>`
  display: inline-flex;
  align-items: center;
  padding: 1px 6px;
  margin-bottom: 0.8rem;
  border-radius: 10px;
  background-color: ${({ categoryColor }) =>
    categoryColor ? lighten(0.35, categoryColor) : 'none'};
  color: ${({ categoryColor }) => categoryColor};
  font-size: var(--fs-small);

  svg {
    margin-right: 0.4rem;
    width: 1.2rem;
  }

  span {
    line-height: 1;
    position: relative;
    top: 1px;
  }
`;

export default CategoryPill;

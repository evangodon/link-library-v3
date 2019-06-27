import * as React from 'react';
import styled from 'styled-components';
import { CATEGORIES } from 'constants/index';

const CategorySelect: React.FunctionComponent = () => {
  return (
    <Container>
      <H3>Categories</H3>
      <CategoriesContainer>
        {Object.keys(CATEGORIES).map((category, index) => (
          <CategoryItem key={index} className={category}>
            {category[0].toUpperCase() + category.slice(1)}
          </CategoryItem>
        ))}
      </CategoriesContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  left: 0;
  top: 15rem;
`;

const H3 = styled.h3`
  margin-bottom: 1.5rem;
`;

const CategoriesContainer = styled.ul``;

const CategoryItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 1.2rem;
`;

export default CategorySelect;

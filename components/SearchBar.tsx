import * as React from 'react';
import styled from 'styled-components';

const SearchBar: React.FunctionComponent = () => {
  return <Input placeholder="Search..." />;
};

const Input = styled.input`
  border: 1px solid #cccccc;
  border-radius: 2px;
  max-width: var(--link-max-width);
  width: 100%;
  height: 5rem;
  margin: 0 auto;
  padding: 1rem 2rem;
  font-size: 2rem;
  margin-bottom: 4rem;
`;

export default SearchBar;

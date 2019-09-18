import React, { useState } from 'react';
import styled from 'styled-components';
import { Search } from 'react-feather';

const SearchBar: React.FC = () => {
  const [inFocus, setInFocus] = useState(false);
  return (
    <Container inFocus={inFocus} onClick={() => setInFocus(true)}>
      <Search className="Search-icon" />
      <Input placeholder="Search..." onBlur={() => setInFocus(false)} />
    </Container>
  );
};

const Container = styled.div<{ inFocus: boolean }>`
  position: relative;
  color: #cccccc;
  color: ${(props) => (props.inFocus ? '#736c6c' : '#ccc')};
  display: inline-block;
  width: 100%;

  .Search-icon {
    position: absolute;
    top: 6px;
    left: 10px;
    color: currentColor;
    width: 2rem;
  }
`;

const Input = styled.input`
  color: inherit;
  outline: none;
  border: 1px solid currentColor;
  border-radius: 30px;
  max-width: var(--link-max-width);
  width: 100%;
  height: 3.8rem;
  margin: 0 auto;
  padding: 1rem 2rem 1rem 4rem;
  font-size: 2rem;
  margin-bottom: 4rem;
  transition: color 0.2s ease;

  ::placeholder {
    color: currentColor;
  }
`;

export default SearchBar;

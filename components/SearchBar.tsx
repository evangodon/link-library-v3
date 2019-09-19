import React, { useState } from 'react';
import styled from 'styled-components';
import { Search } from 'react-feather';
import { useLinksContext } from 'context';

const SearchBar: React.FC = () => {
  const [inFocus, setInFocus] = useState(false);
  const { searchQuery, setSearchQuery } = useLinksContext();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.trim();
    if (value.length > 0) {
      setSearchQuery(value);
    } else {
      setSearchQuery(null);
    }
  }

  return (
    <Container active={Boolean(searchQuery) || inFocus} onClick={() => setInFocus(true)}>
      <Search className="Search-icon" />
      <Input
        placeholder="Search..."
        onChange={handleChange}
        value={searchQuery || ''}
        onBlur={() => setInFocus(false)}
      />
    </Container>
  );
};

const Container = styled.div<{ active: boolean }>`
  position: relative;
  color: #cccccc;
  color: ${(props) => (props.active ? '#4a4646' : '#ccc')};
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
  font-size: 1.6rem;
  margin-bottom: 4rem;
  transition: color 0.2s ease;

  ::placeholder {
    color: currentColor;
  }
`;

export default SearchBar;

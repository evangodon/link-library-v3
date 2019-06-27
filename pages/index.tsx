import * as React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import NavBar from 'components/NavBar';
import SearchBar from 'components/SearchBar';
import CategorySelect from 'components/CategorySelect';
import GlobalStyles from 'css/global.css';

const IndexPage: NextPage = () => {
  return (
    <>
      <NavBar />
      <Content>
        <SearchBar />
        <CategorySelect />
        <GlobalStyles />
      </Content>
    </>
  );
};

const Content = styled.main`
  position: relative;
  padding-top: 5rem;
  margin: 0 auto;
  max-width: var(--app-max-width);
  display: flex;
  flex-direction: column;
  align-items: center;

`;

export default IndexPage;

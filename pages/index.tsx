import * as React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import NavBar from 'components/NavBar';
import SearchBar from 'components/SearchBar';
import CategorySelect from 'components/CategorySelect';
import GlobalStyles from 'css/global.css';
import Links from 'components/Links';

const IndexPage: NextPage = () => {
  return (
    <>
      <NavBar />
      <Content>
        <SearchBar />
        <CategorySelect />
        <Links />
      </Content>
      <GlobalStyles />
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

  --link-max-width: 70rem;
`;

export default IndexPage;

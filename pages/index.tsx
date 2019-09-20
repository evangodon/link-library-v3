import * as React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import NavBar from 'components/NavBar';
import SearchBar from 'components/SearchBar';
import CategorySelect from 'components/CategorySelect';
import Links from 'components/Links';
import Modal from 'components/Modal';
import AddLinkButton from 'components/AddLinkButton';

const IndexPage: NextPage = () => {
  return (
    <>
      <NavBar />
      <Content data-testid="application">
        <CategorySelect />
        <div>
          <SearchBar />
          <Links />
        </div>
        <ButtonContainer>
          <AddLinkButton />
        </ButtonContainer>
      </Content>
      <Modal />
    </>
  );
};

IndexPage.getInitialProps = async () => {
  // todo: fetch links here
  return { links: [] };
};

const Content = styled.main`
  position: relative;
  padding-top: 5rem;
  margin: 0 auto;
  max-width: var(--app-max-width);
  display: grid;
  grid-template-columns: 16rem 1fr 15rem;

  --link-max-width: 70rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

export default IndexPage;

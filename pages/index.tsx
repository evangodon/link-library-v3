import * as React from 'react';
import { NextPage } from 'next';
import styled from 'styled-components';
import { ModalProvider, LinksProvider, SnackbarProvider } from 'context';
import NavBar from 'components/NavBar';
import SearchBar from 'components/SearchBar';
import CategorySelect from 'components/CategorySelect';
import Links from 'components/Links';
import Modal from 'components/Modal';
import Snackbar from 'components/Snackbar';
import AddLinkButton from 'components/AddLinkButton';
import fetch from 'node-fetch';
import { Link } from 'interfaces';

type Props = {
  links: Link[] | [];
};

const IndexPage: NextPage<Props> = ({ links }) => (
  <>
    <ModalProvider>
      <SnackbarProvider>
        <LinksProvider ssrLinks={links}>
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
          <Snackbar />
        </LinksProvider>
      </SnackbarProvider>
    </ModalProvider>
  </>
);

IndexPage.getInitialProps = async ({ req }) => {
  let protocol = 'https:';
  const host = req ? req.headers.host : window.location.host;
  if (String(host).includes('localhost')) {
    protocol = 'http:';
  }

  let links = [];
  try {
    const res = await fetch(`${protocol}//${host}/api/links`);
    links = await res.json();
  } catch (error) {
    console.error(error);
  }

  return { links };
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

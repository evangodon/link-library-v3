import * as React from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import fetch from 'node-fetch';
import {
  ModalProvider,
  LinksProvider,
  SnackbarProvider,
  AuthProvider,
} from 'context/providers';
import NavBar from 'components/NavBar';
import SearchBar from 'components/SearchBar';
import CategorySelect from 'components/CategorySelect';
import Links from 'components/Links';
import AddLinkButton from 'components/AddLinkButton';
import { Link } from 'interfaces';
import { dev } from 'constants/index';

type Props = {
  links: Link[] | [];
};

const Snackbar = dynamic(() => import('components/Snackbar'), {
  ssr: false,
});

const Modal = dynamic(() => import('components/modals/Modal'), {
  ssr: false,
});

const IndexPage: NextPage<Props> = ({ links }) => (
  <>
    <AuthProvider>
      <ModalProvider>
        <SnackbarProvider>
          <LinksProvider ssrLinks={links}>
            <NavBar />
            <Content data-testid="application">
              <CategorySelect />
              <MiddleContainer>
                <SearchBar />
                <Links />
              </MiddleContainer>
              <ButtonContainer>
                <AddLinkButton />
              </ButtonContainer>
            </Content>
            <Modal />
            <Snackbar />
          </LinksProvider>
        </SnackbarProvider>
      </ModalProvider>
    </AuthProvider>
  </>
);

IndexPage.getInitialProps = async ({ req }) => {
  let protocol = 'https:';
  const host = req ? req.headers.host : window.location.host;
  if (String(host).includes('localhost')) {
    protocol = 'http:';
  }

  let links = [];
  if (req || dev) {
    try {
      const res = await fetch(`${protocol}//${host}/api/links`);
      links = await res.json();
    } catch (error) {
      console.error(error);
    }
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
  width: 100%;

  --link-max-width: 70rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
`;

const MiddleContainer = styled.div``;

export default IndexPage;

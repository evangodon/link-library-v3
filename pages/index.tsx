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
import Header from 'components/Header';
import SearchBar from 'components/SearchBar';
import CategorySelect from 'components/CategorySelect';
import Links from 'components/Links';
import AddLinkButton from 'components/AddLinkButton';
import { Link } from 'interfaces';
import { dev } from 'constants/index';
import { media } from 'css/variables';
import DesktopOnly from 'components/layout/DesktopOnly';

const Snackbar = dynamic(() => import('components/Snackbar'), {
  ssr: false,
});

const Modal = dynamic(() => import('components/modals/Modal'), {
  ssr: false,
});

type Props = {
  links: Link[] | [];
};

const IndexPage: NextPage<Props> = ({ links }) => (
  <>
    <SnackbarProvider>
      <AuthProvider>
        <ModalProvider>
          <LinksProvider ssrLinks={links}>
            <Header />
            <Content data-testid="application">
              <DesktopOnly>
                <CategorySelect />
              </DesktopOnly>
              <MiddleContainer>
                <SearchBar />
                <Links />
              </MiddleContainer>
              <AddLinkButton />
            </Content>
            <Modal />
            <Snackbar />
          </LinksProvider>
        </ModalProvider>
      </AuthProvider>
    </SnackbarProvider>
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
  padding-top: 5rem;
  margin: 0 auto;
  max-width: var(--app-max-width);
  display: grid;
  grid-template-columns: 16rem 1fr 15rem;
  width: 100%;

  --link-max-width: 70rem;

  ${media.tablet`
    padding: 0 2.4rem;
    padding-top: 5rem;
    display: block;
  `}
`;

const MiddleContainer = styled.div`
  ${media.mobile`
      display: flex;
      flex-direction: column;
      align-items: center;
  `}
`;

export default IndexPage;

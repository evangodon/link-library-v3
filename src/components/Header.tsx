import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Book } from 'react-feather';
import NavItems from './NavItems';
import { media } from 'css/variables';

const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <Link href="/">
          <LogoContainer>
            <Logo />
            <h3>LinkLib</h3>
          </LogoContainer>
        </Link>
        <NavItems />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.06);
  width: 100%;
  background-color: var(--white);
`;

const LogoContainer = styled.a`
  cursor: pointer;
  display: grid;
  align-items: center;
  grid-template-columns: 3rem 1fr;
  height: 100%;
`;

const Logo = styled(Book)`
  color: var(--color-primary);
`;

const Content = styled.div`
  margin: 0 auto;
  max-width: var(--app-max-width);
  height: 6.4rem;
  display: flex;
  align-items: center;
  color: var(--black);
  display: flex;
  justify-content: space-between;

  ${media.tablet`
    padding: 0 2.4rem;
  `}
`;

export default Header;

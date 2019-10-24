import React from 'react';
import styled from 'styled-components';
import { Book } from 'react-feather';
import NavUtils from './NavUtils';
import { media } from 'css/variables';

const Header: React.FC = () => {
  return (
    <Container>
      <Content>
        <LogoContainer>
          <Book color="var(--color-primary)" />
          <h3>LinkLib</h3>
        </LogoContainer>
        <NavUtils />
      </Content>
    </Container>
  );
};

const Container = styled.div`
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.06);
  width: 100%;
  background-color: var(--white);
`;

const LogoContainer = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 3rem 1fr;
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

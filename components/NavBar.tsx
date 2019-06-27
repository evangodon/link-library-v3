import * as React from 'react';
import styled from 'styled-components';

const loggedIn = true;

const NavBar: React.FunctionComponent = () => {
  return (
    <Container>
      <Content>
        <span>LinkLib</span>
        {loggedIn ? <span>Logged in</span> : <span>Logged out</span>}
      </Content>
    </Container>
  );
};

const Container = styled.div`
  box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.06);
  width: 100%;
  background-color: var(--white);
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
`;

export default NavBar;

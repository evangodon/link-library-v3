import React from 'react';
import styled from 'styled-components';
import { GitHub } from 'react-feather';
import { useAuthContext } from 'context/index';

const GitHubLogin: React.FC = () => {
  const { loginWithGitHub } = useAuthContext();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    loginWithGitHub();
  }

  return (
    <Container onClick={handleClick}>
      <GitHub />
      Continue with GitHub
    </Container>
  );
};

const Container = styled.button`
  background-color: #333;
  border-color: #000;
  max-width: 30rem;
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius);
  padding: 0.8rem;
  position: relative;

  svg {
    width: 1.6rem;
    margin-right: 0.6rem;
    fill: var(--white);
    color: transparent;
  }
`;

export default GitHubLogin;

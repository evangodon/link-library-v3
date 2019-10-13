import * as React from 'react';
import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';
import { Book, GitHub } from 'react-feather';
import { useAuthContext } from 'context/index';

const NavBar: React.FC = () => {
  const { user, loginWithGitHub } = useAuthContext();

  function handleLogin() {
    loginWithGitHub();
  }

  const ProfileSection = () => {
    if (user === 'loading') {
      return (
        <Skeleton variant="circle" width={profilePicSize} height={profilePicSize} />
      );
    }

    if (!user) {
      return (
        <GitHubButton onClick={handleLogin}>
          <GitHub /> Login with GitHub
        </GitHubButton>
      );
    }

    return <ProfilePic url={user.photoURL} />;
  };

  return (
    <Container>
      <Content>
        <LogoContainer>
          <Book color="var(--color-primary)" />
          <h3>LinkLib</h3>
        </LogoContainer>
        <ProfileSection />
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
`;

const profilePicSize = '4rem';

const ProfilePic = styled.div<{ url: string }>`
  height: ${profilePicSize};
  width: ${profilePicSize};
  border-radius: 50%;
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: contain;
  border: 2px solid var(--color-primary);
`;

const GitHubButton = styled.button`
  display: flex;
  align-items: center;
  background-color: var(--grey-500);
  border: 0;
  color: #fff;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: var(--fs-small);
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: var(--grey-600);
  }

  svg {
    width: 1.4rem;
    margin-right: 0.4rem;
    color: currentColor;
  }
`;

export default NavBar;

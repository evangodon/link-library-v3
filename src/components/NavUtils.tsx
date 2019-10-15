import React, { useState } from 'react';
import styled from 'styled-components';
import Skeleton from '@material-ui/lab/Skeleton';
import Popover from '@material-ui/core/Popover';
import { GitHub } from 'react-feather';
import { useAuthContext } from 'context/index';

const NavUtils = () => {
  const { user, loginWithGitHub, logout } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  function handleMenuOpen(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  function handleLogout() {
    setAnchorEl(null);
    logout();
  }

  if (user === 'LOADING') {
    return (
      <Skeleton variant="circle" width={profilePicSize} height={profilePicSize} />
    );
  }

  if (!user) {
    return (
      <GitHubButton onClick={loginWithGitHub}>
        <GitHub /> Login
      </GitHubButton>
    );
  }

  return (
    <>
      <ProfilePic url={user.photoURL} onClick={handleMenuOpen} />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Options>
          <button onClick={handleLogout}>Logout</button>
        </Options>
      </Popover>
    </>
  );
};

const profilePicSize = '4rem';

const ProfilePic = styled.button<{ url: string }>`
  height: ${profilePicSize};
  width: ${profilePicSize};
  border-radius: 50%;
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: contain;
  border: 2px solid var(--color-primary);
  outline: none;
  cursor: pointer;
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

const Options = styled.div`
  cursor: pointer;

  button {
    padding: 1rem 2rem;
  }
`;

export default NavUtils;

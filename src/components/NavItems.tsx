import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Skeleton from '@material-ui/lab/Skeleton';
import Popover from '@material-ui/core/Popover';
import { useAuthContext } from 'context/index';

const NavItems = () => {
  const { user, logout } = useAuthContext();
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
      <Container>
        <Link href="/login">
          <NavButton>Login</NavButton>
        </Link>
        <Link href="/register">
          <NavButton>Register </NavButton>
        </Link>
      </Container>
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

const Container = styled.div`
  display: flex;
  align-items: baseline;
`;

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

const NavButton = styled.a`
  display: flex;
  align-items: center;
  border: 0;
  color: var(--grey-500);
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  font-size: var(--fs-medium);
  cursor: pointer;
  transition: background-color 0.2s ease;
`;

const Options = styled.div`
  cursor: pointer;

  button {
    padding: 1rem 2rem;
  }
`;

export default NavItems;

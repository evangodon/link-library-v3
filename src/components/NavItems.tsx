import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Skeleton from '@material-ui/lab/Skeleton';
import Popover from '@material-ui/core/Popover';
import { useAuthContext } from 'context/index';

const NavItems = () => {
  const router = useRouter();
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
        <Link href="/">
          <NavButton aria-current={router.route === '/' ? 'page' : false}>
            Home
          </NavButton>
        </Link>
        <Link href="/login">
          <NavButton aria-current={router.route === '/login' ? 'page' : false}>
            Login
          </NavButton>
        </Link>
        <Link href="/register">
          <NavButton aria-current={router.route === '/register' ? 'page' : false}>
            Register
          </NavButton>
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
  height: 100%;
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
  padding: 0.4rem 0;
  margin: 0 0.8rem;
  font-size: var(--fs-medium);
  cursor: pointer;
  transition: background-color 0.2s ease;
  height: 100%;

  &[aria-current='page'] {
    border-bottom: 2px solid currentColor;
  }
`;

const Options = styled.div`
  cursor: pointer;

  button {
    padding: 1rem 2rem;
  }
`;

export default NavItems;

import * as React from 'react';
import Link from 'components/Link';
import styled from 'styled-components';
import { useLinks } from 'hooks/useLinks';

const Links: React.FC = () => {
  const { links } = useLinks();
  return (
    <Container>
      {links.map((link) => (
        <Link link={link} key={link.id} />
      ))}
    </Container>
  );
};

const Container = styled.ul``;

export default Links;

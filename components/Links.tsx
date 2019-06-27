import * as React from 'react';
import { links } from 'constants/mockData';
import Link from 'components/Link';
import styled from 'styled-components';

const Links: React.FC = () => {
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

import * as React from 'react';
import styled from 'styled-components';
import { Link as ILink } from 'interfaces';

type Props = {
  link: Partial<ILink>;
};

const Link: React.FC<Props> = ({ link }) => {
  return (
    <Container>
      <Content href={link.url} target="_blank">
        <TextContainer>
          <Title>{link.title}</Title>
          <Description>{link.description}</Description>
          <Url>{link.url}</Url>
        </TextContainer>
        <Image src={link.image} />
      </Content>
    </Container>
  );
};

const Container = styled.li`
  position: relative;
  max-width: var(--link-max-width);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.18);
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 1.8rem;
  background: #fafafa;
  cursor: pointer;
`;

const Content = styled.a`
  display: grid;
  grid-template-columns: 1fr 20rem;
  align-items: center;
`;

const TextContainer = styled.div`
  padding: 1rem 2rem;
  max-width: 45rem;
`;

const Title = styled.h5`
  font-size: var(--fs-default);
  margin-bottom: 0.4rem;
  color: var(--grey-500);
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  color: rgba(55, 53, 47, 0.8);
`;

const Url = styled.span`
  font-size: 1.2rem;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Image = styled.div<{ src: string | undefined }>`
  max-width: 100%;
  min-width: 100%;
  height: 11rem;
  background-image: url(${(p) => p.src});
  background-size: cover;
`;

export default Link;

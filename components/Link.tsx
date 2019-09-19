import React from 'react';
import styled from 'styled-components';
import { Trash2 } from 'react-feather';
import Highlighter from 'react-highlight-words';
import { Link as ILink } from 'interfaces';
import { useModalContext, useLinksContext } from 'context';
import DeleteLinkModal from 'components/DeleteLinkModal';

type Props = {
  link: ILink;
  displayMode?: boolean;
};

const Link: React.FC<Props> = ({ link, displayMode }) => {
  const { toggleModal } = useModalContext();
  const { searchQuery } = useLinksContext();

  function handleDelete(event: React.MouseEvent<SVGElement>) {
    toggleModal(() => () => <DeleteLinkModal link={link} />);
    event.preventDefault();
  }

  return (
    <Container>
      <Content href={link.url} target="_blank">
        <TextContainer>
          <Title>
            {searchQuery ? (
              <Highlighter
                highlightClassName="highlight"
                searchWords={[searchQuery]}
                textToHighlight={link.title}
              />
            ) : (
              link.title
            )}
          </Title>
          <Description>{link.description}</Description>
          <Url>{link.url}</Url>
        </TextContainer>
        <Image src={link.image} />
        {!displayMode && (
          <DeleteContainer>
            <Trash2 className="Trash-icon" onClick={handleDelete} />
          </DeleteContainer>
        )}
      </Content>
    </Container>
  );
};

const DeleteContainer = styled.span`
  position: absolute;
  right: 1.2rem;
  top: 1.2rem;
  --size: 2.6rem;
  width: var(--size);
  height: var(--size);
  text-align: center;
  opacity: 0;
  background-color: var(--white);
  border-radius: 5px;
  color: var(--grey-400);
  border: 1px solid currentColor;
  transition: opacity 0.1s ease;

  .Trash-icon {
    width: 1.6rem;
    position: relative;
  }
`;

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

  &:hover ${DeleteContainer} {
    opacity: 1;
  }
`;

const Content = styled.a`
  display: grid;
  grid-template-columns: 1fr 20rem;
  align-items: center;
`;

const TextContainer = styled.div`
  padding: 1rem 2rem;
  max-width: 49.5rem;
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

import React from 'react';
import styled from 'styled-components';
import { Trash2, ExternalLink } from 'react-feather';
import Highlighter from 'react-highlight-words';
import { Link as ILink } from 'interfaces';
import { useModalContext, useLinksContext } from 'context';
import DeleteLinkModal from 'components/DeleteLinkModal';
import CategoryPill from './CategoryPill';
import { CATEGORIES } from '../constants/index';
import { lighten } from 'polished';

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

  const categoryData = CATEGORIES[link.category] || {};

  return (
    <Container data-testid="link">
      <Content>
        <TextContainer>
          <Title bgColor={categoryData.color}>
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
          <CategoryPill category={link.category} />
          <Description>{link.description}</Description>
          <Url href={link.url} target="_blank" rel="nooponer">
            <span>{link.url}</span>
            <ExternalLink size={16} />
          </Url>
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
  cursor: pointer;

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

  &:hover ${DeleteContainer} {
    opacity: 1;
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr 20rem;
  align-items: center;
  overflow: hidden;
  color: var(--grey-400);
`;

const TextContainer = styled.div`
  padding: 1rem 2rem;
  max-width: 39.5rem;
`;

const Title = styled.h5<{ bgColor: string }>`
  font-size: var(--fs-default);
  margin-bottom: 0.4rem;
  color: var(--grey-500);
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  .highlight {
    background-color: ${({ bgColor }) => (bgColor ? lighten(0.35, bgColor) : 'none')};
    padding: 2px;
    border-radius: 2px;
  }
`;

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  color: rgba(55, 53, 47, 0.8);
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 1;
  max-height: 2.6rem;
`;

const Url = styled.a`
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  color: var(--grey-400);

  span {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  svg {
    position: relative;
    bottom: 2px;
    margin-left: 0.4rem;
    opacity: 0;
  }

  &:hover svg {
    opacity: 1;
  }
`;

const Image = styled.div<{ src: string | undefined }>`
  max-width: 100%;
  min-width: 100%;
  height: 11rem;
  background-image: url(${(p) => p.src});
  background-size: cover;
`;

export default Link;

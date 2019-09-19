import React, { useState } from 'react';
import { createCtx } from './createCtx';
import { Link } from 'interfaces';

export const [useLinksContext, Provider] = createCtx<{
  links: readonly Link[];
  setLinks: (links: Link[]) => void;
  searchQuery: string | null;
  setSearchQuery: (query: string | null) => void;
}>();

export const LinksProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [links, setLinks] = useState<readonly Link[]>([]);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const filteredLinks = searchQuery
    ? links.filter((link: Link) =>
        link.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : links;

  return (
    <>
      <Provider value={{ links: filteredLinks, setLinks, searchQuery, setSearchQuery }}>
        {children}
      </Provider>
    </>
  );
};

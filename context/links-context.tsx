import React, { useState } from 'react';
import { createCtx } from './createCtx';
import { Link } from 'interfaces';

export const [useLinksContext, Provider] = createCtx<{
  links: Link[];
  setLinks: (links: Link[]) => void;
  searchQuery: string | null;
  setSearchQuery: (query: string | null) => void;
}>();

export const LinksProvider: React.FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [links, setLinks] = useState<Link[]>([]);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const filteredLinks = links.filter(
    searchQuery
      ? (link: Link) => link.title.toLowerCase().includes(searchQuery.toLowerCase())
      : () => true
  );

  return (
    <>
      <Provider value={{ links: filteredLinks, setLinks, searchQuery, setSearchQuery }}>
        {children}
      </Provider>
    </>
  );
};

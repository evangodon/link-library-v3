import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createCtx } from './createCtx';
import { Link } from 'interfaces';

export const [useLinksContext, Provider] = createCtx<{
  links: readonly Link[];
  setLinks: (links: Link[]) => void;
  searchQuery: string | null;
  setSearchQuery: (query: string | null) => void;
}>();

export const LinksProvider: React.FC<{
  children: React.ReactElement | React.ReactElement[];
}> = ({ children }) => {
  const router = useRouter();
  const { query } = router;

  const initialValue = query.search
    ? Array.isArray(query.search)
      ? query.search[0]
      : query.search
    : null;

  const [links, setLinks] = useState<readonly Link[]>([]);
  const [searchQuery, setSearchQuery] = useState<string | null>(initialValue);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (searchQuery) {
      params.set('search', searchQuery);
      router.replace('/?' + params.toString());
    } else {
      params.delete('search');
      router.replace('/' + params.toString());
    }
  }, [searchQuery]);

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

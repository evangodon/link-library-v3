import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { createCtx } from './createCtx';
import { Link, Category } from 'interfaces';

export const [useLinksContext, Provider] = createCtx<{
  links: readonly Link[];
  setLinks: (links: Link[]) => void;
  searchQuery: string | null;
  setSearchQuery: (query: string | null) => void;
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
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
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (searchQuery) {
      params.set('search', searchQuery);
    } else {
      params.delete('search');
    }

    if (selectedCategory) {
      params.set('category', selectedCategory);
    } else {
      params.delete('category');
    }

    const newParams = params.toString();
    router.replace(newParams ? `/?${newParams}` : '/');
  }, [searchQuery, selectedCategory]);

  const filteredLinks = searchQuery
    ? links.filter((link: Link) =>
        link.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : links;

  return (
    <>
      <Provider
        value={{
          links: filteredLinks,
          setLinks,
          searchQuery,
          setSearchQuery,
          selectedCategory,
          setSelectedCategory,
        }}
      >
        {children}
      </Provider>
    </>
  );
};

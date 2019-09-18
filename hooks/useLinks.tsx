import { useEffect } from 'react';
import fetch from 'node-fetch';
import { useLinksContext } from 'context';

export const useLinks = () => {
  const { links, setLinks } = useLinksContext();

  useEffect(() => {
    fetch('/api/links')
      .then((res) => res.json())
      .then((json) => {
        setLinks(json);
      });
  }, [setLinks]);

  return { links };
};

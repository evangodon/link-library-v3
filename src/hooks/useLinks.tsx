import { useEffect, useRef } from 'react';
import fetch from 'node-fetch';
import { useLinksContext } from 'context';

export const useLinks = () => {
  const { links, setLinks } = useLinksContext();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isFirstRender.current) {
      fetch('/api/links')
        .then((res) => res.json())
        .then((json) => {
          setLinks(json);
        });
    }
    isFirstRender.current = false;
  }, []);

  return { links };
};

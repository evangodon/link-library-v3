import { useState, useEffect } from 'react';
import fetch from 'node-fetch';

interface Link {
  id: string;
  url: string;
  title: string;
  description: string;
  image: string;
}

export const useLinks = () => {
  const [links, setLinks] = useState<Link[]>([]);

  useEffect(() => {
    fetch('/api/links')
      .then((res) => res.json())
      .then((json) => {
        setLinks(json);
      });
  }, []);

  return { links };
};

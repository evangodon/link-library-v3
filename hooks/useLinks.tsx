import { useState, useEffect } from 'react';
import fetch from 'node-fetch';
import { Link } from 'interfaces';

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

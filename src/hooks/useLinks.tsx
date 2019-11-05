import { useEffect } from 'react';
import { useLinksContext } from 'context/index';
import { db } from '@api/firebase';

export const useLinks = () => {
  const { links, setLinks } = useLinksContext();

  useEffect(() => {
    const unsubscribe = db
      .collection('links')
      .orderBy('createdAt', 'desc')
      .onSnapshot((snapshot) => {
        const newLinks: any[] = snapshot.docs.map((link) => ({
          id: link.id,
          ...link.data(),
        }));

        setLinks(newLinks);
      });

    return unsubscribe;
  }, []);

  return { links };
};

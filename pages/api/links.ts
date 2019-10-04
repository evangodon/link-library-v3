import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@api/firebase';

export default (_req: NextApiRequest, res: NextApiResponse) => {
  db.collection('links')
    .orderBy('createdAt', 'desc')
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((link) => ({
        id: link.id,
        ...link.data(),
      }));

      res.status(200).json(data);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

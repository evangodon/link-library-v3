import { NextApiRequest, NextApiResponse } from 'next';
import { db } from './firebase';

export default (_req: NextApiRequest, res: NextApiResponse) => {
  db.collection('links')
    .orderBy('createdAt', 'desc')
    .get()
    .then((snapshot) => {
      const data = snapshot.docs.map((link) => ({
        id: link.id,
        ...link.data(),
      }));
      res.statusCode = 200;
      res.end(JSON.stringify(data));
    });
};

import { NextApiRequest, NextApiResponse } from 'next';
import {db} from '../firebase'

export default (_req: NextApiRequest, res: NextApiResponse) => {
  console.log('hello');
  db.collection('links')
  .get()
  .then((snapshot) => {
    const data = snapshot.docs.map((link) => ({
      id: link.id,
      ...link.data(),
    }));
    res.end(JSON.stringify(data));
  });
};


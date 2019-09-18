import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../firebase';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = JSON.parse(req.body);

  db.collection('links')
    .doc(id)
    .delete()
    .then(() => {
      res.statusCode = 200;
      res.send(JSON.stringify({ message: 'Link successfully deleted' }));
    })
    .catch((error) => {
      console.error(error);
    });
};

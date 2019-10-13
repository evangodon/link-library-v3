import { NextApiRequest, NextApiResponse } from 'next';
import { firestore } from '@api/firebase';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = JSON.parse(req.body);

  firestore
    .collection('links')
    .doc(id)
    .delete()
    .then(() => {
      res.status(200).json({ message: 'Link successfully deleted' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: error.message });
    });
};

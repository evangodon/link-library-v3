import { NextApiRequest, NextApiResponse } from 'next';
import firebase from 'firebase/app';
import { firestore } from '@api/firebase';
import { Link } from 'interfaces';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const link: Link = JSON.parse(req.body);

  firestore
    .collection('links')
    .doc(String(link.id))
    .set(
      { ...link, updatedAt: firebase.firestore.FieldValue.serverTimestamp() },
      { merge: true }
    )
    .then(() => {
      res.status(200).json(link);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

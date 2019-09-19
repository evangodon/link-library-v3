import { NextApiRequest, NextApiResponse } from 'next';
import firebase from 'firebase/app';
import { db } from '../firebase';
import { Link } from 'interfaces';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const data: Link = JSON.parse(req.body);

  const { id, ...values } = data;

  db.collection('links')
    .add({
      ...values,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then((docRef) => {
      docRef.get().then((doc) => {
        const newLink = { id: doc.id, ...doc.data() };

        res.status(200).json(newLink);
      });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

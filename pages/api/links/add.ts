import { NextApiRequest, NextApiResponse } from 'next';
import firebase from 'firebase/app';
import { db } from '../firebase';
import { Link } from 'interfaces';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const data: Link = JSON.parse(req.body);

  db.collection('links').add({
    ...data,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
  });

  res.send(200);
};

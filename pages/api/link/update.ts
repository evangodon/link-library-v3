import { NextApiRequest, NextApiResponse } from 'next';
import firebase from 'firebase/app';
import { db } from '@api/firebase';
import { Link } from 'interfaces';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const link: Link = JSON.parse(req.body);

  const createdAt = link.createdAt
    ? new firebase.firestore.Timestamp(
        link.createdAt.seconds,
        link.createdAt.nanoseconds
      )
    : firebase.firestore.FieldValue.serverTimestamp();

  try {
    await db
      .collection('links')
      .doc(String(link.id))
      .set(
        {
          ...link,
          createdAt,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );
    res.status(200).json(link);
  } catch (error) {
    res.json({ error: error.message });
  }
};

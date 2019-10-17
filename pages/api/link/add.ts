import { NextApiRequest, NextApiResponse } from 'next';
import firebase from 'firebase/app';
import { firestore } from '@api/firebase';
import { Link } from 'interfaces';
import { withAuth } from '@api/middleware/withAuth';

export default withAuth(async (req: NextApiRequest, res: NextApiResponse) => {
  const data: Link = JSON.parse(req.body);

  const { id, ...values } = data;

  try {
    const docRef = await firestore.collection('links').add({
      ...values,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    const doc = await docRef.get();
    const newLink = { id: doc.id, ...doc.data() };

    res.status(200).json(newLink);
  } catch (error) {
    res.json({ error: error.message });
  }
});

import { NextApiRequest, NextApiResponse } from 'next';
import { firestore } from '@api/firebase';

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  try {
    const snapshot = await firestore
      .collection('links')
      .orderBy('createdAt', 'desc')
      .get();

    const data = snapshot.docs.map((link) => ({
      id: link.id,
      ...link.data(),
    }));

    res.status(200).json(data);
  } catch (error) {
    res.json({ error: error.message });
  }
};

import { NextApiRequest, NextApiResponse } from 'next';
import { admin } from '@api/firebaseAdmin';

const unauthorized = (res: NextApiResponse) =>
  res.status(401).json({ message: 'User not signed in' });

export const withAuth = (
  route: (req: NextApiRequest, res: NextApiResponse) => void
) => (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.cookies;

  if (!token) {
    return unauthorized(res);
  }

  admin
    .auth()
    .verifyIdToken('akjhsfd')
    .then(() => {
      return route(req, res);
    })
    .catch((error) => {
      console.error(error);
      return unauthorized(res);
    });
};

import * as admin from 'firebase-admin';

console.log('GOOGLE cloud', process.env.GOOGLE_CLOUD_PROJECT);

if (admin.apps.length === 0) {
  admin.initializeApp();
}

export { admin };

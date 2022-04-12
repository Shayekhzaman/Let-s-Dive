import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBo6a7drLBHN_wk1KwzwG66YC0Su4FSRf4",
    authDomain: "lets-s-drive-admin.firebaseapp.com",
    projectId: "lets-s-drive-admin",
    storageBucket: "lets-s-drive-admin.appspot.com",
    messagingSenderId: "560592571334",
    appId: "1:560592571334:web:e4fe3ee29ed9f1db1800c7"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  
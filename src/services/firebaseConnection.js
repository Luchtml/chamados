import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDwiQHermX92nKTVcSi09D6WaBPYGiUpQE',
  authDomain: 'chamados-ed584.firebaseapp.com',
  projectId: 'chamados-ed584',
  storageBucket: 'chamados-ed584.appspot.com',
  messagingSenderId: '943216580063',
  appId: '1:943216580063:web:af5772d9d3e57dc8b4606a',
  measurementId: 'G-RT7GC86MXC',
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, db, storage };

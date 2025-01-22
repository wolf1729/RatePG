import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_APPID 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const auth = getAuth(app);

async function registerEmail(email, password) {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    return response
  }
  catch(err) {
    console.log(err)
  }
}

async function uploadFileInStorage(file, filename) {
  try {
    const storageRef = ref(storage, `pgImages/${filename}`);
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL)
    return downloadURL
  } 
  catch (error) {
    console.error('Error uploading file:', error); 
  }
}

export { uploadFileInStorage, registerEmail }
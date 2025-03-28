import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'

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
const googleProvider = new GoogleAuthProvider()

async function registerEmail(email, password) {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    return response
  }
  catch(err) {
    console.log(err)
  }
}

async function loginEmail(email, password) {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password)
    return response
  }
  catch(err) {
    console.log(err)
  }
}

async function registerGoogle() {
  try {
      const response = await signInWithPopup(auth, googleProvider);
      console.log(response)
      return response;
  } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
          console.info("User closed the Google sign-in popup.");
          return null; // Return null to indicate no action
      }
      console.error(`Google sign-in error: ${err.code} - ${err.message}`);
      throw err;
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

async function uploadProfileImage(file, uid) {
  try {
    const storageRef = ref(storage, `profileImages/${uid}/profileImage`);
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);
    console.log(downloadURL)
    return downloadURL
  }
  catch (error) {
    console.error('Error uploading file:', error); 
  }
}

export { uploadFileInStorage, registerEmail, loginEmail, registerGoogle, uploadProfileImage }
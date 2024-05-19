import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSrkOdmp2lMrf2FRLV-LgQ2SZ_jambj64",
  authDomain: "ratepg-767f9.firebaseapp.com",
  projectId: "ratepg-767f9",
  storageBucket: "ratepg-767f9.appspot.com",
  messagingSenderId: "582037863872",
  appId: "1:582037863872:web:572f01b74501c1467e5c25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)


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

export { uploadFileInStorage }
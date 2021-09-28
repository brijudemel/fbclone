import { initializeApp,getApps,getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDEDVPobq0VS0L6PdBkJXumPqb2EloRC6Y",
  authDomain: "socialmediaapp-b167d.firebaseapp.com",
  projectId: "socialmediaapp-b167d",
  storageBucket: "socialmediaapp-b167d.appspot.com",
  messagingSenderId: "301953092946",
  appId: "1:301953092946:web:8bae61feb2d1ca3094be8b"
};

const app=getApps().length===0?initializeApp(firebaseConfig):getApp();
const db=getFirestore(app);
const storage=getStorage(app);

export {db,storage};
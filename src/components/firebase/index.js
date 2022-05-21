import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getFirestore} from "@firebase/firestore"

// Set the configuration for your app
// TODO: Replace with your app's config object
const firebaseConfig = {
  apiKey: "AIzaSyArjARPCvAVqU2NvPBoEFmyy5wE6tnUv-o",
  authDomain: "react-60170.firebaseapp.com",
  databaseURL: "https://react-60170-default-rtdb.firebaseio.com",
  projectId: "react-60170",
  storageBucket: "react-60170.appspot.com",
  messagingSenderId: "728908449543",
  appId: "1:728908449543:web:edbb5aeedca3a77e6067a2"
};
export const app = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(app);
export const db=getFirestore(app)
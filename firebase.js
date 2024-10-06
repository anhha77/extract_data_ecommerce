// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKhDwn_Wnb70qbqvTv79ZQEZqYlnyrTGM",
  authDomain: "e-commerce-61367.firebaseapp.com",
  projectId: "e-commerce-61367",
  storageBucket: "e-commerce-61367.appspot.com",
  messagingSenderId: "29487615266",
  appId: "1:29487615266:web:e3ed18063c2a38abd7a97b",
  measurementId: "G-NW08JKVMHL",
};

// Initialize Firebase
const fireBaseExtension = initializeApp(firebaseConfig);

const fireBaseUpload = async (fireBase, name, image) => {
  const storage = getStorage(fireBase);
  const storageRef = ref(storage, `${name}/${image.name}`);
  await uploadBytes(storageRef, image);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

module.exports = { fireBaseExtension, fireBaseUpload };

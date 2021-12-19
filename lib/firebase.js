//! Should be hidden before deployment

import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP20Y0iaXHLpqfq6OM2KgQuXHH-t0RpRU",
  authDomain: "connect-75c53.firebaseapp.com",
  projectId: "connect-75c53",
  storageBucket: "connect-75c53.appspot.com",
  messagingSenderId: "909646126066",
  appId: "1:909646126066:web:6d75b61aba1e720e35e96b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

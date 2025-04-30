import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDB0O6OWTVb7RShaCU2XRve447eLpwyo44",
    authDomain: "movie-explorer-5ca5c.firebaseapp.com",
    projectId: "movie-explorer-5ca5c",
    storageBucket: "movie-explorer-5ca5c.firebasestorage.app",
    messagingSenderId: "624347596067",
    appId: "1:624347596067:web:01ba6c436d163b67c47896",
    measurementId: "G-K8X6D052DK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Export the app object for use in other modules
export { app, auth };
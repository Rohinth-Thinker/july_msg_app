
import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAhnbrQB8t7l_jmTck31a028dRlgfcb8xo",
    authDomain: "sample3-be258.firebaseapp.com",
    projectId: "sample3-be258",
    storageBucket: "sample3-be258.firebasestorage.app",
    messagingSenderId: "331012314038",
    appId: "1:331012314038:web:799075615fbf4a60ee2717"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};
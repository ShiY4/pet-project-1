import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, addDoc, collection } from 'firebase/firestore';

const config = {
    apiKey: "AIzaSyAqQ0XLTSjn29Ln249FcRfScyupM6d920A",
    authDomain: "test-project-1-b4f6b.firebaseapp.com",
    projectId: "test-project-1-b4f6b",
    storageBucket: "test-project-1-b4f6b.appspot.com",
    messagingSenderId: "254430473177",
    appId: "1:254430473177:web:8069d903f1a55f8ee6c7c8",
    measurementId: "G-M8LBEYZ2PS"
};

const firebaseApp = initializeApp(config);
const db = getFirestore(firebaseApp);

export default db;

export async function getItems (ref){
    const data = await getDocs(ref);
    return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export async function getCategories (ref){
    const data = await getDocs(ref);
    const newData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log('getCategories:', newData);
    return newData
};
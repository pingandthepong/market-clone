import { initializeApp } from "firebase/app";
// import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  databaseURL:
    "https://carrot-market-ea850-default-rtdb.asia-southeast1.firebasedatabase.app/",
  apiKey: "335474275586356",
  authDomain: "https://carrot-market-ea850.web.app/",
  projectId: "carrot-market-ea850",
};

const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);
export const db = getFirestore(app);

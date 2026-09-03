// import { initializeApp, cert, getApps } from "firebase-admin/app";
// import fs from "fs";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const serviceAccountPath = path.resolve(
//   __dirname,
//   "../../naamjapa-app-firebase-adminsdk-fbsvc-318a4289b9.json"
// );

// if (!fs.existsSync(serviceAccountPath)) {
//   throw new Error(
//     "Firebase service account file not found: " + serviceAccountPath
//   );
// }

// const serviceAccount = JSON.parse(
//   fs.readFileSync(serviceAccountPath, "utf8")
// );

// const firebaseApp = getApps().length
//   ? getApps()[0]
//   : initializeApp({
//       credential: cert(serviceAccount),
//     });

// export default firebaseApp;




import { initializeApp, cert, getApps } from "firebase-admin/app";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let serviceAccount;

if (process.env.FIREBASE_PROJECT_ID) {
  // Production: use Render environment variables
  serviceAccount = {
    type: "service_account",
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    client_email: process.env.FIREBASE_CLIENT_EMAIL,
  };
} else {
  // Local development: use the Firebase Admin JSON file
  const serviceAccountPath = path.resolve(
    __dirname,
    "../../naamjapa-app-firebase-adminsdk-fbsvc-318a4289b9.json"
  );

  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(
      "Firebase service account file not found: " + serviceAccountPath
    );
  }

  serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, "utf8")
  );
}

const firebaseApp = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert(serviceAccount),
    });

export default firebaseApp;
import { initializeApp, cert, getApps } from "firebase-admin/app";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = path.resolve(
  __dirname,
  "../../naamjapa-app-firebase-adminsdk-fbsvc-318a4289b9.json"
);

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(
    "Firebase service account file not found: " + serviceAccountPath
  );
}

const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf8")
);

const firebaseApp = getApps().length
  ? getApps()[0]
  : initializeApp({
      credential: cert(serviceAccount),
    });

export default firebaseApp;
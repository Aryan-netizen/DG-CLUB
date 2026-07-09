import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let cachedAuth: Auth | undefined;

function getAuthInstance(): Auth {
  if (typeof window === "undefined") {
    throw new Error("Firebase Auth is only available on the client.");
  }

  if (!cachedAuth) {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    cachedAuth = getAuth(app);
  }

  return cachedAuth;
}

export const auth: Auth = new Proxy({} as Auth, {
  get(_target, prop) {
    const instance = getAuthInstance();
    const value = instance[prop as keyof Auth];
    return typeof value === "function"
      ? (value as (...args: unknown[]) => unknown).bind(instance)
      : value;
  },
});

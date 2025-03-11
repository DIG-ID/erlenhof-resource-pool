import { app } from "../firebase/server";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

const auth = getAuth(app);

export function authSession() {
  /* Check current session */
  if (!Astro.cookies.has("__session")) {
    return Astro.redirect("/login");
  }
  const sessionCookie = Astro.cookies.get("__session").value;
  const decodedCookie = await auth.verifySessionCookie(sessionCookie);
  const user = await auth.getUser(decodedCookie.uid);

  if (!user) {
    return Astro.redirect("/login");
  }
}

export function userSession() {
  const db = getFirestore(app);
  const userRef = db.collection("users").doc(decodedCookie.uid);
  const userDoc = await userRef.get();
  
  // Dados adicionais do Firestore
  const userDB = userDoc.data();
  
  //console.log(user);
  //console.log(userDB);
  
  const userData = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    role: userDB?.role,
    name: userDB?.name,
    surname: userDB?.surname,
    isActive: userDB?.isActive,
    createdAt: userDB?.createdAt?.toDate(),
  };
}

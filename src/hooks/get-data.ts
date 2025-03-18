import { auth, firestore } from "@/firebase/server";
import type { UserData, UserAuth, UserFirestore, Role, State, Job } from "@/lib/types";

// Function to fetch Firebase Authentication user data
async function getUserAuth(id: string): Promise<UserAuth | null> {
  try {
    const userRecord = await auth.getUser(id);
    return {
      id: userRecord.uid,
      displayName: userRecord.displayName || "",
      email: userRecord.email || "",
      emailVerified: userRecord.emailVerified,
      creationTime: userRecord.metadata.creationTime,
      lastSignInTime: userRecord.metadata.lastSignInTime,
    };
  } catch (error) {
    console.error("Erro ao buscar dados do Firebase Authentication:", error);
    return null;
  }
}

// Function to fetch Firestore user data
async function getUserFirestore(id: string): Promise<UserFirestore | null> {
  const usersRef = firestore.collection("users");
  const userSnapshot = await usersRef.doc(id).get();

  if (userSnapshot.exists) {
    return userSnapshot.data() as UserFirestore;
  }

  return null;
}

// Function to merge user data from both Firebase Authentication and Firestore
export async function getUserData(id: string): Promise<UserData | null> {
  const userAuth = await getUserAuth(id);
  const userFirestore = await getUserFirestore(id);

  if (!userAuth || !userFirestore) {
    return null;
  }

  return {
    ...userFirestore,
    displayName: userAuth.displayName || userFirestore.name,
    email: userAuth.email || userFirestore.email,
    emailVerified: userAuth.emailVerified || false,
    creationTime: userAuth.creationTime || "",
    lastSignInTime: userAuth.lastSignInTime || "",
  };
}

// Function to get Role data from Firestore
export async function getRolesData(): Promise<Role[] | null> {
  const rolesRef = firestore.collection("roles");
  const rolesSnapshot = await rolesRef.get();
  
  // Mapping Firestore docs to role objects
  const roles = rolesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Role[];

  return roles.length ? roles : null;
}

// Function to get Status data from Firestore
export async function getStatusData(): Promise<State[] | null> {
  const statusRef = firestore.collection("status");
  const statusSnapshot = await statusRef.get();
  
  // Mapping Firestore docs to status objects
  const status = statusSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as State[];

  return status.length ? status : null;
}

/**
 * Obtém todos os jobs do Firestore.
 * @returns Lista de jobs ou null se não houver jobs disponíveis.
 */
export async function getJobsData(): Promise<Job[] | null> {
  try {
    const jobsRef = firestore.collection("jobs");
    const jobsSnapshot = await jobsRef.get();

    if (jobsSnapshot.empty) {
      return null;
    }

    // Converte os documentos Firestore para objetos `Job`
    const jobs: Job[] = jobsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Job[];

    return jobs;
  } catch (error) {
    console.error("Erro ao buscar jobs do Firestore:", error);
    return null;
  }
}


/**
 * Obtém todos os jobs do Firestore associados ao user.
 * @returns Lista de jobs ou null se não houver jobs disponíveis.
 */
export async function getUserJobs(userId: string): Promise<Job[]> {
  try {
    const jobsRef = firestore.collection("jobs");
    
    // 🔍 Buscar jobs onde `assignedTo.id` seja igual ao `userId`
    const userJobsSnapshot = await jobsRef.where("assignedTo.id", "==", userId).get();

    if (userJobsSnapshot.empty) {
      return []; // Retorna array vazio se não houver jobs
    }

    return userJobsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Job[];
  } catch (error) {
    console.error("❌ Error fetching user jobs:", error);
    return [];
  }
}

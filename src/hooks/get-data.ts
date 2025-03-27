import { auth, firestore } from "@/firebase/server";
import type { UserData, UserAuth, UserFirestore, Roles, Statuses, Jobs, Education, Skills, Pools, Shifts } from "@/lib/types";

// 🔹 Buscar dados do Firebase Authentication
async function getUserAuth(id: string): Promise<UserAuth | null> {
  try {
    const userRecord = await auth.getUser(id);
    return {
      id: userRecord.uid,
      displayName: userRecord.displayName || "",
      email: userRecord.email || "",
      emailVerified: userRecord.emailVerified,
      phoneNumber: userRecord.phoneNumber || "",
      photoURL: userRecord.photoURL || "", // 🔹 Adicionado
      creationTime: userRecord.metadata.creationTime,
      lastSignInTime: userRecord.metadata.lastSignInTime,
      lastRefreshTime: userRecord.metadata.lastRefreshTime || null, // 🔹 Mais seguro que `""`
      disabled: userRecord.disabled,
    };
  } catch (error) {
    console.error("❌ Erro ao buscar dados do Firebase Authentication:", error);
    return null;
  }
}

// 🔹 Buscar dados do Firestore
async function getUserFirestore(id: string): Promise<UserFirestore | null> {
  try {
    const userRef = firestore.collection("users").doc(id);
    const userSnapshot = await userRef.get();

    if (!userSnapshot.exists) {
      return null;
    }

    const userData = userSnapshot.data() as UserFirestore;
    return { ...userData, id }; // 🔹 Garantir que `id` está sempre presente
  } catch (error) {
    console.error("❌ Erro ao buscar dados do Firestore:", error);
    return null;
  }
}

// 🔹 Juntar dados do Authentication e Firestore
export async function getUserData(id: string): Promise<UserData | null> {
  const userAuth = await getUserAuth(id);
  const userFirestore = await getUserFirestore(id);

  if (!userAuth || !userFirestore) {
    return null; // 🔹 Se um dos dois não existir, retorna `null`
  }

  return {
    ...userAuth, // 🔹 Garante que dados do Authentication são mantidos
    ...userFirestore, // 🔹 Garante que dados do Firestore são mantidos
    displayName: userAuth.displayName || userFirestore.name, // 🔹 Se faltar `displayName`, usa `name`
    email: userAuth.email,
    education: userFirestore.education || "", // 🔹 Garante que `education` está presente
    pool: userFirestore.pool || "", // 🔹 Garante que `pool` está presente
    skills: userFirestore.skills || [], // 🔹 Garante que `skills` é um array válido
  };
}


// Function to get Role data from Firestore
export async function getRolesData(): Promise<Roles[] | null> {
  const rolesRef = firestore.collection("roles");
  const rolesSnapshot = await rolesRef.get();
  
  // Mapping Firestore docs to role objects
  const roles = rolesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Roles[];

  return roles.length ? roles : null;
}


/**
 * Obtém todos os jobs do Firestore.
 * @returns Lista de jobs ou null se não houver jobs disponíveis.
 */
export async function getJobsData(): Promise<Jobs[] | null> {
  try {
    const jobsRef = firestore.collection("jobs");
    const jobsSnapshot = await jobsRef.get();

    if (jobsSnapshot.empty) {
      return null;
    }

    // Converte os documentos Firestore para objetos `Job`
    const jobs: Jobs[] = jobsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Jobs[];

    return jobs;
  } catch (error) {
    console.error("❌ Erro ao buscar jobs do Firestore:", error);
    return null;
  }
}


// 🔹 Buscar dados de um único job
export async function getJobSingleData(id: string): Promise<Jobs | null> {
  try {
    const jobsRef = firestore.collection("jobs");
    const jobSnapshot = await jobsRef.doc(id).get();

    if (!jobSnapshot.exists) {
      return null;
    }

    const job = jobSnapshot.data() as Jobs;
    return job;
  } catch (error) {
    console.error("❌ Erro ao buscar job do Firestore:", error);
    return null;
  }
}


/**
 * Obtém todos os jobs do Firestore associados ao user.
 * @returns Lista de jobs ou null se não houver jobs disponíveis.
 */
export async function getUserJobs(userId: string): Promise<Jobs[]> {
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
    })) as Jobs[];
  } catch (error) {
    console.error("❌ Error fetching user jobs:", error);
    return [];
  }
}

// Function to get Status data from Firestore
export async function getPoolsData(): Promise<Pools[] | null> {
  const poolsRef = firestore.collection("pools");
  const poolsSnapshot = await poolsRef.get();
  
  // Mapping Firestore docs to status objects
  const pools = poolsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Pools[];

  return pools.length ? pools : null;
}

// Function to get Status data from Firestore
export async function getStatusesData(): Promise<Statuses[] | null> {
  const statusesRef = firestore.collection("statuses");
  const statusesSnapshot = await statusesRef.get();
  
  // Mapping Firestore docs to status objects
  const statuses = statusesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Statuses[];

  return statuses.length ? statuses : null;
}

// Function to get Education data from Firestore
export async function getEducationData(): Promise<Education[] | null> {
  const eduRef = firestore.collection("education");
  const eduSnapshot = await eduRef.get();
  const edu = eduSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Education[];

  return edu.length ? edu : null;
}

// Function to get Skills data from Firestore
export async function getSkillsData(): Promise<Skills[] | null> {
  const skillsRef = firestore.collection("skills");
  const skillsSnapshot = await skillsRef.get();
  const skills = skillsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Skills[];

  return skills.length ? skills : null;
}

// Function to get Shift data from Firestore
export async function getShiftsData(): Promise<Shifts[] | null> {
  const shiftsRef = firestore.collection("shifts");
  const shiftsSnapshot = await shiftsRef.get();
  const shifts = shiftsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Shifts[];

  return shifts.length ? shifts : null;
}

/**
 * 🔹 Obtém todos os utilizadores independentemente do `role`
 */
export async function getAllUsersData(): Promise<UserData[]> {
  try {
    const usersRef = firestore.collection("users");
    const usersSnapshot = await usersRef.get();

    if (usersSnapshot.empty) return [];

    return usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as UserData[];
  } catch (error) {
    console.error("❌ Erro ao buscar todos os utilizadores:", error);
    return [];
  }
}

/**
 * 🔹 Obtém todos os utilizadores ependentemente do `role`
 */
export async function getUsersByRole(role: string): Promise<UserData[]> {
  try {
    const usersRef = firestore.collection("users");
    const usersSnapshot = await usersRef.where("role", "==", role).get();

    if (usersSnapshot.empty) return [];

    return usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as UserData[];
  } catch (error) {
    console.error(`❌ Erro ao buscar utilizadores com role '${role}':`, error);
    return [];
  }
}

/**
 * Conta jobs com status "open", "done", e o total de jobs.
 */
export async function getJobCounts() {
  try {
    const [openSnap, doneSnap, totalSnap] = await Promise.all([
      firestore.collection("jobs").where("status.id", "==", "open").count().get(),
      firestore.collection("jobs").where("status.id", "==", "close").count().get(),
      firestore.collection("jobs").count().get(),
    ]);

    return {
      open: openSnap.data().count,
      closed: doneSnap.data().count,
      total: totalSnap.data().count,
    };
  } catch (error) {
    console.error("❌ [Job Counts] Erro:", error);
    return { open: 0, closed: 0, total: 0 };
  }
}


/**
 * Conta utilizadores por estado ativo e total de role "user".
 */
export async function getUserCounts() {
  try {
    const [activeSnap, inactiveSnap, userRoleSnap] = await Promise.all([
      firestore.collection("users").where("isActive", "==", true).count().get(),
      firestore.collection("users").where("isActive", "==", false).count().get(),
      firestore.collection("users").where("role", "==", "user").count().get(), // ajusta se role for um objeto
    ]);

    return {
      active: activeSnap.data().count,
      inactive: inactiveSnap.data().count,
      totalUsers: userRoleSnap.data().count,
    };
  } catch (error) {
    console.error("❌ [User Counts] Erro:", error);
    return { active: 0, inactive: 0, totalUsers: 0 };
  }
}
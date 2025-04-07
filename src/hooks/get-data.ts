// 🔐 UTILIZADOR (AUTH & FIRESTORE)
import { auth, firestore } from "@/firebase/server";
import { Timestamp } from "firebase-admin/firestore";
import type {
  UserData,
  UserAuth,
  UserFirestore,
  Roles,
  Statuses,
  Jobs,
  Education,
  Skills,
  Pools,
  Shifts,
} from "@/lib/types";

async function getUserAuth(id: string): Promise<UserAuth | null> {
  try {
    const userRecord = await auth.getUser(id);
    return {
      id: userRecord.uid,
      displayName: userRecord.displayName || "",
      email: userRecord.email || "",
      emailVerified: userRecord.emailVerified,
      phoneNumber: userRecord.phoneNumber || "",
      photoURL: userRecord.photoURL || "",
      creationTime: userRecord.metadata.creationTime,
      lastSignInTime: userRecord.metadata.lastSignInTime,
      lastRefreshTime: userRecord.metadata.lastRefreshTime || null,
      disabled: userRecord.disabled,
    };
  } catch (error) {
    console.error("❌ Erro ao buscar dados do Firebase Authentication:", error);
    return null;
  }
}

async function getUserFirestore(id: string): Promise<UserFirestore | null> {
  try {
    const userRef = firestore.collection("users").doc(id);
    const userSnapshot = await userRef.get();
    if (!userSnapshot.exists) return null;
    const userData = userSnapshot.data() as UserFirestore;
    return { ...userData, id };
  } catch (error) {
    console.error("❌ Erro ao buscar dados do Firestore:", error);
    return null;
  }
}

export async function getUserData(id: string): Promise<UserData | null> {
  const userAuth = await getUserAuth(id);
  const userFirestore = await getUserFirestore(id);
  if (!userAuth || !userFirestore) return null;

  return {
    ...userAuth,
    ...userFirestore,
    displayName: userAuth.displayName || userFirestore.name,
    email: userAuth.email,
    education: userFirestore.education || "",
    pool: userFirestore.pool || "",
    skills: userFirestore.skills || [],
  };
}

// 📊 ESTATÍSTICAS
export async function getJobCounts() {
  try {
    const [openSnap, doneSnap, totalSnap] = await Promise.all([
      firestore.collection("jobs").where("status.id", "==", "open").count().get(),
      firestore.collection("jobs").where("status.id", "==", "closed").count().get(),
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

export async function getUserCounts() {
  try {
    const [activeSnap, inactiveSnap, userRoleSnap] = await Promise.all([
      firestore.collection("users").where("isActive", "==", true).count().get(),
      firestore.collection("users").where("isActive", "==", false).count().get(),
      firestore.collection("users").count().get(),
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

// 👥 UTILIZADORES
export async function getAllUsersData(): Promise<UserData[]> {
  try {
    const usersRef = firestore.collection("users");
    const usersSnapshot = await usersRef.get();
    if (usersSnapshot.empty) return [];
    return usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as UserData[];
  } catch (error) {
    console.error("❌ Erro ao buscar todos os utilizadores:", error);
    return [];
  }
}

export async function getUsersByRole(role: string): Promise<UserData[]> {
  try {
    const usersSnapshot = await firestore
      .collection("users")
      .where("role", "==", role)
      .get();
    if (usersSnapshot.empty) return [];
    return usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as UserData[];
  } catch (error) {
    console.error(`❌ Erro ao buscar utilizadores com role '${role}':`, error);
    return [];
  }
}

// 📄 METADADOS (TABELAS AUXILIARES)
export async function getRolesData(): Promise<Roles[] | null> {
  const snapshot = await firestore.collection("roles").get();
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Roles[];
  return data.length ? data : null;
}

export async function getStatusesData(): Promise<Statuses[] | null> {
  const snapshot = await firestore.collection("statuses").get();
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Statuses[];
  return data.length ? data : null;
}

export async function getPoolsData(): Promise<Pools[] | null> {
  const snapshot = await firestore.collection("pools").get();
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Pools[];
  return data.length ? data : null;
}

export async function getEducationData(): Promise<Education[] | null> {
  const snapshot = await firestore.collection("education").get();
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Education[];
  return data.length ? data : null;
}

export async function getSkillsData(): Promise<Skills[] | null> {
  const snapshot = await firestore.collection("skills").get();
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Skills[];
  return data.length ? data : null;
}

export async function getShiftsData(): Promise<Shifts[] | null> {
  const snapshot = await firestore.collection("shifts").get();
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Shifts[];
  return data.length ? data : null;
}

// 🧩 JOBS
export async function getJobsData(): Promise<Jobs[] | null> {
  try {
    const snapshot = await firestore.collection("jobs").get();
    if (snapshot.empty) return null;
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Jobs[];
  } catch (error) {
    console.error("❌ Erro ao buscar jobs do Firestore:", error);
    return null;
  }
}

export async function getOpenJobsForUser(user: UserData): Promise<Jobs[]> {
  try {
    const now = Timestamp.now();
    const snapshot = await firestore
      .collection("jobs")
      .where("status.id", "==", "open")
      .where("education.id", "==", user.education.id)
      .where("pool.id", "==", user.pool.id)
      .where("date", ">=", now)
      .orderBy("date", "asc")
      .get();
    if (snapshot.empty) return [];
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Jobs[];
  } catch (error) {
    console.error("❌ Erro ao obter open jobs:", error);
    return [];
  }
}

export async function getJobSingleData(id: string): Promise<Jobs | null> {
  try {
    const doc = await firestore.collection("jobs").doc(id).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() } as Jobs;
  } catch (error) {
    console.error("❌ Erro ao buscar job do Firestore:", error);
    return null;
  }
}

// 📥 JOBS DO UTILIZADOR
export async function getUserJobs(userId: string): Promise<Jobs[]> {
  try {
    const snapshot = await firestore
      .collection("jobs")
      .where("assignedTo.id", "==", userId)
      .get();
    if (snapshot.empty) return [];
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Jobs[];
  } catch (error) {
    console.error("❌ Error fetching user jobs:", error);
    return [];
  }
}

export async function getUpcomingJobsForUser(userId: string): Promise<Jobs[]> {
  const now = Timestamp.now();
  const snapshot = await firestore
    .collection("jobs")
    .where("assignedTo.id", "==", userId)
    .where("date", ">=", now)
    .orderBy("date", "asc")
    .get();
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((job) => job.date instanceof Timestamp);
}

export async function getPastJobsForUser(userId: string): Promise<Jobs[]> {
  const now = Timestamp.now();
  const snapshot = await firestore
    .collection("jobs")
    .where("assignedTo.id", "==", userId)
    .where("date", "<", now)
    .orderBy("date", "desc")
    .get();
  return snapshot.docs
    .map((doc) => ({ id: doc.id, ...doc.data() }))
    .filter((job) => job.date instanceof Timestamp);
}

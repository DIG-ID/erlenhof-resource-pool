// Importa o Timestamp do Firebase Admin para tipagem correta
import { Timestamp } from "firebase-admin/firestore";

export type UserRole = "super_admin" | "property" | "user";

// 🔐 Tabelas auxiliares
export interface Roles {
  id: string;
  name: string;
}

export interface Statuses {
  id: string;
  name: string;
}

export interface Pools {
  id: string;
  name: string;
}

export interface Education {
  id: string;
  name: string;
}

export interface Skills {
  id: string;
  name: string;
}

export interface Shifts {
  id: string;
  name: string;
  details: string;
}

// 📋 Estrutura de Property
export interface TeamLeader {
  name: string;
  phone: string;
  email: string;
}

export interface Property {
  id: string;
  name: string;
  phone: string;
  mobile: string;
  email: string;
  address: string;
  teamLeader: TeamLeader;
}

// 📄 Estrutura de Job
export interface Jobs {
  id: string;
  reason: string;
  notes: string;
  education: Education;
  shift: Shifts;
  status: Statuses;
  pool: Pools;
  date: Timestamp;
  createdAt: Timestamp;
  property: Property;
  assignedTo?: {
    id: string;
    email: string;
    name: string;
    surname: string;
    displayName: string;
  } | null;
}

// 🔐 Dados do Firebase Authentication
export interface UserAuth {
  id: string;
  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL?: string;
  phoneNumber?: string;
  disabled: boolean;
  creationTime: string;
  lastSignInTime: string;
  lastRefreshTime: string | null;
}

// 🔍 Dados do Firestore
export interface UserFirestore {
  id: string;
  name: string;
  surname: string;
  isActive: boolean;
  role: Roles;
  education?: Education | null; // Pode ser omitido ou null
  pool?: Pools | null; // Pode ser omitido ou null
  skills?: Skills[]; // Opcional, assume []
  currentJobs?: {
    id: string;
    title: string;
    date: Timestamp;
  }[];
  property?: Property | null; // Só se role for 'property'
}

// 👥 User final combinado
export interface UserData extends UserAuth, UserFirestore {}

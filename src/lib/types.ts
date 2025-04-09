// Importa o Timestamp do Firebase Admin para tipagem correta
import { Timestamp } from "firebase-admin/firestore";

export type UserRole = "super_admin" | "property" | "user";

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
}

export interface TeamLeader {
  id: string;
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

export interface Jobs {
  id: string;
  title: string;
  description: string;
  notes: string;
  education: Education;
  shift: Shifts;
  status: Statuses;
  pool: Pools;
  date: Timestamp;
  createdAt: Timestamp;
  createdBy: Property;
  assignedTo?: {
    id: string;
    email: string;
    name: string;
    surname: string;
    displayName: string;
  } | null;
}

export interface UserAuth {
  id: string; // UID do usuário, equivalente a 'uid' do Firebase
  displayName: string; // Nome de exibição do usuário
  email: string; // Email do usuário
  emailVerified: boolean; // Verificação do email
  photoURL?: string; // URL da foto de perfil (opcional)
  phoneNumber?: string; // Número de telefone do usuário (opcional)
  disabled: boolean; // Status de desativação da conta
  creationTime: string; // Hora de criação da conta
  lastSignInTime: string; // Hora do último login
  lastRefreshTime: string | null; // Hora da última atualização do token
}

export interface UserFirestore {
  id: string;
  name: string;
  surname: string;
  isActive: boolean;
  role: Roles;
  education: Education;
  pool: Pools;
  skills: Skills[];
  currentJobs: {
    id: string;
    title: string;
    date: Timestamp;
  }[];
  property: Property;
}

export interface UserData extends UserAuth, UserFirestore {}
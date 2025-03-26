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
  createdBy: {
    id: string;
    email: string;
    name: string;
    surname: string;
  };
  assignedTo?: {
    id: string;
    email: string;
    displayName: string;
    name: string;
    surname: string;
  } | null; // Agora é um único utilizador ou `null`
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
  education: string;
  pool: string;
  skills: string[];
  currentJobs: {
    id: string;
    title: string;
  }[];
}

export interface UserData extends UserAuth, UserFirestore {}
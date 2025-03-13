// Importa o Timestamp do Firebase Admin para tipagem correta
import { Timestamp } from "firebase-admin/firestore";

//Roles data
export interface Role {
  id: string;
  name: string;
}

//Job data
export interface Job {
  id: string;
  title: string;
  description: string;
  notes: string;
  roles: string;
  status: string;
  date: Timestamp;
  createdAt: Timestamp;
  createdBy: {
    id: string;
    email: string;
    name: string;
    surname: string;
  };
  assigned: boolean;
  assignedTo?: {
    id: string;
    email: string;
    displayName: string;
    name: string;
    surname: string;
  } | null; // Agora é um único utilizador ou `null`
}

//Status data
export interface State {
  id: string;
  status: string;
}

//User data from Firebase Authentication
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
  lastRefreshTime: string; // Hora da última atualização do token
}

//User data from Firebase Firestore
export interface UserFirestore {
  id: string;
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
  role: string;
  currentJobs: {
    id: string;
    title: string;
  }[];
}

//User data combined
export interface UserData extends UserAuth, UserFirestore {}
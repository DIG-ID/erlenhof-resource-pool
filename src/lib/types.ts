//Roles data
export interface Role {
  id: string;
  name: string;
}

//Job data
export interface Job {
  id: string;
  title: string;
  smallDescription: string;
  roles: string;
  status: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
}

//Status data
export interface State {
  id: string;
  status: string;
}

//User data from Firebase Authentication
export interface UserAuth {
  id: string;
  displayName: string;
  email: string;
}

//User data from Firebase Firestore
export interface UserFirestore {
  id: string;
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
  role: string;
}

//User data combined
export interface UserData extends UserAuth, UserFirestore {}
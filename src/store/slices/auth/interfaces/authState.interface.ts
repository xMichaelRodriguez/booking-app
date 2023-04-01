// Define a type for the slice state
export interface IAuthState {
  id: number;
  username: string;
  email: string;
  isSigned: boolean;
  isActive: boolean;
  role: IRole;
  isLoading: boolean;
}

export interface IRole {
  id: number;
  name: string;
  description: string;
}

export interface ILoginState {
  email: string;
  password: string;
}

export interface IAuthLogin {
  user: IAuthState;
  jwt: Access;
}

interface Access {
  accessToken: string;
}

export interface IAuthRegister {
  username: string;
  email: string;
  password: string;
}
export interface IGoogle {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
}

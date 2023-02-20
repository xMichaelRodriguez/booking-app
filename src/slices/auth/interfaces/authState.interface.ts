// Define a type for the slice state
export interface IAuthState {
  id: number | null;
  username: string | null;
  email: string | null;
  isSigned?: boolean;
  isActive: boolean | null;
  role: IRole | null;
}

interface IRole {
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

type Access = {
  accessToken: string;
};

export interface IAuthRegister {
  username: string;
  email: string;
  password: string;
}

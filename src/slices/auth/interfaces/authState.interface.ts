// Define a type for the slice state
export interface IAuthState {
  id: number;
  username: string;
  email: string;
  isSigned?: boolean;
  isActive: boolean;
}

export interface ILoginState {
  email: string;
  password: string;
}

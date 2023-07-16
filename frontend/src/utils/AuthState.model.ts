type User = {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  token: string;
};

export interface AuthState {
  user: User | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

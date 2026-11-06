export interface User{
    _id: string;
  name: string;
  email: string;
  role: 'player' | 'venue_manager' | 'admin';
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<LoginResponse>;
  verifyOtp: (tempToken: string, otp: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; role: string }) => Promise<void>;
  logout: () => Promise<void>;
}

export type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export interface LoginResponse {
  requiresOtp?: boolean;
  tempToken?: string;
  user?: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role: string;
}

export interface VerifyOtpPayload {
  tempToken: string;
  otp: string;
}
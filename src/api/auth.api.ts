import api from './axois';
import type { User, LoginPayload,LoginResponse, RegisterPayload, VerifyOtpPayload } from '../types/auth.types';



export const loginUserApi = async (credentials: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerUserApi = async (data: RegisterPayload): Promise<{ user: User }> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const verifyOtpApi = async (payload: VerifyOtpPayload): Promise<{ user: User }> => {
  const response = await api.post('/auth/verify-otp', payload);
  return response.data;
};

export const resendOtpApi = async (tempToken: string): Promise<{ message: string }> => {
  const response = await api.post('/auth/resend-otp', { tempToken });
  return response.data;
};

export const getSessionUserApi = async (): Promise<{ user: User }> => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const logoutUserApi = async (): Promise<void> => {
  await api.post('/auth/logout');
};
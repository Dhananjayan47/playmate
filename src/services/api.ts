
import axios, {
  type InternalAxiosRequestConfig,
} from 'axios';

const API_URL =
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api/v1';

// Access token exists only in JavaScript memory.
let inMemoryAccessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  inMemoryAccessToken = token;
};

export const getAccessToken = () => inMemoryAccessToken;

// Normal API client.
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Separate client: it does not use api's interceptors.
const refreshClient = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

// Allow our custom retry flag on Axios request configs.
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    _retry?: boolean;
  }
}

// Share one refresh operation across simultaneous requests.
let refreshPromise: Promise<string> | null = null;

const refreshAccessToken = (): Promise<string> => {
  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post('/auth/refresh', {})
      .then((response) => {
        const token = response.data.accessToken as
          | string
          | undefined;

        if (!token) {
          throw new Error(
            'Refresh response did not contain an access token'
          );
        }

        setAccessToken(token);
        return token;
      })
      .catch((error) => {
        setAccessToken(null);
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
};

// Call this when the React app starts.
export const restoreSession = async (): Promise<boolean> => {
  try {
    await refreshAccessToken();
    return true;
  } catch {
    setAccessToken(null);
    return false;
  }
};

// Attach the current access token to each normal API request.
api.interceptors.request.use((config) => {
  if (inMemoryAccessToken) {
    config.headers.set(
      'Authorization',
      `Bearer ${inMemoryAccessToken}`
    );
  }

  return config;
});

// Refresh an expired access token and retry the failed request.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as
      | InternalAxiosRequestConfig
      | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/register') ||
      originalRequest.url?.includes('/auth/refresh')
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newAccessToken = await refreshAccessToken();

      originalRequest.headers.set(
        'Authorization',
        `Bearer ${newAccessToken}`
      );

      return api(originalRequest);
    } catch (refreshError) {
      setAccessToken(null);
      return Promise.reject(refreshError);
    }
  }
);

export default api;

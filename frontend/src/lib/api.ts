export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null; 
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login';
      }
    }
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || (data.error && data.error.message) || 'API request failed');
  }

  return data;
};


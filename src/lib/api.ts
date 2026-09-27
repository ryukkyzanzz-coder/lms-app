export const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Mocking an auth token for now as per local execution
  const token = localStorage.getItem('token') || 'dummy-token'; 
  
  if (token) {
    (defaultHeaders as any)['Authorization'] = `Bearer ${token}`;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';
  
  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};

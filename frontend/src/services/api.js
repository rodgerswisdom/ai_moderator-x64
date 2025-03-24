import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error;
    }
  },

  signup: async (userData) => {
    try {
      const response = await api.post('/signup', userData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Signup error:', error.response?.data || error.message);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

// Workspace services
export const workspaceService = {
  createWorkspace: async (workspaceData) => {
    const response = await api.post('/workspaces', workspaceData);
    return response.data;
  },

  getWorkspaces: async () => {
    const response = await api.get('/workspaces');
    return response.data;
  },

  getWorkspace: async (id) => {
    const response = await api.get(`/workspaces/${id}`);
    return response.data;
  },

  addStudent: async (id, studentId) => {
    const response = await api.put(`/workspaces/${id}`, { studentId });
    return response.data;
  }
};

// Assignment services
export const assignmentService = {
  createAssignment: async (assignmentData) => {
    const response = await api.post('/assignments', assignmentData);
    return response.data;
  },

  getAssignments: async () => {
    const response = await api.get('/assignments');
    return response.data;
  }
};

// Submission services
export const submissionService = {
  createSubmission: async (submissionData) => {
    const response = await api.post('/submissions', submissionData);
    return response.data;
  },

  getSubmissions: async () => {
    const response = await api.get('/submissions');
    return response.data;
  },

  getSubmission: async (id) => {
    const response = await api.get(`/submissions/${id}`);
    return response.data;
  },

  updateSubmission: async (id, submissionData) => {
    const response = await api.put(`/submissions/${id}`, submissionData);
    return response.data;
  }
};

// Chat services
export const chatService = {
  createChat: async (chatData) => {
    const response = await api.post('/chat', chatData);
    return response.data;
  },

  getChats: async () => {
    const response = await api.get('/chat');
    return response.data;
  }
};

export default api;

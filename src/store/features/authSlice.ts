import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock user data
const MOCK_USERS = [
  { username: 'admin', password: 'admin123' }
];

interface User {
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  error: null
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }: { username: string; password: string }) => {
    // Simulate API call
    const mockUser = MOCK_USERS.find(
      u => u.username === username && u.password === password
    );

    if (mockUser) {
      return { username: mockUser.username };
    }

    throw new Error('Invalid credentials');
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error.message || 'Login failed';
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
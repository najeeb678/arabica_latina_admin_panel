import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { signIn } from '../api/authAPI';

export const signInThunk = createAsyncThunk(
  'auth/signIn', 
  async (credentials: { email: string, password: string }, { rejectWithValue }) => {
    try {
      const response = await signIn(credentials);
      return response;  
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Invalid email or password, try again'); 
    }
  }
);


const initialState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') || null : null, 
  loading: false,
  error: null as string | null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
      state.token = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(signInThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(signInThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;

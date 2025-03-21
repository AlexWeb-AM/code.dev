import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_LOCAL = "https://coder-dev-server.onrender.com";

interface User {
  id: string;
  name: string;
  email: string;
  routeId: string;
  verifyOtp:string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk<
  { user: User },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL_LOCAL}/login`, userData);
    return response.data;
  } catch (error: unknown) {
    console.error("Error Login:", error);

    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data?.message || "Error Login");
    }

    return rejectWithValue("Unexpected error occurred");
  }
});

export const registerUser = createAsyncThunk<{ user: User },{ name: string; email: string; password: string },{ rejectValue: string }>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL_LOCAL}/register`, userData);
    return response.data;
  } catch (error: unknown) {
    console.error("Error SignUp:", error);

    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data?.message || "Error SignUp");
    }

    return rejectWithValue("Unexpected error occurred");
  }
});

export const sendOtp = createAsyncThunk<{ user: User },{ email: string; },{ rejectValue: string }>("auth/sendOtp", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL_LOCAL}/send-otp`, userData);
    return response.data;
  } catch (error: unknown) {
    console.error("Error Send Otp:", error);

    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data?.message || "Error SendOtp");
    }

    return rejectWithValue("Unexpected error occurred");
  }
});

export const checkOtp = createAsyncThunk<{ user: User },{ email: string;otp:string },{ rejectValue: string }>("auth/checkOtp", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL_LOCAL}/check-otp`, userData);
    return response.data;
  } catch (error: unknown) {
    console.error("Error Check Otp:", error);

    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data?.message || "Error checkOtp");
    }

    return rejectWithValue("Unexpected error occurred");
  }
});

export const resetPassword = createAsyncThunk<{ user: User },{ email: string;newPassword:string },{ rejectValue: string }>("auth/resetPassword", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL_LOCAL}/reset-password`, userData);
    return response.data;
  } catch (error: unknown) {
    console.error("Error restarted password:", error);

    if (axios.isAxiosError(error) && error.response) {
      return rejectWithValue(error.response.data?.message || "Error Reset Password");
    }

    return rejectWithValue("Unexpected error occurred");
  }
});


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(sendOtp.pending,(state) => {
        state.isLoading = true
        state.error = null
      }) 
      .addCase(sendOtp.fulfilled,(state) => {
        state.isLoading = false;
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(resetPassword.pending,(state) => {
        state.isLoading = true
        state.error = null
      }) 
      .addCase(resetPassword.fulfilled,(state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;

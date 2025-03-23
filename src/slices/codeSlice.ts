import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL_LOCAL = "https://coder-dev-server.onrender.com/api/code";

interface CodeState {
  code: string;
  language: string;
  isLoading: boolean;
  error: string | null;
  output: string | null;  
}

const initialState: CodeState = {
  code: '// Write Code',
  language: 'JavaScript',
  isLoading: false,
  error: null,
  output: null
};

export const receiveCode = createAsyncThunk<
    { code: string; language: string; output: string }, 
    { code: string; language: string }, 
    { rejectValue: string }
>(
    "code/receiveCode", 
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL_LOCAL}/receive-code`, userData);

            if (!response.data.success) {
                return rejectWithValue(response.data.message || "Execution failed");
            }

            return { code: userData.code, language: userData.language, output: response.data.result };
        } catch (error: unknown) {
            console.error("Error Receive Code:", error);

            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data?.message || "Error Receive Code");
            }

            return rejectWithValue("Unexpected error occurred");
        }
    }
);

const codeSlice = createSlice({
    name: "code",
    initialState,
    reducers: {
      setLanguage: (state, action: PayloadAction<string>) => {
        state.language = action.payload; 
      },
      setCode: (state, action: PayloadAction<string>) => {
        state.code = action.payload; 
      }
    },
    extraReducers: (builder) => {
      builder
        .addCase(receiveCode.pending, (state) => {
          state.isLoading = true;
          state.error = null;
        })
        .addCase(receiveCode.fulfilled, (state, action) => {
          state.isLoading = false;
          state.code = action.payload.code;
          state.language = action.payload.language;
          state.output = action.payload.output;
        })
        .addCase(receiveCode.rejected, (state, action) => {
          state.isLoading = false;
          state.error = action.payload as string;
        });
    }
});

export const { setCode, setLanguage } = codeSlice.actions;
export default codeSlice.reducer;

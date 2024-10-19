import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "http://localhost:3000/userRoutes";

const initialState = {
    username: null,
    userId: null,
    token: null,  // Add token to the initial state
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

// Async thunk for logging in the user
export const loginUser = createAsyncThunk(
    "user/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseURL}/userLogin`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text(); // Get error message
                return rejectWithValue(errorMessage);
            }

            const data = await response.json();
            return data;
        } catch (err) {
            return rejectWithValue('Something went wrong');
        }
    }
);

// Async thunk for registering the user
export const registerUser = createAsyncThunk(
    "user/register",
    async ({ username, email, password }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseURL}/userRegistration`, {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                return rejectWithValue(errorMessage);
            }

            const data = await response.json();
            return data; 
        } catch (err) {
            return rejectWithValue('Something went wrong');
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            state.username = null;
            state.userId = null;
            state.token = null;
            state.status = 'idle';
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Handle login
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userId = action.payload.data.userId;
                state.username = action.payload.data.username;
                state.token = action.payload.data.token;  // Save token on success
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Handle registration
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userId = action.payload.data.userId;
                state.username = action.payload.data.username;
                state.token = action.payload.data.token;  // Save token on success
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;

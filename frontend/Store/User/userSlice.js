import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = "http://localhost:3000/userRoutes";

const initialState = {
    username: null,
    userId: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
};

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

            // Check if the response is not ok
            if (!response.ok) {
                const errorMessage = await response.text(); // Get error message
                return rejectWithValue(errorMessage);
            }

            const data = await response.json();
            return data; // Expecting { userId: ... }
        } catch (err) {
            return rejectWithValue('Something went wrong');
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userId = action.payload.data.userId;
                state.username = action.payload.data.username;
                state.token = action.payload.data.token
                console.log(action.payload)
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginEmail, registerEmail, registerGoogle } from "../../utils/firebaseFunctions";

const baseURL = import.meta.env.VITE_SERVER;

const initialState = {
    username: null,
    userId: null,
    token: null,
    img: null,
    uid: null,
    email: null,
    status: 'idle',
    error: null
};

// Async thunk for logging in the user
export const loginUser = createAsyncThunk(
    "user/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const firebaseResponse = await loginEmail(email, password)
            const response = await fetch(`${baseURL}/userRoutes/userLogin`, {
                method: 'POST',
                body: JSON.stringify({ 
                    uid: firebaseResponse?.user?.uid, 
                    email: firebaseResponse?.user?.email
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text(); 
                return rejectWithValue(errorMessage);
            }

            const data = await response.json();
            console.log(data)
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
            const firebaseResponse = await registerEmail(email, password)
            const response = await fetch(`${baseURL}/userRoutes/userRegistration`, {
                method: 'POST',
                body: JSON.stringify({ 
                    uid: firebaseResponse?.user?.uid, 
                    email: firebaseResponse?.user?.email, 
                    img: "",
                    username: username,
                    method: firebaseResponse?.operationType
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                return rejectWithValue(errorMessage);
            }

            const data = await response.json();
            console.log(data)
            return data; 
        } catch (err) {
            return rejectWithValue('Something went wrong');
        }
    }
);

export const registerWithGoogle = createAsyncThunk(
    "user/registerGoogle",
    async (_,{ rejectWithValue }) => {
        try {
            const firebaseResponse = await registerGoogle()
            console.log(firebaseResponse)
            const response = await fetch(`${baseURL}/userRoutes/userRegistration`, {
                method: 'POST',
                body: JSON.stringify({ 
                    uid: firebaseResponse?.user?.uid, 
                    email: firebaseResponse?.user?.email, 
                    img: firebaseResponse?.user?.photoURL,
                    username: firebaseResponse?.user?.displayName,
                    method: firebaseResponse?.operationType
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                console.log(errorMessage)
                return rejectWithValue(errorMessage);
            }

            const data = await response.json();
            console.log(data)
            return data; 
        } catch (err) {
            console.log(err)
            return rejectWithValue('Something went wrong');
        }
    }
);

// Async thunk for logging in the user
export const loginWithGoogle = createAsyncThunk(
    "user/loginGoogle",
    async (_, { rejectWithValue }) => {
        try {
            const firebaseResponse = await registerGoogle()
            console.log(firebaseResponse)
            const response = await fetch(`${baseURL}/userRoutes/userLogin`, {
                method: 'POST',
                body: JSON.stringify({ 
                    uid: firebaseResponse?.user?.uid, 
                    email: firebaseResponse?.user?.email
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorMessage = await response.text(); 
                return rejectWithValue(errorMessage);
            }

            const data = await response.json();
            console.log(data)
            return data;
        } catch (err) {
            console.log(err)
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
            state.img = null;
            state.uid = null;
            state.email = null;
            state.status = 'idle';
            state.error = null
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
                state.token = action.payload.data.token;
                state.img = action.payload.data.img;
                state.uid = action.payload.data.uid;
                state.email = action.payload.data.email;
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
                state.token = action.payload.data.token;
                state.img = action.payload.data.img;
                state.uid = action.payload.data.uid;
                state.email = action.payload.data.email;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Handle google registration
            .addCase(registerWithGoogle.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerWithGoogle.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userId = action.payload.data.userId;
                state.username = action.payload.data.username;
                state.token = action.payload.data.token;
                state.img = action.payload.data.img;
                state.uid = action.payload.data.uid;
                state.email = action.payload.data.email;
            })
            .addCase(registerWithGoogle.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // Handle Google login
            .addCase(loginWithGoogle.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userId = action.payload.data.userId;
                state.username = action.payload.data.username;
                state.token = action.payload.data.token;
                state.img = action.payload.data.img;
                state.uid = action.payload.data.uid;
                state.email = action.payload.data.email;
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;

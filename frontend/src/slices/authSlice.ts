import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, type User } from "firebase/auth";
import { auth } from "../firebase";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ name, email, password }: { name: string; email: string; password: string }) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {displayName: name})
        return userCredential.user;
    }
)

export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }: { email: string; password: string }) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    }
)

export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async () => {
        await signOut(auth)
    }
)

const authSlice = createSlice(
    {
        name: "auth",
        initialState,
        reducers: {
            clearError(state) {
                state.error = null
            }
        },
        extraReducers: (builder) => {
            // Register User
            builder.addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload
            })
            builder.addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            // Login User
            builder.addCase(loginUser.pending, (state) => {
              state.loading = true;
              state.error = null;
            });
            builder.addCase(
              loginUser.fulfilled,
              (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
              }
            );
            builder.addCase(loginUser.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload as string;
            });

            // Logout User
            builder.addCase(logoutUser.pending, (state) => {
              state.loading = true;
              state.error = null;
            });
            builder.addCase(logoutUser.fulfilled, (state) => {
              state.loading = false;
              state.user = null;
            });
            builder.addCase(logoutUser.rejected, (state, action) => {
              state.loading = false;
              state.error = action.payload as string;
            });
        }
    }
) 

export const { clearError } = authSlice.actions
export default authSlice.reducer
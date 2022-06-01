import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  isAdmin: boolean;
  isLoggedIn: boolean;
  credentials: UserCredentials[];
};

const initialState: AuthState = {
  isAdmin: false,
  isLoggedIn: false,
  credentials: [
    {
      username: "admin",
      password: "4dm1np4$$",
    },
    {
      username: "employee1",
      password: "3mploy331",
    },
    {
      username: "employee2",
      password: "3mploy332",
    },
  ],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser(state: AuthState, action: PayloadAction<UserCredentials>) {
      const { username, password } = action.payload;

      const userData = state.credentials.find(
        (user) => user.username === username
      );

      if (userData) {
        if (userData.password === password) {
          state.isAdmin = userData.username === "admin";
          state.isLoggedIn = true;
          console.log("Login successful!");
        } else {
          alert("Username and password does not match!");
        }
      } else {
        alert("User does not exist!");
      }
    },
    logoutUser(state: AuthState) {
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
  },
});

const authReducer = authSlice.reducer;

export const { loginUser } = authSlice.actions;

export default authReducer;

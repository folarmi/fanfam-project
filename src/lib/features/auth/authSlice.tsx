/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type EmailType = "Reset" | "Signup" | "";

export interface AuthState {
  userEmail: string;
  emailType: EmailType;
  userObject: object;
}

const initialState: AuthState = {
  userEmail: "",
  emailType: "",
  userObject: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
    updateEmailType: (state, action: PayloadAction<EmailType>) => {
      state.emailType = action.payload;
    },
    updateUserObject: (state, action: PayloadAction<any>) => {
      state.userObject = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUserEmail, updateEmailType, updateUserObject } =
  authSlice.actions;

export default authSlice.reducer;

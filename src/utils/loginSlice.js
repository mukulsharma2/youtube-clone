import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    name: "",
    url: "",
  },
  reducers: {
    signin: (state, action) => {
      state.name = action.payload.name;
      state.url = action.payload.url;
    },
    signout: (state) => {
      state.name = "";
      state.url = "";
    },
  },
});

export const { signin, signout } = loginSlice.actions;
export default loginSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getAxiosWithTokenObj from "../components/Authorizationreq/AxiosReqWithToken";

export const userLogin = createAsyncThunk(
  "loginuser",
  async (userCredentialsObj, thunkApi) => {
    let response = await axios.post("/users/login", userCredentialsObj);
    let data = response.data;
    if (data.message === "Success") {
      // save it in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.user.username);
      localStorage.setItem("profileimage", data.user.profileimage);
      return data.user;
    }
    if (
      data.message === "Invalid username" ||
      data.message === "Invalid Password"
    ) {
      return thunkApi.rejectWithValue(data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userObj: {},
    isSuccess: false,
    isLoading: false,
    isError: false,
    invalidLoginMessage: "",
  },
  reducers: {
    clearLoginStatus: (state) => {
      state.isSuccess = false;
      return state;
    },
  },
  extraReducers: {
    [userLogin.fulfilled]: (state, action) => {
      state.userObj = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = false;
      state.invalidLoginMessage = "";
    },
    [userLogin.pending]: (state, action) => {
      state.isLoading = true;
    },
    [userLogin.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidLoginMessage = action.payload.message;
    },
  },
});

export default userSlice.reducer;

export const { clearLoginStatus } = userSlice.actions;

//--------------to store the data as cache--------------------------------;
//       const addDataIntoCache = (cacheName, url) => {
//         const data = new Response(JSON.stringify(response.data));
//         if ("caches" in window) {
//           caches.open(cacheName).then((cache) => {
//             cache.put(url, data);
//           });
//         }
//       };
//       addDataIntoCache();

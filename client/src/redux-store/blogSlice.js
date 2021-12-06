import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getAxiosWithTokenObj from "../components/Authorizationreq/AxiosReqWithToken";

// add blog
export const addBlog = createAsyncThunk(
  "addBlog",
  async (formData, thunkApi) => {
    let axiosRequestWithToken = getAxiosWithTokenObj();
    const data = await axiosRequestWithToken.post("/blog/addblog", formData);
    if (data.data.message === "New Blog Added") {
      alert("Successfully Blog Added");
      return data.data.payload;
    } else {
      return thunkApi.rejectWithValue(data.data);
    }
  }
);

// get blog
export const getBlog = createAsyncThunk("getBlog", async (_, thunkApi) => {
  const data = await axios.get("/blog/getblog");
  if (data.data.message === "Success") {
    return data.data.payload;
  } else {
    return thunkApi.rejectWithValue(data.data);
  }
});

// edit blog
export const editBlogs = createAsyncThunk(
  "editBlogs",
  async ({ bid, formData, index }, thunkApi) => {
    let axiosRequestWithToken = getAxiosWithTokenObj();
    const data = await axiosRequestWithToken.put(
      `/blog/editblog/${bid}`,
      formData
    );
    if (data.data.message === "Blog updated") {
      return thunkApi.fulfillWithValue({ index, payload: data.data.payload });
    } else {
      return thunkApi.rejectWithValue(data.data);
    }
  }
);

// delete Blog
export const deleteBlog = createAsyncThunk(
  "deleteBlog",
  async ({ bid, index }, thunkApi) => {
    let axiosRequestWithToken = getAxiosWithTokenObj();
    const data = await axiosRequestWithToken.delete(`/blog/deleteblog/${bid}`);
    console.log("data value", data);
    if (data.data.message === "Blog deleted") {
      return thunkApi.fulfillWithValue({ index });
    } else {
      return thunkApi.rejectWithValue(data.data);
    }
  }
);

const reducerPending = (state) => {
  return (state = { ...state, isLoading: true, invalidMessage: "" });
};

const reducerRejected = (state, action) => {
  return (state = {
    ...state,
    isLoading: false,
    invalidMessage: action.payload.message,
  });
};

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogObj: [],
    isSuccess: false,
    isLoading: false,
    invalidMessage: "",
  },
  reducers: {},
  extraReducers: {
    [getBlog.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getBlog.fulfilled]: (state, action) => {
      state.blogObj = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
    },
    [getBlog.rejected]: (state, action) => {
      state.isSuccess = false;
      state.isError = true;
      state.isLoading = false;
      state.invalidLoginMessage = action.payload.message;
    },
    // Adding blog
    [addBlog.pending]: reducerPending,
    [addBlog.fulfilled]: (state, action) => {
      state.blogObj.push(action.payload);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidLoginMessage = "";
    },
    [addBlog.rejected]: reducerRejected,

    // Delete Blog
    [deleteBlog.pending]: reducerPending,

    [deleteBlog.fulfilled]: (state, action) => {
      state.blogObj.splice(action.payload.index, 1);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidLoginMessage = "";
      state.isError = false;
    },
    [deleteBlog.rejected]: reducerRejected,

    // edit blog

    // Editing Hotel
    [editBlogs.pending]: reducerPending,
    [editBlogs.fulfilled]: (state, action) => {
      state.blogObj.splice(action.payload.index, 1, action.payload.payload);
      state.isSuccess = true;
      state.isLoading = false;
      state.invalidMessage = "";
    },
    [editBlogs.rejected]: reducerRejected,
  },
});

export default blogSlice.reducer;

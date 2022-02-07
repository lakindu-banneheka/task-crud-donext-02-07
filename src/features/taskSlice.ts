import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios from "axios";
import { Itask } from "../modules/modules";
import { BaseUrl } from "../urlConfig";

interface IinitialState {
    taskList: Itask[];
    task: string;
    loading: Boolean;
    error: Boolean;
};

const initialState: IinitialState = {
    taskList: [{ task:'', id:'' }],
    task: '',
    loading: false,
    error:false
};

export const getTaskList = createAsyncThunk("task/getTaskList", async () => {
    // const res = await axios.get(`${BaseUrl}/`);
    // return res.data;
    return [{task:'test ',id:'1'},{task:'test',id:'2'}]
});

export const addTask = createAsyncThunk("task/addTask", async (task: string) => {
    // const res = await axios.post(`${BaseUrl}/`, task);
    console.log('add task', task)
    return task;
});

export const editTask = createAsyncThunk("task/editTask", async (task: Itask) => {
    // const res = await axios.post(`${BaseUrl}/`, task);
    console.log('add task', task)
    return task;
});

export const deleteTask = createAsyncThunk("task/deleteTask", async (task: string) => {
    // const res = await axios.post(`${BaseUrl}/`, task);
    console.log('add task', task)
    return task;
});

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getTaskList.pending, state => {
            state.loading = true;
        });
        builder.addCase(getTaskList.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.taskList = payload;
        });
        builder.addCase(getTaskList.rejected, state => {
            state.loading = false;
            state.error = true;
        });


        builder.addCase(addTask.pending, state => {
            state.loading = true;
        });
        builder.addCase(addTask.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.task = payload;
        });
        builder.addCase(addTask.rejected, state => {
            state.loading = false;
            state.error = true;
        });


        builder.addCase(editTask.pending, state => {
            state.loading = true;
        });
        builder.addCase(editTask.fulfilled, (state, { payload }) => {
            state.loading = false;
            // state.task = payload;
        });
        builder.addCase(editTask.rejected, state => {
            state.loading = false;
            state.error = true;
        });


        builder.addCase(deleteTask.pending, state => {
            state.loading = true;
        });
        builder.addCase(deleteTask.fulfilled, (state, { payload }) => {
            state.loading = false;
            // state.task = payload;
        });
        builder.addCase(deleteTask.rejected, state => {
            state.loading = false;
            state.error = true;
        });
    }
});

// export const {  } = task.Slice.actions;
export default taskSlice.reducer;
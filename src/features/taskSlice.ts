import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Itask } from "../modules/modules";
import { BaseUrl } from "../urlConfig";

interface IinitialState {
    taskList: Itask[];
    task: string;
    loading: Boolean;
    error: Boolean;
};

const initialState: IinitialState = {
    taskList: [{ task:'', _id:'' }],
    task: '',
    loading: false,
    error:false
};

export const getTaskList = createAsyncThunk("task/getTaskList", async () => {
    const res = await axios.get(`${BaseUrl}/gettasklist`);
    return res.data.taskList;
});

export const addTask = createAsyncThunk("task/addTask", async (task: string) => {
    const res = await axios.post(`${BaseUrl}/addtask`, {task});
    return res.data;
});

export const editTask = createAsyncThunk("task/editTask", async (task: Itask) => {
    await axios.post(`${BaseUrl}/edittask/${task._id}`, task);
    return await task;
});

export const deleteTask = createAsyncThunk("task/deleteTask", async (id: string) => {
    await axios.delete(`${BaseUrl}/deletetask/${id}`);
    return id;
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

// add
        builder.addCase(addTask.pending, state => {
            state.loading = true;
        });
        builder.addCase(addTask.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.taskList.push(payload);
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
            let taskIndex = state.taskList.findIndex(task => task._id === payload._id);
            const newtaskList = state.taskList;
            newtaskList[taskIndex].task = payload.task;
            state.taskList[taskIndex].task = payload.task;
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
            const newtaskList = state.taskList.filter(task => {return task._id !== payload });
            state.taskList =  newtaskList;
        });
        builder.addCase(deleteTask.rejected, state => {
            state.loading = false;
            state.error = true;
        });
    }
});

// export const {  } = task.Slice.actions;
export default taskSlice.reducer;
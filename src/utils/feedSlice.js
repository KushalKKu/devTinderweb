import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name :"feed",
    initialState: [],
    reducers:{
        addFeed :(state,action) => action.payload,
        removeOneUserFromFeed:(state,action) => {
            const newArray = state.filter((f) => f._id !== action.payload);
            return newArray;
        }
    }
})

export const { addFeed, removeOneUserFromFeed } = feedSlice.actions;
export default feedSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";


const feedSlice = createSlice({
    name:'feed',
    initialState:null,
    reducers:{
        addFeed:(state,action)=>{
            return action.payload
        },
        removeUserFromFeed:(state,action)=>{
            if (!state) return state; // prevent error when state = null
            const newFeed=state.filter((user)=>user._id !== action.payload);
            return newFeed;
        },
        removeFeed:(state,action)=>{
            return null
        },
    }
})
 
export const {addFeed,removeFeed,removeUserFromFeed} = feedSlice.actions
export default feedSlice.reducer;
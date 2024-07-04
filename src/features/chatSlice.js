import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const CONVERSATION_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/conversation`;

const initialState = {
    status:"",
    error:"",
    conversations:[],
    activeConverstion:{},
    notifications: [],
};

//functions
export const getConversations= createAsyncThunk("conversation/all",
    async(token,{rejectWithValue})=>{
    try{
       const res=await axios.get(CONVERSATION_ENDPOINT,{
        headers:{
            Authorization: `Bearer ${token}`,
        },
       });
       return res.data;
    }catch(error){
      return rejectWithValue(error.response.data.error.message);
    }

})

export const chatSlice= createSlice({
    name:"chat",
    initialState,
    reducers:{
        setActiveConversation:(state,action)=>{
            state.activeConverstion=action.payload;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getConversations.pending,(state)=>{
            state.status="loading";
        })
        .addCase(getConversations.fulfilled,(state,action)=>{
            state.status="succeeded";
            state.conversations=Array.isArray(action.payload) ? action.payload : [];
        })
        .addCase(getConversations.rejected,(state,action)=>{
            state.status="failed";
            state.error=action.payload;
        });
    },
});
export const {setActiveConversation} =chatSlice.actions;

export default chatSlice.reducer;
import { createSlice} from '@reduxjs/toolkit';
export const indexSlice = createSlice({
    name: 'index',
    initialState:{
        tabValue:-1,
    },
    reducers: {
      setTabValue:(state,action)=>{
        state.tabValue = action.payload;
      }
    },
});
export const { setTabValue} = indexSlice.actions;
  
 // reducer
export default indexSlice.reducer;
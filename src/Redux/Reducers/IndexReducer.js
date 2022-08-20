import { createSlice} from '@reduxjs/toolkit';
import Const from '../../Common/Const';
export const indexSlice = createSlice({
    name: 'index',
    initialState:{
        tabValue:-1,
        search:true,
        conditionValue:Const.InitialCondition
    },
    reducers: {
      setTabValue:(state,action)=>{
        state.tabValue = action.payload;
      },
      setSearch:(state,action)=>{
        state.search = !state.search;
      },
      setConditionValue:(state,action)=>{
        state.conditionValue = action.payload
      }
    },
});
export const { setTabValue,setSearch,setConditionValue} = indexSlice.actions;
  
 // reducer
export default indexSlice.reducer;
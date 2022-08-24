import { createSlice} from '@reduxjs/toolkit';
import Const from '../../Common/Const';
export const indexSlice = createSlice({
    name: 'index',
    initialState:{
        tabValue:-1,
        search:true,
        conditionValue:Const.InitialCondition,
        layouts:{},
        chartList:[],
        displayRuler:false
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
      },
      setLayouts:(state,action)=>{
        state.layouts = action.payload;
      },
      setChartList:(state,action)=>{
        state.chartList = action.payload;
      },
      setRuler:(state)=>{
        state.displayRuler = !state.displayRuler;
      }
    },
});
export const { setTabValue,setSearch,setConditionValue,setLayouts,setChartList,setRuler} = indexSlice.actions;
  
 // reducer
export default indexSlice.reducer;
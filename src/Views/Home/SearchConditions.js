import React,{useState,useEffect} from "react";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { indexRequest } from "../../apiroute";
import { setConditionValue,setSearch } from "../../Redux/Reducers/IndexReducer";
import CommonUtil from "../../Common/CommonUtil";
import Const from "../../Common/Const";

const SearchConditions = ()=>{
    const dispatch = useDispatch();
    const tabValue = useSelector((state) => state.index.tabValue);
    const [condition,setCondition] = useState(null);
    useEffect(()=>{
        dispatch(setConditionValue(Const.InitialCondition));
        indexRequest.get("/GetConditionType",{params:{dashboard_id:tabValue}}).then(function(res){
            setCondition(CommonUtil.getCondition(res.data.condition));
        })
    },[tabValue]);

    const handleSearch = ()=>{
        dispatch(setSearch());
    }

    return (
        <Box sx={{ width: '100%',paddingTop:'25px',paddingBottom:'25px',paddingLeft:'20px' }}>
            <Box sx={{display:'flex',maxWidth:"300px",width:"100%",marginBottom:"10px"}}>
                {condition}
            </Box>
            <Button variant="contained" color="primary" onClick={handleSearch}>查詢</Button>
        </Box>
    );
}

export default SearchConditions;
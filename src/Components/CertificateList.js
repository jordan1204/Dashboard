import React,{useState,useEffect} from 'react';
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { indexRequest } from "../apiroute";
import { useDispatch, useSelector } from 'react-redux';
import { setConditionValue} from "../Redux/Reducers/IndexReducer";

const CertificateList = ()=>{
    const dispatch = useDispatch();
    const [certificateList,setCertificateList] = useState([]);
    const conditionValue = useSelector((state)=>state.index.conditionValue);
    const tabVal = useSelector((state)=>state.index.tabValue);
    useEffect(()=>{
        indexRequest.get('/GetCertificates',{params:{tableschema:localStorage.getItem("tableschema")}}).then(function(res){
            setCertificateList(res.data);
        });
    },[tabVal]);
    
    const handleChange = (event,newValue)=>{
        dispatch(setConditionValue({...conditionValue,certificateVal:newValue.value}));
    }

    return (<Autocomplete
        size="small"
        fullWidth
        getOptionLabel={(option)=>option.name}
        onChange={handleChange}
        options={certificateList}
        renderInput={(params) => <TextField {...params} label="證照" />}
      />);
}

export default CertificateList;
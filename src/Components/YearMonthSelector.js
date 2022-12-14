import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from "@mui/material/FormControl";
import { useDispatch, useSelector } from 'react-redux';
import { setConditionValue } from "../Redux/Reducers/IndexReducer";

const YearMonthSelector = () => {
  const dispatch = useDispatch();
  var yearList = [];
  var monthList = [];
  var now = new Date();
  const year = now.getFullYear();
  const conditionValue = useSelector((state) => state.index.conditionValue);

  const handleChangeYear = (event) => {
    dispatch(setConditionValue({...conditionValue,year:event.target.value}));
  };

  const handleChangeMonth = (event)=>{
    dispatch(setConditionValue({...conditionValue,month:event.target.value}));
  }

  for (let i = 0; i < 5; i++) {
    yearList.push(year - i);
  }
  for(let i =1;i<=12;i++){
    monthList.push(i);
  }
  return (
    <div>
      <FormControl sx={{marginRight:"20px"}} size="small">
        <InputLabel id="year-select">年</InputLabel>
        <Select
          labelId="year-select"
          value={conditionValue.year}
          onChange={handleChangeYear}
        >
          {
            yearList.map(function (el) {
              return (<MenuItem value={el}>{el}</MenuItem>)
            })
          }
        </Select>
      </FormControl>
      <FormControl size="small">
        <InputLabel id="month-select">月</InputLabel>
        <Select
          labelId="month-select"
          value={conditionValue.month}
          onChange={handleChangeMonth}
        >
          {
            monthList.map(function (el) {
              return (<MenuItem value={el}>{el}</MenuItem>)
            })
          }
        </Select>
      </FormControl>
      </div>

  );
}

export default YearMonthSelector;
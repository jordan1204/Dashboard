import React,{useState,useEffect} from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../Components/TabPanel';
import Box from '@mui/material/Box';
import { indexRequest } from "../../apiroute";
import { useDispatch, useSelector } from 'react-redux';
import { setTabValue } from '../../Redux/Reducers/IndexReducer';

const HomeTabs = ({children}) => {
    const dispatch = useDispatch();
    const tabValue = useSelector((state) => state.index.tabValue);
    const [tablist,setTablList] = useState([]);
    const handleChange = (event, newValue) => {
        dispatch(setTabValue(newValue));
    };
    useEffect(()=>{
        indexRequest.get("/GetTabs").then(function(res){
            setTablList([...res.data]);
            dispatch(setTabValue(res.data[0].data_id));
        });
    },[]);
    
    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleChange} variant="scrollable" scrollButtons="auto">
                    {tablist.map((el) => {
                        return <Tab label={el.dashboard_name} value={el.data_id}/>
                    })}
                </Tabs>
            </Box>
            {tablist.map((el) => {
                return (<TabPanel value={tabValue} index={el.data_id}>
                    {children}
                </TabPanel>);
            })}
        </Box>
    );
}

export default HomeTabs;
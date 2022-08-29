import React,{useEffect,useState} from "react";
import { chartRequest } from "../../apiroute";
import CommonUtil from "../../Common/CommonUtil";
import { makeStyles } from '@mui/styles';
import { useSelector,useDispatch } from "react-redux";
import qs from 'qs';
import DetailButton from "../../Components/DetailButton";
import {
  usePopupState,
  bindTrigger,
  bindMenu,
} from 'material-ui-popup-state/hooks';
import ContextMenu from "./ContextMenu";

const useStyles = makeStyles({
    DashboardItem: {
      width: '95%',
      height:"95%"
    },
    popover:{
      position: 'absolute !important',
      left:"0px",
      top:"0px"
    }
  });

const ElChart = ({id,autoupdate})=>{
   const dispatch = useDispatch();
    const [chart,setChart] =  useState(null);
    const classes = useStyles();
    const conditionValue = useSelector((state) => state.index.conditionValue);
    const search = useSelector((state)=>state.index.search);
    const [visibility, setVisibility] = useState('hidden');
    const popupMenuState = usePopupState({ variant: 'popover', popupId: 'menu', disableAutoFocus: true});
    const [chartData,setChartData] = useState({});
    const [chartName,setChartName] = useState("");
    const [individualSearch,setIndivisualSearch] = useState(false);
    const [timeId,setTimeId] = useState(null);
    const [autoUpdate,setAutoUpdate] = useState(autoupdate.isAutoUpdate)

    useEffect(()=>{
      if(autoUpdate){
        const id = setInterval(()=>{
          handleSearch();
        },autoupdate.autoupdate_minute*1000*60);
        setTimeId(id);
      }
      else{
        clearInterval(timeId);
        setTimeId(null);
      }
    },[autoUpdate]);

    useEffect(()=>{
      chartRequest.get("/GetChartInfo",{params:{id:id}}).then(function(resinfo){
        const apiName = resinfo.data.source_api;
        const chartType = resinfo.data.chart_type;
        setChartName(resinfo.data.chart_name)
        let options = CommonUtil.chartOptions(resinfo.data.chart_name);
        chartRequest.get("/"+apiName,{params:{tableschema:localStorage.getItem("tableschema"),conditions:conditionValue},paramsSerializer: params => {
          return qs.stringify(params)
        }}).then(function(reschart){
          let aachart = CommonUtil.chart[chartType](id,reschart.data,options);
          setChartData(reschart.data.datas);
          setChart(aachart);
        })
      })

    },[search,individualSearch]);

    const handleSearch = ()=>{
      setIndivisualSearch(!individualSearch);
    }
    const handleAutoUpdate = ()=>{
      setAutoUpdate(!autoUpdate);
    }
    
    return (
      <>
        <div className={classes.DashboardItem} onMouseOver={() => { setVisibility('visible'); }} onMouseOut={() => { setVisibility('hidden'); }}>
          <DetailButton className={classes.popover} {...bindTrigger(popupMenuState)} style={{ visibility: visibility }} />
          {chart}

        </div>
        <ContextMenu {...bindMenu(popupMenuState)} popupstate={popupMenuState} chartData={chartData} chartName={chartName} autoUpdate={autoUpdate} setIndivisualSearchState={handleSearch} setAutoUpdate={handleAutoUpdate} />
      </>
         
        
    );
}

export default ElChart;
import React,{useEffect} from "react";
import { chartRequest } from "../../apiroute";
import CommonUtil from "../../Common/CommonUtil";

const ElChart = ({id})=>{
    const [chart,setChart] =  React.useState(null);
    useEffect(()=>{
        chartRequest.get("/GetChartInfo",{params:{id:id}}).then(function(res){
            const apiName = res.data.source_api;
            const chartType = res.data.chart_type;
            const chartName = res.data.chart_name;
            let options = CommonUtil.chartOptions(chartName);
            chartRequest.get("/"+apiName,{params:{tableschema:localStorage.getItem("tableschema")}}).then(function(res){
                let aachart = CommonUtil.chart[chartType](id,res.data,options);
                setChart(aachart);
            })
        })
    },[]);
    return (
        <div>{chart}</div>
    );
}

export default ElChart;
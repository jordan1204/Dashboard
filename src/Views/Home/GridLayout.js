import React,{useEffect,useState} from "react";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Const from "../../Common/Const";
import { useSelector } from 'react-redux';
import { indexRequest } from "../../apiroute";
import ElChart from "./ElChart";

const ResponsiveGridLayout = WidthProvider(Responsive);
const GridLayout = ()=>{
    const tabValue = useSelector((state) => state.index.tabValue);
    const [layouts,setLayouts] = React.useState({});
    const [chartList,setChartList] = useState([]);
    useEffect(()=>{
        indexRequest.get("/GetDashboardDataBinds",{params:{dashboard_id:tabValue}}).then(function(res){
            setChartList(res.data.ids);
            setLayouts(res.data.layouts)
        })
    },[tabValue]);

    return (
        <ResponsiveGridLayout layouts={layouts}
        rowHeight={300} resizeHandles={['e', 'se', 's']}
        cols={Const.GridLayoutCols} compactType={null}>
            {
                chartList.map((el)=>{
                    return <div key={el}><ElChart id={el}/></div>;
                })
            }
        </ResponsiveGridLayout>
    );
}

export default GridLayout;
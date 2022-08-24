import React,{useEffect,useState} from "react";
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Const from "../../Common/Const";
import { useSelector,useDispatch } from 'react-redux';
import { indexRequest } from "../../apiroute";
import ElChart from "./ElChart";
import { setLayouts,setChartList } from "../../Redux/Reducers/IndexReducer";
import Ruler from "../../Components/Ruler";

const ResponsiveGridLayout = WidthProvider(Responsive);
const GridLayout = ()=>{
    const dispatch = useDispatch();
    const tabValue = useSelector((state) => state.index.tabValue);
    const layouts = useSelector((state)=>state.index.layouts);
    const chartList = useSelector((state)=>state.index.chartList);
    const displayRuler = useSelector((state)=>state.index.displayRuler);

    const [cols, setCols] = useState(0);

    useEffect(()=>{
        indexRequest.get("/GetDashboardDataBinds",{params:{dashboard_id:tabValue}}).then(function(res){
            dispatch(setChartList(res.data.items));
            dispatch(setLayouts(res.data.layouts));
        })
    },[tabValue]);

    const handleLayout = (current,all)=>{
        dispatch(setLayouts(all));
    }
    const handleLayoutWidth = function (width, margin, cols) {
        setCols(cols);
    }
    return (
        <>
            <Ruler amount={cols} display={displayRuler} />
            <ResponsiveGridLayout layouts={layouts}
                onWidthChange={handleLayoutWidth}
                rowHeight={300} resizeHandles={['e', 'se', 's']}
                onLayoutChange={handleLayout}
                cols={Const.GridLayoutCols} compactType={null}>
                {
                    chartList.map((el) => {
                        return (<div key={el.chart_id}><ElChart id={el.chart_id} autoupdate={el.autoupdate} /></div>);
                    })
                }
            </ResponsiveGridLayout>
        </>
    );
}

export default GridLayout;
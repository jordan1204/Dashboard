import Const from "./Const";
import {Pie,Bar} from "react-chartjs-2";
import {Chart,Tooltip,Legend,Title} from 'chart.js';//Base
import { ArcElement } from 'chart.js';//Pie
import {CategoryScale,LinearScale,BarElement } from 'chart.js';//Bar
import YearMonthSelector from "../Components/YearMonthSelector";
Chart.register(ArcElement,Tooltip,Legend,Title,CategoryScale,
    LinearScale,
    BarElement);

const CommonUtil = {
    chartOptions:function(title){
        return {
            aspectRatio:1,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: title
                }
            }
        }
    },
    chart:{
        pie:function(id,data,options){
            data.datasets[0].backgroundColor = Const.ChartBackgroundColor; 
            return <Pie datasetIdKey={id} data={data} options={options} width={null} height={null}/>
        },
        bar:function(id,data,options){
            data.datasets[0].backgroundColor = Const.ChartBackgroundColor[0]; 
            return <Bar datasetIdKey={id} data={data} options={options} width={null} height={null}/>
        }
    },
    getCondition:function(type){
        var condition = null;
        switch(type){
            case Const.ConditionType.CertificateList:
                condition = <div>aaa</div>;
                break;
            case Const.ConditionType.YearMonth:
                condition = <YearMonthSelector/>;
                break;
        }
        return condition;
    }
}

export default CommonUtil;
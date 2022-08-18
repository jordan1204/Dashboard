const db = require("../DbManager/Db");

const ChartHandler = {
    GetChartInfo:async (id)=>{
        const info = await db.FindOneWithParameter("SELECT source_api,chart_name,chart_type FROM dashboard.sys_chart Where data_id = $1",[id]);
        return info;
    },
    GetNurseSexData : async (tableschema,certificate)=>{
        var nursesexData = await db.FindList(`SELECT CASE WHEN nurse_sex = '1' THEN '男' ELSE '女' END AS labels,COUNT(*) AS value FROM ${tableschema}."Nurse_Sex"  Where nurse_certificate = '99' GROUP BY nurse_sex ORDER BY nurse_sex asc`);
        
        var labels = [];
        var datasets = [{label:"All",data:[]}];

        nursesexData.forEach((el)=>{
            labels.push(el.labels);
            datasets[0].data.push(el.value);
        });
        return {labels:labels,datasets:datasets};
    },
    GetNurseAgeData:async (tableschema,certificate)=>{
        var labels = ["30歲以下","30~40歲","40~50歲","50~60歲","60歲以上"];
        var queryArray = [
            db.FindScalar(`SELECT COUNT(*) As value FROM ${tableschema}.nurse Where nurse.nurse_birthday IS NOT NULL AND cast(date_part('year',age(now(),nurse.nurse_birthday)) as int) <=30`),
            db.FindScalar(`SELECT COUNT(*) As value FROM ${tableschema}.nurse Where nurse.nurse_birthday IS NOT NULL AND cast(date_part('year',age(now(),nurse.nurse_birthday)) as int) >30 AND cast(date_part('year',age(now(),nurse.nurse_birthday)) as int) <=40 `),
            db.FindScalar(`SELECT COUNT(*) As value FROM ${tableschema}.nurse Where nurse.nurse_birthday IS NOT NULL AND cast(date_part('year',age(now(),nurse.nurse_birthday)) as int) >40 AND cast(date_part('year',age(now(),nurse.nurse_birthday)) as int) <=50`),
            db.FindScalar(`SELECT COUNT(*) As value FROM ${tableschema}.nurse Where nurse.nurse_birthday IS NOT NULL AND cast(date_part('year',age(now(),nurse.nurse_birthday)) as int) >50 AND cast(date_part('year',age(now(),nurse.nurse_birthday)) as int) <=60`),
            db.FindScalar(`SELECT COUNT(*) As value FROM ${tableschema}.nurse Where nurse.nurse_birthday IS NOT NULL  AND cast(date_part('year',age(now(),nurse.nurse_birthday)) as int) >60`),
        ];
        var ageData = await Promise.all(queryArray);
        var datasets = [{label:"All",data:ageData}];

        return {labels:labels,datasets:datasets};
    },
    GetDutyDetailData:async(tableschema,year,month)=>{

        var DutydetailData = await db.FindList(`SELECT duty_day As labels,COUNT(*) As value FROM ${tableschema}.duty_detail Where duty_year = '2022' and duty_month = '08' GROUP BY duty_day`)
        var labels = [];
        var datasets = [{label:"All",data:[]}];

        DutydetailData.forEach((el)=>{
            labels.push(el.labels);
            datasets[0].data.push(el.value);
        });
        return {labels:labels,datasets:datasets};
    },
    GetDistrictData:async(tableschema,certificate)=>{
        var districtData = await db.FindList(`SELECT county_name,township_name,COUNT(*) AS value FROM ${tableschema}."Nurse_County_Ship" Where Nurse_Certificate = '99' GROUP BY COUNTY_NAME,TOWNSHIP_NAME`);
        var labels = [];
        var datasets = [{label:"All",data:[]}];
        districtData.forEach((el)=>{
            labels.push(el.county_name+el.township_name);
            datasets[0].data.push(el.value);
        });

        return {labels:labels,datasets:datasets};
    },
    GetPaymentCodeData:async(tableschema,year,month)=>{
        var PaymentCodeData = await db.FindList(`SELECT paymentcode As labels,COUNT(*) As value FROM ${tableschema}.duty_detail Where duty_year = '2022'
        and duty_month = '08' GROUP BY paymentcode`)
        var labels = [];
        var datasets = [{label:"All",data:[]}];

        PaymentCodeData.forEach((el)=>{
            labels.push(el.labels);
            datasets[0].data.push(el.value);
        });
        return {labels:labels,datasets:datasets};
    }
}

module.exports = ChartHandler;
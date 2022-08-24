const db = require("../DbManager/Db");

const ChartHandler = {
    GetChartInfo:async (id)=>{
        const info = await db.FindOneWithParameter("SELECT source_api,chart_name,chart_type FROM dashboard.sys_chart Where data_id = :data_id",{data_id:id});
        return info;
    },
    GetNurseSexData : async (tableschema,certificate)=>{
        var nursesexData = await db.FindListWithParameter(`SELECT CASE WHEN nurse_sex = '1' THEN '男' ELSE '女' END AS labels,COUNT(*) AS value FROM ${tableschema}."Nurse_Sex"  Where nurse_certificate = :certificate GROUP BY nurse_sex ORDER BY nurse_sex asc`,{certificate:certificate});
        
        var labels = [];
        var datasets = [{label:"All",data:[]}];
        var datas = {columns:["性別","數量"],rows:[]};

        nursesexData.forEach((el)=>{
            labels.push(el.labels);
            datas.rows.push([el.labels,el.value]);
            datasets[0].data.push(el.value);
        });


        return {labels:labels,datasets:datasets,datas:datas};
    },
    GetNurseAgeData:async (tableschema,certificate)=>{
        var labels = ["30歲以下","30~40歲","40~50歲","50~60歲","60歲以上"];
        var queryArray = [
            db.FindScalarWithParameter(`SELECT COUNT(*) As value FROM ${tableschema}.nurse 
                RIGHT JOIN (SELECT DISTINCT nurse_certificate.upper_guid,
                    nurse_certificate.nurse_certificate
                   FROM ${tableschema}.nurse_certificate) b ON nurse.guid = b.upper_guid 
                Where nurse.nurse_birthday IS NOT NULL AND cast(date_part('year',age(now(),nurse.nurse_birthday)) as int) <=30 AND b.nurse_certificate = :certificate`,{certificate:certificate}),
            db.FindScalarWithParameter(`SELECT COUNT(*) As value FROM ${tableschema}.nurse 
                RIGHT JOIN (SELECT DISTINCT nurse_certificate.upper_guid,
                nurse_certificate.nurse_certificate
                FROM ${tableschema}.nurse_certificate) b ON nurse.guid = b.upper_guid 
                Where nurse.nurse_birthday IS NOT NULL AND cast(date_part('year',age(now(),nurse.nurse_birthday)) as int) >30 AND cast(date_part('year',age(now(),nurse.nurse_birthday)) as int) <=40 AND b.nurse_certificate = :certificate`,{certificate:certificate}),
            db.FindScalarWithParameter(`SELECT COUNT(*) As value FROM ${tableschema}.nurse 
                RIGHT JOIN (SELECT DISTINCT nurse_certificate.upper_guid,
                nurse_certificate.nurse_certificate
                FROM ${tableschema}.nurse_certificate) b ON nurse.guid = b.upper_guid 
                Where nurse.nurse_birthday IS NOT NULL AND cast(date_part('year',age(now(),nurse.nurse_birthday)) as int) >40 AND cast(date_part('year',age(now(),nurse.nurse_birthday)) as int) <=50 AND b.nurse_certificate = :certificate`,{certificate:certificate}),
            db.FindScalarWithParameter(`SELECT COUNT(*) As value FROM ${tableschema}.nurse 
                RIGHT JOIN (SELECT DISTINCT nurse_certificate.upper_guid,
                nurse_certificate.nurse_certificate
                FROM ${tableschema}.nurse_certificate) b ON nurse.guid = b.upper_guid 
                Where nurse.nurse_birthday IS NOT NULL AND cast(date_part('year',age(now(),nurse.nurse_birthday)) as int) >50 AND cast(date_part('year',age(now(),nurse.nurse_birthday)) as int) <=60 AND b.nurse_certificate = :certificate`,{certificate:certificate}),
            db.FindScalarWithParameter(`SELECT COUNT(*) As value FROM ${tableschema}.nurse 
            RIGHT JOIN (SELECT DISTINCT nurse_certificate.upper_guid,
                nurse_certificate.nurse_certificate
                FROM ${tableschema}.nurse_certificate) b ON nurse.guid = b.upper_guid 
            Where nurse.nurse_birthday IS NOT NULL  AND cast(date_part('year',age(now(),nurse.nurse_birthday)) as int) >60 AND b.nurse_certificate = :certificate`,{certificate:certificate}),
        ];
        var ageData = await Promise.all(queryArray);
        var datasets = [{label:"All",data:ageData}];

        var datas = {columns:["年齡","數量"],rows:[]};
        ageData.forEach(function(el,index){
            datas.rows.push([labels[index],el])
        })

        return {labels:labels,datasets:datasets,datas:datas};
    },
    GetDutyDetailData:async(tableschema,year,month)=>{

        var DutydetailData = await db.FindListWithParameter(`SELECT duty_day As labels,COUNT(*) As value FROM ${tableschema}.duty_detail Where duty_year = :duty_year and duty_month = :duty_month GROUP BY duty_day`,{duty_year:year,duty_month:month})
        var labels = [];
        var datasets = [{label:"All",data:[]}];
        var datas = {columns:["服務日","數量"],rows:[]};

        DutydetailData.forEach((el)=>{
            labels.push(el.labels);
            datas.rows.push([el.labels,el.value]);
            datasets[0].data.push(el.value);
        });

        return {labels:labels,datasets:datasets,datas:datas};
    },
    GetDistrictData:async(tableschema,certificate)=>{
        var districtData = await db.FindListWithParameter(`SELECT county_name,township_name,COUNT(*) AS value FROM ${tableschema}."Nurse_County_Ship" Where Nurse_Certificate = :certificate GROUP BY COUNTY_NAME,TOWNSHIP_NAME`,{certificate:certificate});
        var labels = [];
        var datasets = [{label:"All",data:[]}];
        var datas = {columns:["區域","數量"],rows:[]};

        districtData.forEach((el)=>{
            const xName = el.county_name+el.township_name;
            labels.push(xName);
            datas.rows.push([xName,el.value]);
            datasets[0].data.push(el.value);
        });

        return {labels:labels,datasets:datasets,datas:datas};
    },
    GetPaymentCodeData:async(tableschema,year,month)=>{
        var PaymentCodeData = await db.FindListWithParameter(`SELECT paymentcode As labels,COUNT(*) As value FROM ${tableschema}.duty_detail Where duty_year = :duty_year
        and duty_month = :duty_month GROUP BY paymentcode`,{duty_year:year,duty_month:month})
        var labels = [];
        var datasets = [{label:"All",data:[]}];
        var datas = {columns:["服務代碼","數量"],rows:[]};

        PaymentCodeData.forEach((el)=>{
            labels.push(el.labels);
            datas.rows.push([el.labels,el.value]);
            datasets[0].data.push(el.value);
        });

        return {labels:labels,datasets:datasets,datas:datas};
    }

    
}

module.exports = ChartHandler;
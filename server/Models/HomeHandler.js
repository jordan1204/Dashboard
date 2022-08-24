const db = require("../DbManager/Db");

const HomeHandler = {
    GetTableSchema : async(account)=>{
        var tableschema = await db.FindScalarWithParameter('SELECT schema FROM dashboard.sys_user Where account = :account',{account:account});
        return tableschema;
    },
    GetDashboardList : async ()=>{
        var dashboardList = await db.FindList('SELECT data_id,dashboard_name FROM dashboard.sys_dashboard');
        return dashboardList;
    },
    GetDashboardDataBindList:async(dashboard_id)=>{
        var dashboarddatabindList = await db.FindListWithParameter(`SELECT b.autoupdate,b.autoupdate_minute,chart_id,lg,md,sm,xs,xxs FROM dashboard.sys_dashboard_databind a 
        INNER JOIN dashboard.sys_chart b ON a.chart_id = b.data_id Where dashboard_id = :dashboard_id`,{dashboard_id:dashboard_id});
        return dashboarddatabindList;
    },
    GetConditionTypeByDashboardId:async(dashboard_id)=>{
        var condition = await db.FindOneWithParameter('SELECT condition FROM dashboard.sys_dashboard Where data_id = :data_id',{data_id:dashboard_id});
        return condition;
    },

    GetCertificateList:async (tableschema)=>{
        var CertificateList = await db.FindList(` select Code_no as value , CODE_NAME  as name from  ${tableschema}.CODE_TYPE  where CODE_TYPE='Nurse_Certificate' `);
       
        return  CertificateList
    },

    SaveDashboardLayouts:async(layouts,dashboard_id)=>{
        const ids = await db.FindListWithParameter("SELECT data_id,chart_id FROM dashboard.sys_dashboard_databind Where dashboard_id = :dashboard_id",{dashboard_id:dashboard_id});
        for(let i=0;i<ids.length;i++){
            let lg = layouts.lg.find(x=>x.i == ids[i].chart_id);
            let md = layouts.md.find(x=>x.i == ids[i].chart_id);
            let sm = layouts.sm.find(x=>x.i == ids[i].chart_id);
            let xs = layouts.xs.find(x=>x.i == ids[i].chart_id);
            let xxs = layouts.xxs.find(x=>x.i == ids[i].chart_id);
            db.ExecuteWithParameter(`UPDATE dashboard.sys_dashboard_databind 
            SET lg = :lg,md= :md,sm= :sm,xs= :xs,xxs= :xxs,update_time = now() Where data_id = :data_id`,
            {lg:lg,md:md,sm:sm,xs:xs,xxs:xxs,data_id:ids[i].data_id});
        }
        
    }
}

module.exports = HomeHandler;
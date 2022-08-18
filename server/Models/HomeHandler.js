const db = require("../DbManager/Db");

const HomeHandler = {
    GetTableSchema : async(account)=>{
        var tableschema = await db.FindScalarWithParameter('SELECT schema FROM dashboard.sys_user Where account = $1',[account]);
        return tableschema;
    },
    GetDashboardList : async ()=>{
        var dashboardList = await db.FindList('SELECT data_id,dashboard_name FROM dashboard.sys_dashboard');
        return dashboardList;
    },
    GetDashboardDataBindList:async(dashboard_id)=>{
        var dashboarddatabindList = await db.FindListWithParameter('SELECT chart_id,lg,md,sm,xs,xxs FROM dashboard.sys_dashboard_databind Where dashboard_id = $1',[dashboard_id]);
        return dashboarddatabindList;
    }
}

module.exports = HomeHandler;
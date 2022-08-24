const homeHandler = require('../Models/HomeHandler');
var express = require('express');
var homeController = express.Router();
const ExcelJs = require('exceljs');
const CommonUtils = require('../public/CommonUtils');

homeController.get('/GetTableSchema',async function(req,res){
    const account = req.query.account;
    const tableschema = await homeHandler.GetTableSchema(account);
    res.send(tableschema);
});

homeController.get('/GetTabs',async function (req, res, next) {
    var dashboardList = await homeHandler.GetDashboardList();
    res.send(dashboardList);
});

homeController.get('/GetDashboardDataBinds',async function (req, res) {
    const dashboard_id = req.query.dashboard_id;
    var dashboarddatabindList = await homeHandler.GetDashboardDataBindList(dashboard_id);
    var layouts = {lg:[],md:[],sm:[],xs:[],xxs:[]};
    var items = [];
    dashboarddatabindList.forEach(element => {
        items.push({chart_id:element.chart_id
            ,autoupdate:{isAutoUpdate:element.autoupdate,autoupdate_minute:element.autoupdate_minute}});
        layouts.lg.push(element.lg);
        layouts.md.push(element.md);
        layouts.sm.push(element.sm);
        layouts.xs.push(element.xs);
        layouts.xxs.push(element.xxs);
    });

    res.send({layouts:layouts,items:items});
});

homeController.get('/GetConditionType',async function(req,res){
    const dashboard_id = req.query.dashboard_id;
    var condition = await homeHandler.GetConditionTypeByDashboardId(dashboard_id);
    res.send(condition);
})

homeController.get('/GetCertificates',async function (req, res) {
    const tableschema = req.query.tableschema;
    var dashboardList = await homeHandler.GetCertificateList(tableschema);
    res.send(dashboardList);
});

homeController.post('/SaveDashboardLayouts',async function(req,res){
    const layouts = req.body.layouts;
    const dashboard_id = req.body.dashboard_id;
    await homeHandler.SaveDashboardLayouts(layouts,dashboard_id);
    res.sendStatus(200);
});

homeController.post('/Excel',async function(req,res){
    const extension = req.body.extension;
    const chartData = req.body.chartData;
    var workbook = new ExcelJs.Workbook();
    const sheet = workbook.addWorksheet('sheet1'); 
    sheet.columns = chartData.columns.map(function(el){
        return {header: el, key: el}
    });
    chartData.rows.forEach(function(el){
        sheet.addRow(el);
    });

    var format = CommonUtils.GetFormat(extension,workbook)
    const data = await format.writeBuffer()
    res.send(data)
})


module.exports = homeController;
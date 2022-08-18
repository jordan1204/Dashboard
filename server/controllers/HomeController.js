const homeHandler = require('../Models/HomeHandler');
var express = require('express');
var homeController = express.Router();

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
    var ids = [];
    dashboarddatabindList.forEach(element => {
        ids.push(element.chart_id);
        layouts.lg.push(element.lg);
        layouts.md.push(element.md);
        layouts.sm.push(element.sm);
        layouts.xs.push(element.xs);
        layouts.xxs.push(element.xxs);
    });

    res.send({layouts:layouts,ids:ids});
});

homeController.get('/GetCertificates',async function (req, res) {
    const tableschema = req.query.tableschema;
    var dashboardList = await homeHandler.GetCertificateList(tableschema);
    res.send(dashboardList);
});

module.exports = homeController;
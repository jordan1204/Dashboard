const chartHandler = require('../Models/ChartHandler');
const homeHandler = require('../Models/HomeHandler');
var express = require('express');
var chartController = express.Router();

chartController.get("/GetChartInfo",async function(req,res){
    const id = req.query.id;
    const info = await chartHandler.GetChartInfo(id);
    res.send(info);
})

chartController.get("/nurse_sex",async function(req,res){
    const tableschema = req.query.tableschema;
    const conditions = req.query.conditions;
    let value = conditions.certificateVal;
    if(value==-1){
        let list = await homeHandler.GetCertificateList(tableschema);
        value = list[0].value;
    }
    const chartData = await chartHandler.GetNurseSexData(tableschema,value);
    res.send(chartData);
});

chartController.get("/nurse_age",async function(req,res){
    const tableschema = req.query.tableschema;
    const conditions = req.query.conditions;
    let value = conditions.certificateVal;
    if(value==-1){
        let list = await homeHandler.GetCertificateList(tableschema);
        value = list[0].value;
    }
    const chartData = await chartHandler.GetNurseAgeData(tableschema,value);
    res.send(chartData);
});

chartController.get("/dutydetail",async function(req,res){
    const tableschema = req.query.tableschema;
    const conditions = req.query.conditions;
    const year = conditions.year;
    const month = conditions.month;
    const chartData = await chartHandler.GetDutyDetailData(tableschema,year,month);
    res.send(chartData);
});

chartController.get("/nurse_districts",async function(req,res){
    const tableschema = req.query.tableschema;
    const conditions = req.query.conditions;
    let value = conditions.certificateVal;
    if(value==-1){
        let list = await homeHandler.GetCertificateList(tableschema);
        value = list[0].value;
    }
    const chartData = await chartHandler.GetDistrictData(tableschema,value);
    res.send(chartData);
});

chartController.get("/paymentcode",async function(req,res){
    const tableschema = req.query.tableschema;
    const conditions = req.query.conditions;
    const year = conditions.year;
    const month = conditions.month;
    const chartData = await chartHandler.GetPaymentCodeData(tableschema,year,month);
    res.send(chartData);
});


module.exports = chartController;
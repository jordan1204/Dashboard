const chartHandler = require('../Models/ChartHandler');
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
    const chartData = await chartHandler.GetNurseSexData(tableschema);
    res.send(chartData);
});

chartController.get("/nurse_age",async function(req,res){
    const tableschema = req.query.tableschema;
    const conditions = req.query.conditions;
    const chartData = await chartHandler.GetNurseAgeData(tableschema);
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
    const chartData = await chartHandler.GetDistrictData(tableschema);
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
import axios from "axios";

const BASEURL = "/api";
export const indexRequest = axios.create({
    baseURL:BASEURL 
});

export const chartRequest = axios.create({
    baseURL:BASEURL +"/chart"
});
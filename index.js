"use strict";
require("dotenv").config();

const express = require('express');
const app = express();

const cors = require('cors');
const path = require("path");
const v1Routes = require("./v1/routes");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// static files
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", v1Routes);

// 404, Not Found
app.use((req, res, next) =>  res.json({
    success : false,
    statusCode : 404,
    message : "NOT_FOUND"
}));

// Error handling
app.use((error, req, res, next) => {
    console.error(error);
    // res.json({
    //     success : false,
    //     statusCode : 400,
    //     message : error.message || error
    // }
    
});

app.listen(port, ()=> {
    console.log(`Environment:`, process.env.NODE_ENV);
    console.log(`Running on:`, port);
});

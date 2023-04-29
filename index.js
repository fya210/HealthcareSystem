// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const morgan = require("morgan");
// const PatientRoute = require("./routes/patient.routes");
import patientRoutes from "./routes/patient.routes.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";

//setting up database for entire system
mongoose
    .set("strictQuery", false)
    .connect("mongodb://127.0.0.1:27017/medi", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>console.log("mongo created"))
    .catch((error)=>console.log(error));

//instance of express server
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("tiny"));
app.use("/patient", patientRoutes());
app.get("", (req, res) => {res.send("Hello World")});

app.listen(4090, ()=>{
    console.log("server running");
});
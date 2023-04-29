// const express = require("express");
// const PatientController = require("../controllers/patient.controller");
import express from "express"
import PatientController from "../controllers/patient.controller.js";

export default () => {
    const router = express.Router();
    router.post("/register", PatientController.createAccount);
    router.post("/login",PatientController.login);

    return router;
};
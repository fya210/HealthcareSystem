// const PatientService = require("../service/patient.service");
import PatientService from "../service/patient.service.js";

export default class PatientController{
    static async createAccount(req, res){
        const reqBody = req.body;

        // Preprocess - checking for required keys
        const check = await PatientService.createAccount(reqBody);
        if(check && check.success){
            res.status(200).json(check);
        }
        else{
            res.status(400).json(check);
        }
    } 

    static async login(req, res){
        // Preprocess
        const check = await PatientService.login(req.body);
        if(check && check.success){
            res.status(200).json(check);
        }
        else{
            res.status(400).json(check);
        }
    }
}
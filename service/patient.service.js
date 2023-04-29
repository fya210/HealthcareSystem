// const PatientDB = require("../models/patient.model");
// const bcryptjs = require("bcryptjs");
import PatientDB from "../models/patient.model.js"
import bcryptjs from "bcryptjs"

export default class PatientService{
    static async createAccount(patient){
        const {phone} = patient;
        const check = await PatientDB.findOne({phone});
        if(check){
            return {message:"User already exists in system!", success: false}; 
        }
        const {password} = patient;

        //encrypting password before storage
        const hashedPassword = await bcryptjs.hash(password,10);
        patient["password"] = hashedPassword;
        //try catch for error handling
        const newAccount = await PatientDB.create(patient);
        return {data: newAccount, message: "New user created successfully", success: true };
    }

    static async login(patient){
        const {phone, password} = patient;
        const foundAccount = await PatientDB.findOne({phone});
        if(foundAccount){
            const isSame = await bcryptjs.compare(password, foundAccount.password);
            if(isSame){
                return {data: foundAccount, message: "Login Successful", success: true};
            }
            return {message: "Phone or password is incorrect", success: false};
        }
        else{
            return {message: "Invalid credentials", success: false};
        }
    }
}




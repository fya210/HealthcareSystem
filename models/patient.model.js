// const mongoose = require("mongoose");
import mongoose from "mongoose";

const PatientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true
        },

        password: {
            type: String,
            required: true,
        },

        age: {
            type: Number,
            required: true,
            lowercase: true
        },

        address: {
            type: String,
            required: true,
            lowercase: true
        },

        gender: {
            type: String,
            required: true,
            lowercase: true
        },

        phone: {
            type: String,
            required: true,
            lowercase: true
        },

    },
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret, options) {
                delete ret.password;
            }
        }
    }

)


export default mongoose.model("Patient", PatientSchema);


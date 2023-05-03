import mongoose from "mongoose";

const degreeSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  fromDate: {
    type: Date,
    required: true
  },
  toDate: {
    type: Date,
    required: true
  },
  university: {
    type: String,
    required: true
  }
});

export default mongoose.model("Degree", degreeSchema);

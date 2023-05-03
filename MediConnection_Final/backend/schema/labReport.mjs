import mongoose from "mongoose"

const labReportSchema = new mongoose.Schema({
  fromUsername: {
    type: String,
    required: true
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

export default mongoose.model('LabReport', labReportSchema);

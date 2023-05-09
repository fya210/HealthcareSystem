import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  fromUsername: {
    type: String,
    required: true,
  },
  toUsername: {
    type: String,
    required: true,
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Payment", paymentSchema);

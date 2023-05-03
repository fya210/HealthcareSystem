import mongoose from 'mongoose';

const insuranceSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  insuranceId: {
    type: String,
    required: true,
  },
  providerName: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
});

export default mongoose.model('Insurance', insuranceSchema);

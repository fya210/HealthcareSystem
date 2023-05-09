import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Job', jobSchema);
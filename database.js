import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  username: String,
  email: String,
  Phone: Number,
  lastLogin: Date,
  checkoutStatus: Boolean,
});

const Customer = mongoose.model('Customer', CustomerSchema);

export default Customer;

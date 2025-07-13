import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp: String,
    email: String
})

const Otp = new mongoose.model('Otp', otpSchema);

export default Otp;
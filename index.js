import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import Otp from './models/otpModel.js';
import sendEmail from './utils/sendEmail.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

function generateOtp(){
    let otp = '';
    for(let otpDig = 0; otpDig < 6; otpDig++){
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
}

app.get('/', (req, res)=>{
  res.send('Hello World');
})

app.post('/send-otp', async (req, res) => {
  const {email} = req.body;
  const otp = generateOtp();

  await Otp.findOneAndUpdate(
  { email },
  { $set: { otp } },
  { upsert: true, new: true }
);
 
  try {
    await sendEmail(email, otp);
    res.status(200).json({ message: "OTP sent successfully", success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP,Please try again", success: false });
  }
//   const expiresAt = Date.now() + 5 * 60 * 1000;
})

app.post('/verify-otp', async (req, res) => {
  const {email, otp} = req.body;
  const doc = await Otp.findOne({email});
  if(doc.otp === otp){
    res.status(200).json({ message: "verification success", success: true }); 
  }
  else{
   res.status(500).json({ message: "verification failed, Incorrect Otp", success: false }); 
  }
})

const port = parseInt(process.env.PORT) || 5000;

mongoose.connect(process.env.MONGO_DB_CONNECTION_URL);

app.listen(port, (err) => {
  if(err) console.log(err);
  console.log(`listening on port ${port}`);
});
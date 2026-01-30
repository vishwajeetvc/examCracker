import app from './app.js';
import { configDotenv } from 'dotenv';
import connectDB from './config/db.js';

configDotenv();

connectDB();

const PORT = 4000;

app.listen(PORT , ()=>{
  console.log("Server is running.")
})

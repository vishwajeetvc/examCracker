import app from './app.js';
import { configDotenv } from 'dotenv';
import connectDB from './config/db.js';

configDotenv();

connectDB();

const PORT = 4000;

app.get('/health', (_req, res)=>{
  res.send({message : "Ok"})
})


app.listen(PORT , ()=>{
  console.log("Server is running.")
})

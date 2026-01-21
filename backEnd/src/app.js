import express from "express";
import cors from "cors";
import userRoute from './routes/userRoute.js'

const app = express();

app.use(cors({origin:"*"}));

app.use(express.json());

app.use('/api/users', userRoute);

export default app;

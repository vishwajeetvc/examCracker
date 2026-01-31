import express from "express";
import cors from "cors";
import userRoute from './routes/userRoute.js'
import catalogueRoute from './routes/catalogueRoute.js'
import mcqRoute from './routes/mcqRoute.js'
import { authMiddleware } from "./middleware/auth.middleware.js";

const app = express();

app.use(cors({origin:"*"}));

app.use(express.json());

app.use('/api/users', userRoute);
app.use('/api/catalogue', catalogueRoute);
app.use('/api/mcq', mcqRoute);

app.get('/', authMiddleware, (_req, res)=>{
  res.send("You app is working");
})

export default app;

// Once index is create using mongoose you have to delete it mannually.

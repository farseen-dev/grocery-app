import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import userRouter from './routes/userRoutes.js';


const app = express();
const port = process.env.port || 4000;

mongoose.connect(process.env.mongo_URL).then(() => {
    console.log("db connected");
}).catch((err) => {
    console.log(err.message);
});

const allowedOrigins = ['http://localhost:5173'];

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get('/', (req, res) => res.send("API is working"));
app.use('/api/user', userRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

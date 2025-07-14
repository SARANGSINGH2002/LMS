import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/db.js';
// import { connect } from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import userRoute from './routes/user.route.js';
import courseRoute from './routes/course.route.js'
import mediaRoute from "./routes/media.route.js"
import purchaseRoute from "./routes/purchaseCourse.route.js"
import courseProgressRoute from "./routes/courseProgress.route.js"

dotenv.config({});
// call database connection here
connectDB();
const app = express();

const  PORT = process.env.PORT ;

// default middleware
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
//This above line allows your backend (Node.js server running on 8080) to ACCEPT requests from your frontend (which is on port 5173).
// Why needed? Browsers block requests between different ports (CORS policy). This line says: ➡️ "Hey backend, allow requests from frontend at localhost:5173."


app.use("/api/v1/media", mediaRoute)
app.use("/api/v1/user", userRoute); // middleware
//   http://localhost:8080 + api/v1/user + register => http://localhost:8080/api/v1/user/register  => jab bhi yeh register hit hoga toh user.route.js min present register route call hoga aur call hote hi register wala sara kam ho jayega jo ki user.controller.js mein likha hua hai


// app.get("/home",(_,res)=>{   // no need of this currently
//     res.status(200).json({
//         success: true,
//         message: "Hello I am coming from backend"
//     })
// })
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/purchase", purchaseRoute)
app.use("/api/v1/progress", courseProgressRoute)

app.listen(PORT,()=>{
    console.log(`Port listen at Port ${PORT}`)
})

//CORS Middleware allows frontend to send API requests to backend.Route Middleware handles those requests in Express server.
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors'
import mongoose from 'mongoose'
import enquiryRouter from './models/Rotutes/signinRouter.js';
let app=express()
app.use(cors())
app.use(express.json())
app.use('/api',enquiryRouter)
mongoose.connect(process.env.DBURL).then(()=>{
    console.log('Connect to Database')
    app.listen(process.env.PORT,()=>{
console.log("App is listening")
    })
}).catch((err)=>{
    console.log(err)
})
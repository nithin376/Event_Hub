import { signinmodel, NewEventModel, NewEntryModel } from './models/siginModel.js';
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { transporter } from './utils/transpoerter.js';
import dotenv from 'dotenv'
dotenv.config();
//contrloer for SignUP
export async function siginInsert (req, res) {
    let { email, password,userType } = req.body;
    let newOrganizerId;
    try {
        const salt=await bcrypt.genSalt()
        const hashedPassword=await bcrypt.hash(password,salt)
        const existingUser = await signinmodel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registered.' });
        }
        if(userType=="Organizer")
        {
            newOrganizerId=crypto.randomUUID();
        }
        const newUser = new signinmodel({
            email,
            password:hashedPassword,
            userType,
            OrganizerId:newOrganizerId
        });
        await newUser.save();
        res.status(201).json({ status: 1, message: "Inserted successfully" });
    } catch (err) {
        console.error("Error saving data:", err);
        res.status(500).json({ status: 0, error: "Internal Server Error" });
    }
};
//controller for Login Acces
export async function LoginInsert(req,res){
    const {email,password,userType}=req.body;
    try{
    const user= await signinmodel.findOne({email})
    if(!user)
       return res.status(404).json({message:"User not found"}) 
    const isMatch= await bcrypt.compare(password,user.password)
    const isuser=userType===user.userType
    if(!isMatch || !isuser)
        return res.status(401).json({message:'Invalid Credentials'})
    if (user.userType === 'Organizer'){
            return res.status(200).json({ 
                message: 'Logged in Successfully', 
                organizerId:user.OrganizerId,
            });
        }
           if (user.userType === 'Admin' || user.userType === 'User') {
            return res.status(200).json({ 
                message: 'Logged in Successfully',
                email:user.email
            });
        }
    }
    catch(err){
  return res.status(500).json({message:'Server Error'})
    }
}
//controller for Creating NewEvent
export async function NewEventInsert(req,res){
    try{
    const{Title,Descrption,Location,Date,Category,Fees,PrizeMoney,organizerId}=req.body;
    const newEvent=new NewEventModel({
        Title,
        Descrption,
        Location,
        Date,
        Category,
        Fees,
        PrizeMoney,
        organizerId
    })
   await newEvent.save();
   return res.status(200).json({message:"New Event added succsefully"})
}
catch(err){
return res.status(400).json({message:"Error in saving the event",Error:err.message})
}
}
//Controller to Fetch Events
export async function EventList(req,res){
    try{
const List=await NewEventModel.find()
    return res.status(200).json({List})
    }
    catch(err){
        return res.status(500).json({message:'Server Error',Error:err});
    }
}
//Controller For Creating Entry
export  async function Entry(req,res){
try{
    const{TeamName,email,PhoneNumber,eventid}=req.body
    const event=await NewEventModel.findById(eventid)
    if(!event)
     return res.status(404).json({message:'Event not Found'});
    const newEntry=new NewEntryModel({
        TeamName,
        email,
        PhoneNumber,
        eventid,
        organizerId:event.organizerId,
        Title:event.Title,
        Category:event.Category
    })
    await newEntry.save()
    const mailOptions={
        from:`"EventHUb"<${process.env.SENDER_EMAIL}>`,
        to:email,
        subject:'Event registration confirmation',
        html:`<h1>Thank you for Regstering</h1>
                <p>Hello ${TeamName},</p>
                <p>Your registration for the event ${event.Title} has been successfully received.</p>
                <p>We look forward to see you there!</p>
                <br>
                <p>Best regards,</p>
                <p>The EventHub Team</p>`
    }
    await transporter.sendMail(mailOptions);
    return res.status(200).json({message:"Added Succefully",
        eventid
    }) 
}
catch(err){
      return res.status(500).json({Error:err.message})  
    }
}
//Controlerr To Manage Entries
export async function ManageEntry(req,res){
    try{
        const organizerId=req.query.organizerId;
    const data=await NewEntryModel.find({organizerId});
    return res.status(200).json({"data":data})
}
catch(err){
    return res.status(500).json({error:err,message:"Server Error"})
}
}; 
//Controller to fetch the Registred Events
export async function Registartions(req,res){
    const {email}=req.params;
    try{
    const response=await NewEntryModel.find({email});
    return res.status(200).json({data:response})
    }
    catch(err){
        return res.status(401).json({message:err})
    }
}
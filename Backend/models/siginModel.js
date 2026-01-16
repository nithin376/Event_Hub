import mongoose from 'mongoose'
const schema=mongoose.Schema;
const signin=new schema({
   email:{type:String,
    required:true,
    unique:true
   },
   password:{
    type:String,
    required:true
   },
   userType:{
      type:String,
      required:true
   },
   OrganizerId:{
      type:String,
      unique:true,
      sparse:true
   }  
})
const NewEvent=new schema({
   Title:{
      type:String,
      required:true
   },
   Descrption:{
      type:String,
      required:true
   },
   Location:{
      type:String,
      required:true
   },
   Date:{
      type:String,
      required:true
   },
   Category:{
    type:String,
    required:true
   },
   Fees:{
      type:String
   },
   PrizeMoney:{
      type:String
   },
    organizerId:{
      type:String,
      required:true
   }
})
const NewEntry=new schema({
   TeamName:{
      type:String,
      required:true
   },
   email:{
      type:String,
      required:true
   },
   PhoneNumber:{
      type:String,
      required:true
   },
   eventid:{
      type:String,
      required:true
   },
   organizerId:{
      type:String,
      required:true
   },
   Title:{
      type:String,
      required:true
   },
   Category:{
      type:String,
      required:true
   },
   id:{
      type:String,
      required:true
   }
})
const Aimodel= new schema({
              Prompt:
              {
               type:String,
              required:true
              }

})
export const signinmodel=mongoose.model('UserData',signin)
export const NewEventModel=mongoose.model('Event',NewEvent)
export const NewEntryModel=mongoose.model('Entry',NewEntry)
export const NewAimodel=mongoose.model('Ai',Aimodel)

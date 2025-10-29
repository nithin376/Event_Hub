import express from 'express'
import {siginInsert,LoginInsert, NewEventInsert, EventList, Entry, ManageEntry, Registartions}  from '../../signinController.js';
let enquiryRouter=express.Router()
enquiryRouter.post('/insert',siginInsert)
enquiryRouter.post('/Login',LoginInsert)
enquiryRouter.post('/NewEvent',NewEventInsert)
enquiryRouter.get('/List',EventList)
enquiryRouter.post('/Entry',Entry)
enquiryRouter.get('/ManageEntry',ManageEntry)
enquiryRouter.get('/registrations/:email',Registartions)
export default enquiryRouter;
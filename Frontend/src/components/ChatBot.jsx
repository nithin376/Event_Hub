import React from 'react'
import { useState,useEffect,useRef } from 'react'
import axios from 'axios'
import './chatbot.css'
function ChatBot() {
  const[chatHistory,setchatHistory]=useState([]);
  const[formdata,setfromdata]=useState("");
  const[loading,setloading]=useState(false)
 const scrollRef=useRef(null);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setloading(true)
    const usermessage={role:'human',text:formdata}
    const userinput=formdata;
    setchatHistory((prev)=>[...prev,usermessage])
    setfromdata('');
    setloading(true)
    try{
    const response=await axios.post("http://localhost:4001/api/Aimodel",{Prompt:userinput})
    const airesponse={role:'ai',text:response.data.data}
    setchatHistory((prev)=>[...prev,airesponse]);
    }
    catch(err){
      console.log(err)
      setchatHistory((prev)=[...prev,{role:'ai',text:"sorry,I ran into error"}])
    }finally{
      setloading(false)
    }
  }
  return (
    <>
    <div className='main_container'>
        <h1>Your Creative Partner</h1>
        <div className='chatbot'>
        {chatHistory.map((msg, index) => (
            <div key={index} className={`message-bubble ${msg.role}`}>
              <p><strong>{msg.role === 'ai' ? 'AI: ' : 'You: '}</strong>{msg.text}</p>
            </div>
          ))}
        {loading && <p className="loading-text">AI is thinking...</p>}
        <div ref={scrollRef} />
        </div>
            <form className='form' onSubmit={handleSubmit}>
          <input type='text'placeholder='enter your message' value={formdata} onChange={(e)=>setfromdata(e.target.value)}></input>
          <button className='submit'type='submit'disabled={loading}>Send</button>
          </form>
    </div>
    </>
  )
}
export default ChatBot
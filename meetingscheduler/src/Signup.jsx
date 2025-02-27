import { useState } from 'react';
import "./components/Signup.css"
import { Link } from 'react-router-dom';
import axios from 'axios'
function Signup(){
   const [firstName,setFN]=useState("")
   const [lastName,setLN]=useState("")
   const [email,setEM]=useState("")
   const [password,setPass]=useState("")
   const [phoneNumber,setPh]=useState(0)
   const handleSubmit= async(event)=>{
      event.preventDefault();
      const req=await axios.post("https://sjit2025-mern.onrender.com/signup",{
         firstName: firstName,
         lastName: lastName,
         email: email,
         password:password,
         phoneNumber:phoneNumber
      });
      const message=req.data.message;
      alert(message);
   };
   return <div>
   <form onSubmit={handleSubmit}>
   <label htmlFor="FName">FirstName:</label>
   <input type="text" value={firstName}onChange={e=>setFN(e.target.value)} placeholder="Enter your first name" required/>
   <label htmlFor="LName">LastName:</label>
   <input type="text" value={lastName}onChange={e=>setLN(e.target.value)} placeholder="Enter your Last name" required/>
   <label htmlFor="EName">EmailId:</label>
   <input type="email" value={email}onChange={e=>setEM(e.target.value)} placeholder="Enter your mail-id"required/>
   <label htmlFor="PName">Password:</label>
   <input type="password" value={password}onChange={e=>setPass(e.target.value)} placeholder="Enter your password" required/>
   <label htmlFor="PhName">PhoneNumber:</label>
   <input type="number" value={phoneNumber}onChange={e=>setPh(e.target.value)} placeholder="Enter your phoneNumber" required/>
   <div className='butt'><button>Submit</button></div>
   <Link to="/login">Already have an account?</Link>
   </form>
   </div>
}
export default Signup; 
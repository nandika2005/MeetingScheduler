import { useState } from 'react';
import styles from "./components/Signup.module.css";
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
      const req=await axios.post("http://localhost:3002/signup",{
         firstName: firstName,
         lastName: lastName,
         email: email,
         password:password,
         phoneNumber:phoneNumber
      });
      const message=req.data.message;
      alert(message);
   };
   return (
      <div className={styles.divi}> 
      <h1>SignUp</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
      <label htmlFor="FName">First Name:</label>
      <input type="text" value={firstName} onChange={e=>setFN(e.target.value)} placeholder="Enter your first name" required/>
      
      <label htmlFor="LName">Last Name:</label>
      <input type="text" value={lastName} onChange={e=>setLN(e.target.value)} placeholder="Enter your last name" required/>
      
      <label htmlFor="EName">Email ID:</label>
      <input type="email" value={email} onChange={e=>setEM(e.target.value)} placeholder="Enter your mail-id" required/>
      
      <label htmlFor="PName">Password:</label>
      <input type="password" value={password} onChange={e=>setPass(e.target.value)} placeholder="Enter your password" required/>
      
      <label htmlFor="PhName">Phone Number:</label>
      <input type="number" value={phoneNumber} onChange={e=>setPh(e.target.value)} placeholder="Enter your phone number" required/>
      
      <div className={styles.butt}><button>Submit</button></div>
      <Link className={styles.link} to="/Login">Already have an account?</Link>
      </form>
   </div>
   
   )
}
export default Signup;
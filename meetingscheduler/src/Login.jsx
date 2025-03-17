import { Link, useNavigate } from "react-router-dom";
import styles from "./components/Login.module.css"; 
import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEm] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents page reload

    try {
        const response = await axios.post("https://meetingscheduler-0r5o.onrender.com/login", { email, password });

        if (response.data.success) {
            localStorage.setItem("token", `Bearer ${response.data.token}`); // Store token
            console.log("Login successful, token stored.");
            navigate("/Dash");  // Redirect to dashboard
        }
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.divi}>  
      <h1>Login</h1>
      <form className={styles.log} onSubmit={handleLogin}>
        <label htmlFor="EName">Email ID:</label>
        <input type="email" value={email} onChange={(e) => setEm(e.target.value)} placeholder="Enter your email" required/>

        <label htmlFor="PName">Password:</label>
        <input type="password" value={password} onChange={(e) => setPass(e.target.value)} placeholder="Enter your password" required/>

        <div className={styles.butt}>
          <button type="submit">Submit</button>
        </div>

        <Link className={styles.link} to="/signup">Create an account?</Link>
      </form>
    </div>
  );
}

export default Login;

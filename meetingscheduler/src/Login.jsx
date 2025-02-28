import { Link, useNavigate } from "react-router-dom";
import "./components/Login.css";
import { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEm] = useState("");
  const [password, setPass] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("https://sjit2025-mern.onrender.com/login", {
        email: email,
        password: password,
      });

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user)); 
        alert("Login Successful!");
        navigate("/dash"); 
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      alert("Login failed. Please check your credentials.");
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="divi">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="EName">Email ID:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEm(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="PName">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <div className="butt">
          <button type="submit">Submit</button>
        </div>
        
        <Link to="/signup">Create an account?</Link>
      </form>
    </div>
  );
}

export default Login;

import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Contact from "./Contact";
import Home from "./Home";
import Signup from "./Signup";
import About from "./About";
import Login from "./Login";
import WhyChooseMeetUp from "./WhyChooseMeetUp";
import Dashboard from "./Dashboard";
import CreateMeeting from "./CreateMeeting";
import Availability from "./Availability";
import Settings from "./Settings";

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/why" element={<WhyChooseMeetUp />} />
        <Route path="/Dash" element={<Dashboard />}>
          <Route path="Create" element={<CreateMeeting />} />
          <Route path="Avail" element={<Availability />} />
          <Route path="Settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const MainLayout = () => {
  const location = useLocation();

  const hideNavbar = location.pathname.startsWith("/Dash");

  return !hideNavbar && <Navbar />;
};

export default App;

import './components/Navbar.css'
import { Link } from 'react-router-dom';
const Navbar=()=>{
    return(
        <>
        <header>
        <nav>
        <h3>MeetUp</h3>
          <li><Link to='/Home'>Home</Link></li>
          <li><Link to='/About'>About Us</Link></li>
          <li><Link to='/Contact'>Contact</Link></li>
          <button><Link to='<Signup/>'>Get Started</Link></button>
        </nav>
      </header>
      </>
    )
}
export default Navbar;
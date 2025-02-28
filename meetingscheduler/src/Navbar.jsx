import './components/Navbar.css'
import {Link} from 'react-router-dom';
const Navbar=()=>{
    return(
        <>
        <header>
        <nav>
          <li><h3>MeetUp</h3></li>
          <li><Link to='/Home'>Home</Link></li>
          <li><Link to='/About'>About Us</Link></li>
          <li><Link to='/Contact'>Contact</Link></li>
          <li><button><Link to='/Signup'>Get Started</Link></button></li>
        </nav>
      </header>
      </>
    )
}
export default Navbar;
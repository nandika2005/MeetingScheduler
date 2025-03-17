import './components/Navbar.css'
import {Link} from 'react-router-dom';
import meet from './components/MeetUp.png';
const Navbar=()=>{
    return(
        <>
        <header>
        <nav>
        <li><img src={meet} alt="MeetUp Logo" /></li>
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
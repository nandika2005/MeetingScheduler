import './App.css';
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import Navbar from './Navbar';
import Contact from './Contact';
import Home from './Home';
import Signup from './Signup';
import About from './About';
function App() {
  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/Signup' element={<Signup/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}
export default App;

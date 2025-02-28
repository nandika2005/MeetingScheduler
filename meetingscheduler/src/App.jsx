import './App.css';
import{BrowserRouter,Routes,Route} from 'react-router-dom';
import Navbar from './Navbar';
import Contact from './Contact';
import Home from './Home';
import Signup from './Signup';
import About from './About';
import Login from './Login';
import WhyChooseMeetUp from './WhyChooseMeetUp';
import Dashboard from './Dashboard';
function App() {
  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/About' element={<About/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/why' element={<WhyChooseMeetUp/>}/>
        <Route path='/dash' element={<Dashboard/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}
export default App;

import './components/Home.css'
import MeetingAnimation from './components/MeetingAnime';
const Home=()=>{
    return(
        <>
        <div className='body'>
        <h1>MeetUP</h1>
        <p>Effortlessly plan, manage, and organize meetings with our powerful MeetUp. Whether you're coordinating with a team or setting up personal appointments,
           our intuitive platform streamlines scheduling, eliminates conflicts, and ensures smooth collaboration</p>
           <button>Sign Up with Google</button>
           <MeetingAnimation/>
        </div>
        </>
    )
}
export default Home;
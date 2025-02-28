import GirlAnimation from './components/girlAnimation';
import './components/Home.css'
import MeetingAnimation from './components/MeetingAnime';
const Home=()=>{
    return(
        <>
        <div className='body'>
        <h1>Schedule Your Meetings...</h1>
        <p>Effortlessly plan, manage, and organize meetings with our powerful MeetUp. Whether you're coordinating with a team or setting up personal appointments,
           our intuitive platform streamlines scheduling, eliminates conflicts, and ensures smooth collaboration</p>
           <button>Sign Up with Google</button>
           <section className='section'>
            <div className='img1'> <GirlAnimation/></div>
           <div className='img2'><MeetingAnimation/></div>
           </section>
        </div>
        </>
    )
}
export default Home;

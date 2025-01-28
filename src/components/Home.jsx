import Header from "./Header/Header"
import { Link } from "react-router-dom";

export default function Home() {
    return (
    <>
    <Header/>
    <div className="aboutContainer"> 
    <h2> About </h2>
    <p> While Geometry Dash allows users to keep track of their own level completions, it does NOT have 
        the functionality for users to compare or even view the completions of others. This project aims to fix this problem
        by serving as a hub whereby friends can share their demon completions (and progress!) with ease. 
        Create an account now  to form your own demon list and join in on the fun!
        <Link className="inlineLink" to="/signup"> Sign Up </Link>
    </p>
    </div>
    </>
    );
}
import { useParams, Link } from "react-router-dom";
import defaultUserImg from "../assets/defaultPFP.png";

export default function User() {
    let params = useParams();
    console.log(params);
    return (
    <div className="userBox">
    <h1 className="username"> {params.username}'s Profile</h1>
    <img className="profilePicture" src={defaultUserImg}/>
    <div className="profileButtons"> 
    <Link to={`/demonlist/${params.username}`}> <button className="viewListBttn"> View Demon List </button> </Link>
    <Link to={`/demonlist/compare/${params.username}`}> <button className="compareListBttn"> Compare Lists </button> </Link>
    </div>
    </div>
    );
}
import {useLoaderData, Link} from "react-router-dom";
import defaultUserImg from "../assets/defaultPFP.png";

export default function Users() {
    const allUsers = useLoaderData();
    console.log(allUsers);

    return (
    <>
    <h1> Users </h1>
    <div className="userContainer"> 
                {allUsers.map((users) => {
                return (
                    <Link className="userItem" to={`${users.username}`}>
                        {/*<img src={defaultUserImg} />*/}
                        <h3> {users.username} </h3> 
                    </Link>
                );
                })}
            
    </div>
    </>
    );
}

export async function loader() {
    const response = await fetch('https://gd-demon-tracker-be-production.up.railway.app:3001/users', {
      });

    const resData = await response.json();
    return resData.users;
}
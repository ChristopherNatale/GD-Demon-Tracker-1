import { useParams, useLoaderData } from "react-router-dom";
import { getAuthToken } from "../util/auth";
import { jwtDecode } from "jwt-decode";
import ComparisonTable from "../components/ComparisonTable";

export default function CompareUserDemonLists() {

    const token = getAuthToken();
    let params = useParams();
    const loggedUser = jwtDecode(token).username;
    const comparedUser = params.username;
    const allDemons = useLoaderData();
    

    const loggedUserDemons = allDemons.filter((demon) => {
        if (demon.username === loggedUser) {
            return demon;
        }
    });

    const comparedUserDemons = allDemons.filter((demon) => {
        if (demon.username === comparedUser) {
            return demon;
        }
    });

    return (
    <div>
    <ComparisonTable allDemons={allDemons} user1Demons={loggedUserDemons} 
    user2Demons={comparedUserDemons} user1={loggedUser} user2={comparedUser}/>
    </div>
    );
}

export async function loader({params}) {

    const token = getAuthToken();
    const loggedUser = jwtDecode(token).username;
    const comparedUser = params.username;

    const response = await fetch('https://gd-demon-tracker-be-production.up.railway.app/demonlist/join/' + loggedUser + '/' + comparedUser, {
    });

    const resData = await response.json();

    if (!response.ok) {
        throw new Response(JSON.stringify({message: 'Could not fetch the demon list.'}), {
        status: 500,
     });
     }

    return resData;
}
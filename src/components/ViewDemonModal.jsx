import {useNavigate, Link, useLoaderData, useSubmit, redirect, useParams} from "react-router-dom";
import { getAuthToken } from "../util/auth";
import { jwtDecode } from "jwt-decode";
import { getDemonPicture } from "./MyList";

export default function ViewDemonModal() {

    let params = useParams();
    let listMode = null;
    const token = getAuthToken();
    if (token && (params.username === jwtDecode(token).username)) {
      listMode = "modify"
    }
    else {
      listMode = "view"
    }

    const submit = useSubmit();

    const navigate = useNavigate();

    function onClose() {
        navigate("..")
    }

    function handleRemoveDemon() {
        submit(null, { method: 'delete'});
      }

    const demonData = useLoaderData();
    console.log(demonData);

    return (
        <div className="modalBackdrop">
            <div className="modal">
                <img src={getDemonPicture(demonData.difficulty)}/>
                <div className="infoContainer">
                <h1> {demonData.name} </h1>
                <h4> {demonData.creator} </h4>
                <h3> Status: {demonData.status} {demonData.status !== "Complete" ? `(${demonData.progress}%)` : undefined} </h3>
                <p> Comments: {demonData.comments ? demonData.comments : "N/A"} </p>
                <p> Attempts: Coming soon! </p>
                </div>
                <div className="modalButtonsContainer">
                {listMode !== "view" ?
                (<>
                <button className="modalButton"> <Link className="removeUnderlineWhite" to={`/demonlist/${params.username}/${demonData.levelID}/edit`}> Edit </Link> </button>
                <button className="modalButton" onClick={handleRemoveDemon}> Delete </button> 
                <button className="modalButton" onClick={onClose}> Close </button> </>)
                : <button className="modalButton" onClick={onClose}> Close </button>}
                </div>
            </div>
        </div>
    )
}

export async function loader({request, params}) {
    
    const username = params.username;
    const levelID = params.levelID;
    const response = await fetch('http://gd-demon-tracker-be-production.up.railway.app:3001/demonlist/' + username + '/' + levelID, {
      });
    
      if (!response.ok) {

      }

      else {
          const resData = await response.json();
          console.log(resData.demon);
          return resData.demon;
      }
}

export async function action({params}) {
    const levelID = params.levelID;
    const token = getAuthToken();
    const response = await fetch('http://gd-demon-tracker-be-production.up.railway.app:3001/demonlist/' + levelID, {
        method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
    });

    if (!response.ok) {
        //throw some error: "Could not delete"
    }
    
    const resData = await response.json();
    return redirect(`/demonlist/${resData.username}`);
  
}

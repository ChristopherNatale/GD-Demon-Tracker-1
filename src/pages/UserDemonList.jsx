import { useLoaderData} from "react-router-dom";
import MyList from "../components/MyList";
import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getAuthToken } from "../util/auth";

export default function UserDemonList() {
    const demons = useLoaderData();
    let listMode = null;

    let params = useParams();
    const token = getAuthToken();
    if (token && (params.username === jwtDecode(token).username)) {
      listMode = "modify"
    }
    else {
      listMode = "view"
    }
  
    return (
      <div>
        {listMode === "view" ?
        (demons.length !== 0 ? <MyList demons={demons} mode={listMode}/> : 
        <p className="emptyList"> This Demon List is empty! </p>)
        : (demons.length === 0 ? <> <MyList demons={demons} mode={listMode}/>
         <p className="emptyList"> This Demon List is empty! </p> </> : <MyList demons={demons} mode={listMode}/>
          )}
        <Outlet/>
      </div>
    )
  
}

export async function loader({params}) {

  console.log(params);
  const response = await fetch('https://gd-demon-tracker-be-production.up.railway.app:3001/demonlist/' + params.username, {
  });

  if (!response.ok) {
     throw new Response(JSON.stringify({message: 'Could not fetch the demon list.'}), {
     status: 500,
  });
  }

  else {
      const resData = await response.json();
      return resData.demons;
  }
      
  }
import DemonForm from "../components/DemonForm"
import { useLoaderData, redirect } from "react-router-dom";
import { getAuthToken } from '../util/auth';

export default function EditDemon() {

    const demonData = useLoaderData();
    console.log(demonData); 

    return (
        <div className="searchContainer">  
        <h2 className="formTitle"> Edit Demon </h2>  
            <DemonForm levelID={demonData.levelID} levelName={demonData.name} difficulty={demonData.difficulty} 
            creator={demonData.creator} status={demonData.status} progress={demonData.progress} comments={demonData.comments} method={"patch"} /> 
        </div>
    );
}



import {useState} from "react";
import { Form, redirect, useNavigate, useParams} from "react-router-dom";
import { getAuthToken } from "../util/auth";


export default function DemonForm({levelID, levelName, difficulty, creator, status, progress, comments, method}) {
    

    const navigate = useNavigate();
    const params = useParams();
   
    function handleCancel() {
        navigate(`/demonlist/${params.username}`);
    }

    function onChangeStatus(event) {
        if (event.target.value === "Complete") {
            setIsComplete(!isComplete)
            return;
        }
        setProgressState("0");
        setIsComplete(false);
    }

    function onChangeProgress(event) {
        setProgressState(event.target.value);
        return;
    }

    const [isComplete, setIsComplete] = useState(false);
    const [progressState, setProgressState] = useState(progress);


    return (
        <>
        <Form method={method}> 
        
        <input name="levelID" type="hidden" value={levelID}/>

        <div className="formItem">

        <div className="levelInfo">

        <label htmlFor="levelName"> Level </label>
        <input name="levelName" required value={levelName}/>
        
        <label htmlFor="creator"> Creator </label>
        <input name="creator" required value={creator}/>
        
        <label htmlFor="demonDifficulty"> Difficulty </label>
        <input name="demonDifficulty" required value={difficulty}/>
        </div>

        <div className="userStats"> 

        <label htmlFor="status"> Status </label>
        <select name="status" defaultValue={status ? status : ""} required onChange={onChangeStatus}>
            <option defaultValue> </option>
            <option value="Complete"> Complete </option>
            <option value="In Progress"> In Progress </option>
            <option value="On The Backburner"> On The Backburner </option>
            <option value="Dropped"> Dropped </option>
        </select>

        <label htmlFor="progress"> Progress </label>
        <input name="progress" value={isComplete ? "100" : progressState} onChange={onChangeProgress}/>

        <label htmlFor="comments"> Comments </label>
        <input defaultValue={comments ? comments : null} name="comments"/>
        </div>
        </div>

        <div className="confirmCancelButtons">
        <button type="submit" className="formButtons"> Confirm </button>
        <button className="formButtons" onClick={handleCancel}> Cancel </button>
        </div>

        </Form> 
    </>
    );
}

export async function action({request, params}) {
   
    const data = await request.formData()
    const demonData = {
        levelID: data.get('levelID'),
        name: data.get('levelName'),
        difficulty: data.get('demonDifficulty'),
        creator: data.get('creator'),
        status: data.get('status'),
        progress: data.get('progress'),
        comments: data.get('comments')
    }
    const token = getAuthToken();
    
    if (request.method=== 'POST') {
    const response = await fetch('https://gd-demon-tracker-be-production.up.railway.app/demonlist/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(demonData)
    });
    const resData = await response.json();
    return redirect(`/demonlist/${resData.username}`);
}
    if (request.method === 'PATCH') {
        const response = await fetch('https://gd-demon-tracker-be-production.up.railway.app/demonlist/' + demonData.levelID, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(demonData)
        });
        const resData = await response.json();
        return redirect(`/demonlist/${resData.username}`);
    }

}



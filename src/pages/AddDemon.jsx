import "isomorphic-fetch";
import {useState} from "react";
import DemonForm from "../components/DemonForm"
export default function AddDemon() {

    const [formData, setFormData] = useState({
        levelName: null,
        levelID: null,
        creator: null,
        demonDifficulty: null,
    });

    const [showSuggestions, setShowSuggestions] = useState(false);
    const [search, setSearch] = useState("");
    const [options, setOptions] = useState([]);

    function handleSearch() {
        fetch(`http://localhost:3001/search/${search}`)
        .then((response) => {
            return response.json();
        })
        .then((resData) => {
            console.log(resData);
            setOptions(resData);
            setShowSuggestions(true);
            return;
        })
    }

    function onChangeSearch(event) {
        setSearch(event.target.value);
    }

    function onSelectSearchbar(event) {
        setShowSuggestions(false);
    }
    
    
    function handleAdd(data) {
            setFormData((formData) => {
                return {
                    ...formData,
                    levelName: data.levelName,
                    levelID: data.levelID,
                    creator: data.creator,
                    demonDifficulty: data.demonDifficulty
                }
            });
            setShowSuggestions(false);
        };
        
    
    return (
    <div className="searchContainer">
    <h2 className="formTitle"> Add Demon </h2>
        {formData.levelName ? null :
            <div className="autoComplete">
            <label htmlFor="search">  </label>
            <input id="search" type="search" name="levelName" placeholder="Search" value={search} onChange={onChangeSearch}
            onFocus={onSelectSearchbar}/>
            <button className="searchButton" onClick={handleSearch}> Search </button>
            {showSuggestions && options.map((data) => {
                return (showSuggestions && 
                <div className="suggestions">
                <li onClick={() => handleAdd(data)} className="suggestion"
                key={data.levelID}> {data.levelName} {`(${data.creator})`} </li>
                </div>
                );
            })}
            </div>
        }
        
        {formData.levelName ? <DemonForm levelID={formData.levelID} levelName={formData.levelName} 
        difficulty={formData.demonDifficulty} creator={formData.creator} method={"post"} /> : null}
    </div>
    );
}
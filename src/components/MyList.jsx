import easyDemon from "../assets/demon-easy.png";
import mediumDemon from "../assets/demon-medium.png";
import hardDemon from "../assets/demon-hard.png";
import insaneDemon from "../assets/demon-insane.png";
import extremeDemon from "../assets/demon-extreme.png";
import FilterModal from "./FilterModal.jsx"
import {useState} from "react";
import { NavLink, Link, useParams} from "react-router-dom";


export default function MyList({demons, mode}) {

    let params = useParams();
    let username = params.username;
    let title = `${username}'s Demon List`


    const [filtersState, setFiltersState] = useState({
        modalIsOpen: false,
        filters: {
            sortBy: ""
        }
      })

    
    function handleFilterChange() {
        setFiltersState((filtersState) => {
            return {
              ...filtersState,
            modalIsOpen: true
          }}
          );
        }
    
    function applyFilterChange(filterList) {
        setFiltersState((filtersState) => {
            return {
              ...filtersState,
            modalIsOpen: false,
            filters: {
                sortBy: filterList.sortBy
            }
          }}
          );
    }
    
    function cancelFilterChange() {
        setFiltersState((filtersState) => {
            return {
              ...filtersState,
            modalIsOpen: false
          }}
          );
    }
    
    let content = null;
    
    if (filtersState.modalIsOpen === true) {
        content = <FilterModal currentFilter={filtersState.filters} onConfirm={applyFilterChange} onCancel={cancelFilterChange}> </FilterModal>
    }

    if (filtersState.filters.sortBy === "Name") {
        demons = demons.sort((demon1, demon2) => {
            let name1 = demon1.name.toLowerCase();
            let name2 = demon2.name.toLowerCase();
            return name1 > name2 ? 1: -1
        });
    }

    if (filtersState.filters.sortBy === "Difficulty") {
        demons = demons.sort((demon1, demon2) => {
            let difficulty1 = demon1.difficulty;
            let difficulty2 = demon2.difficulty;
            if (difficulty1 === difficulty2) {
                return 0;
            }
            else {
                if (difficulty1 === "Easy Demon") {
                    return -1
                }
                if (difficulty1 === "Medium Demon") {
                    if (difficulty2 === "Easy Demon") {
                        return 1
                    }
                    else return -1
                }
                if (difficulty1 === "Hard Demon") {
                    if (difficulty2 === "Easy Demon" || difficulty2 === "Medium Demon") {
                        return 1
                    }
                    else return -1
                }
                if (difficulty1 === "Insane Demon") {
                    if (difficulty2 === "Easy Demon" || difficulty2 === "Medium Demon" || difficulty2 === "Hard Demon") {
                        return 1
                    }
                    else return -1
                }
                if (difficulty1 === "Extreme Demon") {
                    return 1
                }
            }
            });
    }
    
    if (filtersState.filters.sortBy === "Progress") {
        demons = demons.sort((demon1, demon2) => {
            let progress1 = demon1.progress;
            let progress2 = demon2.progress;
            if (progress1 === progress2) {
                return 0;
            }
            else return progress1 > progress2 ? 1: -1
        });
    }

    return (
        <>
        {content}
        <h1 className="listTitle"> {title} </h1>

        <div className="demonList"> 
            <div className="listHeader"> 
                <button className="filterDemonButton" onClick={handleFilterChange}> Filters </button>
                {mode !== "view" ?
                <NavLink to="add">
                <button className="addDemonButton"> Add Demon </button>
                </NavLink> 
                : null}
            </div>
            <ul> 
                {demons.map((demons) => {
                    const img = getDemonPicture(demons.difficulty)
                    const progressClass = getProgressClass(demons.status)
                return (
                    <>
                    <Link className="removeUnderlineWhite" to={`/demonlist/${username}/${demons.levelID}`}>
                    <li className="demonEntry" key={demons.levelID}>
                        <img src={img} />
                        <div className="entryData">
                        <h2 className="entryName"> {demons.name} </h2> 
                        <h5 className="entryCreator"> {demons.creator} </h5> 
                        <h4 className="entryComments"> {demons.comments ? `"` + (demons.comments) + `"`: undefined} </h4>
                        </div>
                    </li> 
                    <div className="entryUserStats"> 
                        <h3 className={progressClass}> {demons.status} {demons.status !== "Complete" ? `(${demons.progress}%)` : undefined} </h3>
                    </div>
                    </Link>
                    </>
                );
                })}
            </ul>
        </div>
        
        </>
    );

    
}

export function getDemonPicture(difficulty) {
    if (difficulty === "Easy Demon") {
        return easyDemon;
    }
    if (difficulty === "Medium Demon") {
        return mediumDemon;
    }
    if (difficulty === "Hard Demon") {
        return hardDemon;
    }
    if (difficulty === "Insane Demon") {
        return insaneDemon;
    }
    return extremeDemon;
}

export function getProgressClass(status) {
    if (status === "Complete") {
        return "complete"
    }
    if (status === "In Progress") {
        return "inprogress"
    }
    if (status === "On The Backburner") {
        return "backburner"
    }
    if (status === "Dropped") {
        return "dropped"
    }
}





import {createPortal} from "react-dom"
import { useState, useRef } from "react";

export default function FilterModal({currentFilter: {sortBy}, onConfirm, onCancel}) {

    const [filters, setFilters] = useState( {
        sortBy: sortBy
    }
    );

    function onChangeSort(event) {
        setFilters((filters) => {
                return {
                    ...filters,
                    sortBy: event.target.value
                  }
            })
        }
    
    return createPortal(
    <div className="modalBackdrop">
        <div className="filterModal">
            <label htmlFor="SortBy"> Sort By </label>
            <select defaultValue={sortBy ? sortBy : undefined} name="SortBy" onChange={onChangeSort}>
                <option defaultValue/>
                <option value="Name"> Name </option>
                <option value="Difficulty"> Difficulty </option>
                <option value="Progress"> Progress </option>
            </select>
            <div className="filterModalButtons"> 
            <button onClick={() => onConfirm(filters)}> Confirm </button>
            <button onClick={onCancel}> Cancel </button>
            </div>
        </div>
    </div>,
    document.getElementById('filter-modal'));
}
import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiMovieSearch } from '@mdi/js';

const Search = ({ search, searchValue, setSearchValue }) => {

    const handleSearchInputChanges = e => {
        setSearchValue(e.target.value);
    };

    const resetInputField = () => {
        setSearchValue("");
    };

    const callSearchFunction = e => {
        e.preventDefault();
        search(searchValue);
        resetInputField();
    };

    return (
        <div className="search">
            <input
                value={searchValue}
                onChange={handleSearchInputChanges}
                type="text"
            />

            <button className="search-button" onClick={callSearchFunction}>
                <Icon size={1} path={mdiMovieSearch}/>
            </button>
        </div>
    );
};

export default Search;

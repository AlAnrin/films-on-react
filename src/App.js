import './App.css';
import logo from './logo.svg';
import React, {useReducer, useEffect, useState} from "react";
import axios from "axios";
import Icon from '@mdi/react';
import { mdiLoading, mdiChevronRight, mdiChevronLeft } from '@mdi/js';
import Movie from "./Components/Movie";
import Search from "./Components/Search";
import { initialState, reducer } from "./reducer";

const BASE_API_URL = 'https://www.omdbapi.com/';
const API_KEY = '47d93115';

const App = () => {
    const title = 'React App';
    const [state, dispatch] = useReducer(reducer, initialState);
    const { movies, errorMessage, loading, totalResults, currentPage } = state;
    const [searchValue, setSearchValue] = useState("Dark knight");

    // useEffect(() => {
    //     axios.get(`${BASE_API_URL}?s=Dark+Knight&apikey=${API_KEY}`).then(jsonResponse => {
    //         jsonResponse.data.currentPage = 1;
    //         dispatch({
    //             type: "SEARCH_MOVIES_SUCCESS",
    //             payload: jsonResponse.data
    //         });
    //     });
    // }, []);

    useEffect(() => {
        search(searchValue, currentPage);
    }, [currentPage]) // TODO: here problem with load 2 str - after load page -> 1

    const search = (searchValue, page) => {
        dispatch({
            type: "SEARCH_MOVIES_REQUEST"
        });

        axios(`${BASE_API_URL}?s=${searchValue}&page=${page}&apikey=${API_KEY}`).then(
            jsonResponse => {
                if (jsonResponse.data.Response === "True") {
                    // jsonResponse.data.currentPage = 1;
                    dispatch({
                        type: "SEARCH_MOVIES_SUCCESS",
                        payload: jsonResponse.data
                    });
                } else {
                    dispatch({
                        type: "SEARCH_MOVIES_FAILURE",
                        error: jsonResponse.data.Error
                    });
                }
            }
        );
    };

    const changePage = (dir) => {
        if (dir) {
            if (currentPage < totalPages()) {
                dispatch({
                    type: "CHANGE_PAGE",
                    payload: currentPage + 1
                })
            }
        }
        else {
            if (currentPage > 0) {
                dispatch({
                    type: "CHANGE_PAGE",
                    payload: currentPage - 1
                })
            }
        }
    }

    const totalPages = () => {
        return Math.round(totalResults / 10 + 1)
    }

    const retrievedMovies =
        loading && !errorMessage ? (
            <div className="load">
                <Icon path={mdiLoading} size={6} spin={true}/>
            </div>
        ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
        ) : (
            movies.map((movie, index) => (
                <Movie key={`${index}-${movie.Title}`} movie={movie} />
            ))
        );

    return (
        <div className="App">
            <div className="m-container">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h3>{title}</h3>
                </header>

                <Search search={search} searchValue={searchValue} setSearchValue={setSearchValue}/>

                <div className="movies">{retrievedMovies}</div>

                <div className="pages">
                    <button className="search-button" onClick={() => changePage(false)}>
                        <Icon className="icon" size={1} path={mdiChevronLeft}/>
                    </button>
                    <p>{currentPage} / {totalPages()}</p>
                    <button className="search-button" onClick={() => changePage(true)}>
                        <Icon className="icon" size={1} path={mdiChevronRight}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default App;

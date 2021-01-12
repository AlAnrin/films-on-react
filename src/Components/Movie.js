import React from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
    "https://media.comicbook.com/files/img/default-movie.png";

const Movie = ({ movie }) => {
    const poster =
        movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
    return (
        <div className="movie">
            <div className="movie-title">{movie.Title}</div>
            <p>{movie.Type}</p>
            <div>
                <img
                    width="200"
                    alt={`The movie titled: ${movie.Title}`}
                    src={poster}
                />
            </div>
            <p>({movie.Year})</p>
        </div>
    );
};

export default Movie;

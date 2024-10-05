import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Watchlists() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Retrieve favorite movies from localStorage when the component mounts
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(Object.values(JSON.parse(storedFavorites))); // Convert object to array
        }
    }, []);

    return (
        <div className='container'>
            <h2>My Watchlist</h2>
            <div className='row g-3'>
                {favorites.length > 0 ? (
                    favorites.map((movie) => (
                        <div key={movie.id} className='col-6 col-sm-4 col-md-3 col-lg-2'>
                            <Link className='nav-link' to={`/movie/${movie.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title || movie.name}
                                    className='w-100 rounded' />
                                <h1
                                    className='text-truncate h4 text-center mt-1'
                                    data-toggle="tooltip"
                                    data-placement="start"
                                    title={movie.title ? movie.title : movie.name}
                                >
                                    {movie.title ? movie.title : movie.name}
                                </h1>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No movies in your watchlist yet.</p>
                )}
            </div>
        </div>
    );
}



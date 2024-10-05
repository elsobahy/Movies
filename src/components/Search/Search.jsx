// SearchPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./search.css"
const Search = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const apiKey = 'c9fac173689f5f01ba1b0420f66d7093';

    useEffect(() => {
        const fetchMovies = async () => {
            if (searchTerm) {
                try {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
                    );
                    setMovies(response.data.results);
                } catch (error) {
                    console.error('Error fetching movies:', error);
                }
            }
        };
        fetchMovies();
    }, [searchTerm, apiKey]);
   
    return (
        <div>
            
            <input
                type='text'
                placeholder="Search for a movie..."
               
                className='form-control w-75 m-auto  input-placeholder mt-4'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='container my-5'>
                <div className='row'>
                {movies.map((movie) => (
                    <div className='col-md-2 col-6 mb-2'>
                    <Link key={movie.id} to={`/movie/${movie.id}`} className=' nav-link'>
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                         alt={movie.title || movie.name}
                         className='w-100 rounded' />
                         <h1
                                className='text-truncate h4 text-center mt-2'
                                style={{ cursor: "pointer" }}
                                data-toggle="tooltip"
                                data-placement="start"
                                title={movie.title ? movie.title : movie.name}
                            >
                                {movie.title ? movie.title : movie.name}
                            </h1>
                        
                    </Link>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default Search;

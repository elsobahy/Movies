import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';
import { Link } from 'react-router-dom';


const Home = () => {
    const [movies, setMovies] = useState([]);
 
    // Fetch movies
    const getMovies = async (type, callback) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=c9fac173689f5f01ba1b0420f66d7093`);
            callback(res.data.results);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getMovies("movie", setMovies);
    }, []);

   

    return (
        <div className='container'>
            {/* Trending Movies Section */}
            <div className='row g-3 my-3'>
                <div className='col-md-4 d-flex align-items-center text-start'>
                    <div>
                        <div className='brdr bg-info w-25'></div>
                        <h3 className='mt-2'>Trending<br />Movies<br />To Watch Right Now</h3>
                        <p className='description-title'>Top Trending Movie By Day</p>
                        <div className='brdr bg-info'></div>
                    </div>
                </div>

                {/* Display Movies Responsively */}
                {movies.slice(0, 10).map((movie) => (
                    <div key={movie.id} className='col-6 col-sm-4 col-md-3 col-lg-2'>
                      
                        <Link className='nav-link' to={`/movie/${movie.id}`}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title || movie.name}
                                className='w-100 rounded' />
                            <h1
                                className='text-truncate h4 text-center mt-1'
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
    );
};

export default Home;

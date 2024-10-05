import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./movies.css"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
export default function Movies() {
    const [favorites, setFavorites] = useState(() => {
        // Retrieve favorite movies from localStorage when component mounts
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : {};
    });

    const[movies,setMovies]=useState([])
    const  api_key="c9fac173689f5f01ba1b0420f66d7093"
    const  total_pages=20
    useEffect(() => {
           const getAllMovies=async()=>{
           const allMovies=[]
           for(let page=1;page<total_pages;page++){
                await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&page=${page}`)
                .then((res)=>{
                    console.log(res.data.results)
                  allMovies.push(...res.data.results)
                })
                .catch((err)=>{
                   console.log(err)
                })
           }
           setMovies(allMovies)
          
           
           }
           getAllMovies()
        },[]);  
         // Toggle favorite movie
    const toggleFavorite = (movie) => {
        const newFavorites = { ...favorites };
        if (newFavorites[movie.id]) {
            delete newFavorites[movie.id]; // If already in favorites, remove it
        } else {
            newFavorites[movie.id] = movie; // Add to favorites
        }
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites)); // Store in localStorage
        console.log(favorites)
    };
    
  return (
    <>
   <div className='container my-3'>
    <div className='row'>
        {movies.map((movie) => (
            <div key={movie.id} className='col-6 col-sm-4 col-md-3 col-lg-2'>
                {/* Card Wrapper */}
                <div className="movie-card position-relative">
                    {/* Heart Button */}
                    <button
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                        }}
                        onClick={() => toggleFavorite(movie)}
                    >
                        <FontAwesomeIcon
                            icon={faHeart}
                            color={favorites[movie.id] ? 'red' : 'white'}
                            size="2x"
                        />
                    </button>
                    {/* Movie Link */}
                    <Link className='nav-link' to={`/movie/${movie.id}`}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title || movie.name}
                            className='w-100'
                        />
                        <h1
                            className='text-truncate h4 text-center mt-2'
                            style={{ cursor: "pointer" }}
                            title={movie.title ? movie.title : movie.name}
                        >
                            {movie.title ? movie.title : movie.name}
                        </h1>
                        <p className='mt-1 movie-overview'>
                            {movie.overview}
                        </p>
                    </Link>
                </div>
            </div>
        ))}
    </div>
</div>

    
    </>
  )
}

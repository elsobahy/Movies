import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'; 
import "../Movies/movies.css"

export default function HeroDetail() {
    const [movies, setMovies] = useState([]);
    const [heroName, setHeroName] = useState('');
    const { heroId } = useParams(); 

    useEffect(() => {
        const getHeroData = async () => {
          
               await axios.get(
                        `https://api.themoviedb.org/3/person/${heroId}/movie_credits?api_key=c9fac173689f5f01ba1b0420f66d7093`
                    ).then((res)=>{
                        setMovies(res.data.cast)
                    }).catch((err)=>{
                       console.log(err)
                    })
                    // Fetch hero details to get the name
                   await axios.get(
                        `https://api.themoviedb.org/3/person/${heroId}?api_key=c9fac173689f5f01ba1b0420f66d7093`
                    ).then((res)=>{
                      setHeroName(res.data.name)
                    }).catch((error)=> {
                    console.error('Error fetching hero data:', error);
                })
            }
        
        getHeroData(); 
    }, [heroId]);

    return (
        <div className='container'>

        <div className='row'>
        <h2 className='mb-4'>Movies Related to <span className='text-info'>{heroName}</span></h2> 

        {movies.map((movie) => (
            <div key={movie.id} className='col-6 col-sm-4 col-md-3 col-lg-2 '>
               <Link className='nav-link movie-card ' to={`/movie/${movie.id}`}>
               <img src={movie.poster_path?
               `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                :"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"}
                     alt={movie.title || movie.name}
                     className='w-100' />
                <h1
                    className='text-truncate h4 text-center mt-2 '
                    style={{ cursor: "pointer" }}
                    data-toggle="tooltip"
                    data-placement="start"
                    title={movie.title ? movie.title : movie.name}
                >
                    {movie.title ? movie.title : movie.name}
                </h1>
                <p className='mt-1 movie-overview'>
                    {movie.overview?movie.overview:"movie.overview"}
                </p>
               </Link>

                
            </div>
        ))}
        </div>
        </div>
    );
}

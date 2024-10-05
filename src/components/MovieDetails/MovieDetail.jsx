import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function MovieDetail() {
  const { id } = useParams(); 
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true); // Start loading
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=c9fac173689f5f01ba1b0420f66d7093`
        );
       
        setMovie(response.data);
      } catch (error) {
        setError('Failed to fetch movie details.');
        console.error(error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    getMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>; 
  }

  
  if (!movie) {
    return <div>No movie found.</div>;
  }

  return (
    <div className='container p-5 '>
      <div className='row'>
        <div className='col-lg-4'>
          <img
            src={movie.poster_path?
              `https://image.tmdb.org/t/p/w500${movie.poster_path}`
               :"https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"}
            alt={movie.title || movie.name}
            className="movie-poster  rounded w-100"
          />
        </div>
        <div className='col-lg-7 mt-2 text-start'>
          <h1>{movie.title || movie.name}</h1>
          <p>{movie.overview}</p>
          <p>{movie.tagline}</p>
          <p><span className=' fw-bold'>Release Date:</span> {movie.release_date}</p>
          <p>Genres: {movie.genres.map(genre => genre.name).join(', ')}</p>
          <p>Runtime: {movie.runtime} minutes</p>
          <p>Country: {movie.production_countries.map(country => country.name).join(', ')}</p>
          <p>Budget: ${movie.budget.toLocaleString()}</p>
          <p>Rating: {movie.vote_average}/10</p>
          <p>Popularity: {movie.popularity}</p>
          <Link to={`https://www.imdb.com/title/${movie.imdb_id}`}
                target="_blank"
                className='btn btn-info fw-bold'>View on IMDb</Link>
                
        </div>
      </div>
       
      

    </div>
  );
}

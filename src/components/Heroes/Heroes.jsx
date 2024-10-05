import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Heroes = () => {
  const [heroes, setHeroes] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error

  useEffect(() => {
    const getHeroes = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/trending/person/day?api_key=c9fac173689f5f01ba1b0420f66d7093'
        );
        setHeroes(response.data.results);
      } catch (err) {
        setError('Error fetching heroes'); // Set error state
        console.error('Error fetching heroes:', err);
      } finally {
        setLoading(false); // Set loading to false
      }
    };
    getHeroes();
  }, []);

  if (loading) return <div>Loading...</div>; // Display loading message
  if (error) return <div>{error}</div>; // Display error message

  return (
    <>
      <div className="container my-4">
        <h4>The Best Heroes Who Participated In The Movies</h4>
        <div style={{ height: '1px' }} className="w-50 m-auto bg-warning"></div>
        <div className="row my-5">
          {heroes.map((hero) => (
            <div key={hero.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <Link className="nav-link card mb-4" to={`/hero/${hero.id}`}>
                <img
                  src={
                    hero.profile_path
                      ? `https://image.tmdb.org/t/p/w500${hero.profile_path}`
                      : 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'
                  }
                  alt={hero.name}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <h1
                  className="text-truncate h5 text-center text-black mt-1"
                  style={{ cursor: 'pointer' }}
                  data-toggle="tooltip"
                  data-placement="start"
                  title={hero.title ? hero.title : hero.name}
                >
                  {hero.title ? hero.title : hero.name}
                </h1>
                <p className="text-center">
                  <button className="btn btn-warning" onClick={() => {}}>
                  See All Movies
                  </button>
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Heroes;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';  // Correct import for FontAwesomeIcon
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import "./navbar.css"
export default function Navbar({ userData, logOut }) {
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-transparent">
        <div className="container">
          <Link className="navbar-brand" to="home">Noxe</Link>
          <button className="navbar-toggler bg-body" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon " style={{ fontSize: '1rem' }}></span> {/* Smaller icon size */}
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {userData &&     
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="home">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="movie">
                    Movies
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="search">
                    Search
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="hero">Heroes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="watchlists">
                  Watchlists  <FontAwesomeIcon icon={faHeart} size="lg" color='red' />
                  </Link>
                </li>
              </ul>
            }

            <ul className='navbar-nav ms-auto mb-2 mt-3 mb-lg-0 ms-0'>
              {userData && 
              <> 
                <li className='nav-item me-3 mb-2'> <FontAwesomeIcon icon={faFacebook} size="2x" />  </li>
                <li className='nav-item me-3 mb-2'> <FontAwesomeIcon icon={faTwitter} size="2x" />   </li>
                <li className='nav-item me-3 mb-2'> <FontAwesomeIcon icon={faInstagram} size="2x"/> </li>
              </>}
              {userData == null && <>
                <li className="nav-item">
                  <Link className="nav-link" to="login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="register">Register</Link>
                </li>
              </>}
              {userData && <span style={{ cursor: "pointer" }} onClick={logOut}>Logout</span>} 
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

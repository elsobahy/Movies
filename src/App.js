import { Navigate, Route, Routes} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import { jwtDecode } from 'jwt-decode';

import { useEffect, useState } from 'react';
import MovieDetail from './components/MovieDetails/MovieDetail';
import Search from './components/Search/Search';
import Movies from './components/Movies/Movies';
import Heroes from './components/Heroes/Heroes';
import HeroDetail from './components/HeroDetails/HeroDetail';
import Watchlists from './components/Watchlists/Watchlists';


function App() {
  
  let navigate=useNavigate()
  let[userData,setUserData]=useState(null)

  function saveUserData(){
    if(localStorage.getItem("my-token")){
      let decodeToken=localStorage.getItem("my-token")
      console.log("decode",decodeToken)
      let encodeToken=jwtDecode(decodeToken)
      console.log("encode",encodeToken)
      setUserData(encodeToken)
    }}
    
  useEffect(()=>{
   saveUserData()
   },[]) 

  function logOut(){
    localStorage.removeItem("my-token")
    setUserData(null)
    navigate("/login")
  } 
//to protectRoutes 
function ProtectRoutes(props){
  if(localStorage.getItem("my-token")){
    return props.children
  }else{
    return <Navigate to="/login" />
  }
}  
  return (
   
     <div className="App">
      <Navbar userData={userData} logOut={logOut}/>
      <Routes>
        <Route path='/' element={
          <ProtectRoutes>
            <Home/>
          </ProtectRoutes>
          }/>
        <Route path='/home' element={<ProtectRoutes>
            <Home/>
          </ProtectRoutes>}/>
          <Route path='/movie' element={<ProtectRoutes>
            <Movies/>
          </ProtectRoutes>}/>
        <Route path='/movie/:id' element={
           <ProtectRoutes>
           <MovieDetail/>
         </ProtectRoutes>
          } />
        <Route path='/search' element={
          <ProtectRoutes>
          <Search/>
        </ProtectRoutes>
          } />
            <Route path='/hero' element={
            <ProtectRoutes>
            <Heroes/>
            </ProtectRoutes>
              } />
               <Route path='/hero/:heroId' element={
            <ProtectRoutes>
            <HeroDetail/>
            </ProtectRoutes>
              } />
            <Route path='/watchlists' element={
            <ProtectRoutes>
            <Watchlists />
            </ProtectRoutes>
              } />
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login saveUserData={saveUserData}/>}/>
        <Route path='*' element={<h1 className='text-danger text-center'>Not Found</h1>} />
      </Routes>
      
     </div>
    
   
   
  );
}

export default App;

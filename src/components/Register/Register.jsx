import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Joi from 'joi'
import axios from 'axios';
import './register.css';

export default function Register() {
     const navigate=useNavigate()
     const[errors,setErrors]=useState("")
     const[validErrors,setValidErrors]=useState([])
     const [formData, setFormData] = useState({
        firstName: "",          
        lastName: "",            
        email: "",  
        hash: ""       
    
    });
    

    function getData(e) {
        let newData = { ...formData };
        newData[e.target.name] = e.target.value;
        setFormData(newData);
        
    }

    function handleRegister(e) {
        e.preventDefault();
        let checkErrors=handleValidation()
        if(checkErrors?.error){
          console.log("erorrrrrrrrrrrrrrr",checkErrors)
          setValidErrors(checkErrors.error.details)
        }else{
          console.log("not error")
          axios.post('http://server-srta.alisoliman.net/user', formData)
          .then((res) => {
              console.log('Data', res);
              setValidErrors([])
              navigate('/login')

          })
          .catch((err) => {
              console.log('Error fetching data:', err);
              setErrors(err.response.data.message )
              setValidErrors([])
          });
        }
        
       
    }
   function handleValidation(){
    let schema=Joi.object({
      firstName: Joi.string().alphanum().min(3).max(30),
      lastName: Joi.string().alphanum().min(3).max(30),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      hash: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
    })
    
   return schema.validate(formData,{abortEarly:false})
  }
    return (
        <>
            <div className='container w-75 text-start mx-auto mt-5'>
                <h3 className='text-center'>Register Now</h3>
                {errors.length?<h6 className='alert alert-danger'>{errors}</h6>:""}
                {validErrors.length > 0 && validErrors.map((error, index) => (
                    <h6 key={index} className='alert alert-danger'>{error.message}</h6>
                ))}
                <form onSubmit={handleRegister}>
                    <label htmlFor='fname' className='form-label'>First Name :</label>
                    <input
                        type='text'
                        className='form-control mb-3'
                        id='fname'
                        name="firstName"
                        onChange={getData} />
                    
                    <label htmlFor='lname' className='form-label'>Last Name :</label>
                    <input
                        type='text'
                        className='form-control mb-3'
                        id='lname'
                        name="lastName"
                        onChange={getData} />
                    
                    <label htmlFor='email' className='form-label'>Email :</label>
                    <input
                        type='email'
                        className='form-control mb-3'
                        id='email'
                        name="email"
                        value={formData.email} // Use controlled input
                        onChange={getData} />
                    
                    <label htmlFor='password' className='form-label'>Password :</label>
                    <input
                        type='password'
                        className='form-control mb-3'
                        id='password'
                        name="hash"
                        value={formData.password} // Use controlled input
                        onChange={getData} />
                    
                    <button type='submit' className='btn btn-info'>Register</button>
                </form>
            </div>
        </>
    );
}


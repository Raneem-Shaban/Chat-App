import React, { useState ,useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { TokenContext } from './TokenContext';
import { SenderContext } from './SenderId';
import "../CssFiles/Sign.css"
const Signpass = () => {
  const [username, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useContext(TokenContext);
  const { setSender } = useContext(SenderContext);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await fetch('http://localhost:1337/api/login',
    {method : 'POST',
    headers:{
        'X-Parse-Application-Id': 'appId',
        'X-Parse-REST-API-Key': 'restAPIKey',
    },
    // localStorage.setItem('token', token)
    body: JSON.stringify({ username, password})}).then(res=>res.json())
    .then(
        // const token = response.data.token;
        data => {
          console.log(data)
          
            // console.log(data)
        if(data){
          setToken(data.sessionToken); 
          setSender(data.objectId); 
          // console.log(data.sessionToken)
          if(data.objectId){
          navigate('Homepage')
          }
          // else{
          //   alert('Incorrect password! Please try again.');
          // }
        }
       
    })
}

  // const handleClick = () => {
  //   navigate('./signin.js');
  // };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Handle form submission here
  //   console.log('Phone number:', phoneNumber);
  // };
  return (
    <div className="  min-h-screen flex items-center justify-around md:flex-row flex-col-reverse backgroundsign bg-neutral-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md md:w-1/2 xl:w-1/2 mb-10">
        <div className=' w-full'>
          <h2 className="text-3xl  font-bold text-center mb-4">
            Hi, Welcome Back!
          </h2>
        </div>
        <p className="text-center text-gray-600 mb-6">
          Hope you're doing fine.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            {/* <label htmlFor="phone-number" className="block text-gray-700 text-sm font-bold mb-2">
              Phone Number
            </label> */}
            <input
              type="tel"
              id="phone-number"
              className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-teal-500"
              value={username}
              onChange={handlePhoneNumberChange}
              placeholder='Username'
            /><input
              type="password"
              id="password"
              className="shadow  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-teal-500"
              value={password}
              onChange={handlePasswordChange}
              placeholder='Password'
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold w-full py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign in
            </button>
          </div>
          <div className=' flex justify-end mx-10'>
           <button> <p onClick={()=> navigate('/Data')} className=' text-teal-500 hover:text-teal-700'>sign up</p> </button>
          </div>
        </form>
      </div>
      <div className="flex justify-center mb-8 ">
        <img src={'/hero.png'} className=' wi-75 heig marginTB'></img>
      </div>
    </div>
  );
};

export default Signpass;
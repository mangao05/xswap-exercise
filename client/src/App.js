import './App.css';
import { useState } from 'react';
import Axios from 'axios';


function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState([]);

  const [regUsername, setRegUsername] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const [regStatus, setRegStatus] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/api/login", {
      "email": username,
      "password": password
    }).then(resp => {
      console.log(resp);
      setUserDetails(resp.data[0]);
      setLoginStatus(resp.data.message);
    }).catch(err => console.log(err));
  };
  
  const register = () => {
    Axios.post("http://localhost:3001/api/register", {
      "email": regUsername,
      "password" : regPassword
    }).then(resp => {
      if(resp.data == 'Created'){
        setRegStatus("Successfully Registered");
      }
    });
  };

  return (
    <div className="App">  
      <div className='form'>
        <h1 className='font-bold'>Login</h1>
         
        <p>Logged In as : { userDetails ? userDetails.email : loginStatus }</p>
        
        <label>Username:</label>
        <input 
          type="text" 
          className='form-input rounded' 
          onChange={(event) => { 
            setUsername(event.target.value) 
          }}
        />
        <label>Password:</label>
        <input 
          type="password" 
          className='form-input' 
          onChange={(event) => {
            setPassword(event.target.value) 
          }}
        />
        <button 
          className="nline-block mt-5 px-6 py-2 border-2 border-green-600 text-green-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" 
          onClick={ login }
        >Login</button>
      <br />

      ------------------------------------------------------------------------------
      <br />
      <br />


      <h1 className='font-bold'>Register</h1>
        <h1 className='text-green-900 text-lg'>{ regStatus }</h1>
        <label>Username:</label>
        <input 
          type="text" 
          className='form-input rounded' 
          onChange={(event) => { 
            setRegUsername(event.target.value) 
          }}
        />
        <label>Password:</label>
        <input 
          type="password" 
          className='form-input' 
          onChange={(event) => {
            setRegPassword(event.target.value) 
          }}
        />
        <button 
          className="nline-block mt-5 px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" 
          onClick={ register }
        >Register</button>
      </div>
      

      
    </div>
  );
}

export default App;


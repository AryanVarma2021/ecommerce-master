import { useEffect, useState } from "react";
import {} from "react-router-dom";
import axios from "axios";

import {useNavigate} from "react-router-dom"


function SignUP() {

    
    const [email, setEmail] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  
  async function  handleSubmit(e) {
    if(email == '' || username == '' || password == ''){
      alert("Please enter all required fields");

    }
    else {

    

    const user = await axios.post('http://localhost:8081/adduser', {
      username : username,
      email : email,
      password : password
    })

    const response = await user;
    if(response.status !== 200){
      alert("User already exists");
      setEmail('');
      setUserName('');
      setPassword('');
    }
    else {
      navigate("/");
    }
  }



    

    
    
    

  }
  return (
    <>
      <div className=" hero bg-gradient-to-r from-indigo-500    w-screen h-screen    ">
        <div className="z-10 bg-white shadow-lg rounded-md flex items-center justify-evenly flex-col  w-[400px] h-[400px]   ">
          <h1 className="text-lg font-semibold">Sign Up</h1>
          <div className="flex gap-8 justify-evenly">
            
            <input
            value={email}
            placeholder="email"
              onChange={(e)=>{
                setEmail(e.target.value);

              }}
              className="w-[300px] rounded border bg-[#ebecf0] p-3 px-5 "
              id="email"
              type="email"
            />
          </div>
          <div className="flex gap-8 justify-evenly">
            
            <input
            value={username}
            placeholder="username"
              onChange={(e)=>{
                setUserName(e.target.value);

              }}
              className="w-[300px] rounded border bg-[#ebecf0] p-3 px-5 "
              id="username"
              type="text"
            />
          </div>
          <div className="flex gap-8 justify-evenly">
            
            <input
            value={password}
            placeholder="password"
              onChange={(e)=>{
                setPassword(e.target.value);
              }}
              className="w-[300px] rounded border bg-[#ebecf0] p-3 px-5 "
              type="text"
            />
          </div>
          <button className=" w-[300px] p-3 text-white bg-blue-700 content-center hover:bg-blue-400 hover:text-white  text-center border   rounded border-gray-400" onClick={handleSubmit}>Submit</button>
        </div>

        
      </div>
      
    </>
  );
}

export default SignUP;

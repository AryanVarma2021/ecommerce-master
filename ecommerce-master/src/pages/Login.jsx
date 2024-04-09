import { useState } from "react";
import {} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie"
import {useNavigate} from "react-router-dom"
function Login() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  
  async function  handleSubmit(e) {
    if(username == '' || password == '') {
      alert('please enter all the fields');
    }
    else {
      const adduser = await axios.post('http://localhost:8081/getuser', {
        username : username,
        password : password,
      });

      const response = await adduser;
      console.log(response);

      if(response.status === 200){
        localStorage.setItem('user', username)
        navigate("/home")
      }
      else {
        console.log(false);
      }





      

    }
    
    
    

    
    
    
    


  }
  return (
    <>
      <div className=" hero bg-gradient-to-r from-indigo-500    w-screen h-screen    ">
        <div className="z-10 bg-white shadow-lg rounded-md flex items-center justify-evenly flex-col  w-[400px] h-[400px]   ">
          <h1 className="text-lg font-semibold">Login</h1>
          <div className="flex gap-8 justify-evenly">
            
            <input
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
            placeholder="password"
              onChange={(e)=>{
                setPassword(e.target.value);
              }}
              className="w-[300px] rounded border bg-[#ebecf0] p-3 px-5 "
              type="text"
            />
          </div>
          <button className=" w-[300px] p-3 text-white bg-blue-700 content-center hover:bg-blue-400 hover:text-white  text-center border   rounded border-gray-400" onClick={handleSubmit}>Submit</button>
          <button onClick={()=>(navigate("/signup"))} className="text-blue-500 font-semibold">create account</button>
        </div>

        

        
      </div>
      
    </>
  );
}

export default Login;

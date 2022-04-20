import React, {useState} from 'react'
import {Link} from 'react-router-dom'


export default function Login({handleLogin}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    function handleSubmit(e){
        e.preventDefault()
        const user = {
          username,
          password
      }
      console.log("user", user)
        fetch(`/login`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(user)
        })
          .then((r) => {
            if (r.ok) {
              r.json().then((user) => handleLogin(user));
             
            }
          });
        }
            
  return (
     <> 
        <h1>Nerd Out Book List</h1>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
        <label>
          Username
   
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
         Password
    
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
       
        <input type="submit" value="Login!" />
      </form>

     <h3> Need to sign up? </h3>
     <Link to= './signup' > Click to sign up</Link>
        </>
  )
}

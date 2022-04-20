
import './App.css';
import { useHistory } from "react-router-dom";
import {useEffect, useState} from 'react'
import { Route, Switch } from "react-router-dom";
import Auth from './Components/Auth'
import Login from './Components/Login'
import Home from './Components/Home'
import FavoriteList from './Components/FavoriteList';
// import Booklist from './Components/Booklist';

function App() {
  const [user, setUser] =useState(null);
  const history = useHistory()
  const [favesArray, setFavesArray] = useState([])
  // const [favesList, setFavesList] = useState([])
  useEffect(() => {
    fetch("/me").then((response) => {
      if (response.ok) {
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  function handleLogin(user) {
    
    setUser(user);
    history.push("/")
    
  }

  function handleLogOutClick(e) {
    console.log("click", e)
    
    fetch("/logout", {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        setUser(null);
        history.push("/login");
      }
    });
  }

    const [titles, setTitles] = useState([])
 

    
    useEffect(()=>{
        fetch('/books')
        .then(r=>r.json())
        .then(data=>{
          
          const titlesArray = data.entries
          console.log(data?.entries)
          setTitles(data.entries)
         
        })
      
      }, [])
      if (!user) return(
        <Switch>
          <Route exact path= '/login'>
        <Login error={'please login'} handleLogin={handleLogin} />;
        </Route>
    
   
       <Route exact path="/signup"> <Auth/> </Route>
       </Switch>
        )
  //     }
    
  //     console.log(user)
     
  return (
    <>
  
   <Switch>  
  
          
    {/* <Route  path="/login">
          <Login setUser={setUSer} />
    </Route>  */}
    <Route exact path="/"> <Home setFavesArray={setFavesArray} favesArray={favesArray} titles={titles} user={user}  handleLogOutClick={handleLogOutClick} /></Route>
    <Route path='/mylist'> <FavoriteList  /> </Route>
   
    </Switch>
   
   </>
  );
}

export default App;

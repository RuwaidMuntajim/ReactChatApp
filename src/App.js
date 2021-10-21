import React, { useEffect, useState } from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import './App.css';
import Authentication from './Components/Auth/Authentication';
import Home from './Components/Chats/Home';
import {db, auth} from './Firebase/firebase';
import {useHistory, useParams} from 'react-router-dom';
function App() {
  const history = useHistory();
  const [user, setUser] = useState(null);

  useEffect(() => {

    auth.onAuthStateChanged(user => {
      setUser(user);
      console.log(user);

      if (user) {
        console.log("user is noot null anymore")
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
          {user ? <Home db={db} auth={auth} user={user}/> : <Authentication db={db} auth={auth}/>}
      </div>
    </Router>
      
    
  );
}

export default App;

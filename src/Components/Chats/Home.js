import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import ChatRoom from './ChatRoom';
import './Home.css'

const Home = ({db, auth, user}) => {
    const history = useHistory();
    const [user1, setUser1] = useState('Loading...');
    const logOut = () => {
        auth.signOut().then(() => {
            history.replace("/");
        });
    }

    useEffect(() => {
        db.collection('users').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
                if (doc.id === user.uid) {
                    setUser1(doc.data().username);
                }
            })
        }).catch(error => {
            console.log(error);
        })
        return () => {
            console.log("Home unmounted");
        }
    }, [])


    return ( 
        <Router>
            <div className="home-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-3 remove-padding" style={{backgroundColor: '#B527e7'}}>
                            <div style={{display: 'flex', 
                            justifyContent: 'space-evenly', 
                            alignItems: 'center',
                            height: '15vh',
                            backgroundColor: '#b551da',
                            flexWrap: 'wrap',
                            }}>
                                <p 
                                style={{fontSize: 'clamp(0.7rem, 1.3vw, 2.6rem)', fontWeight: 'bold', Color: 'white', display: 'flex', flexWrap: 'wrap'}}
                                className="mb-2"
                                >{user1}</p>
                                <button 
                                className="btn btn-sm"
                                style={{fontSize: 'clamp(0.8rem, 1.3vw, 2.6rem)',
                                 fontWeight: 'bold',
                                 color: 'white'
                                }}
                                onClick={logOut}>log out</button>
                            </div>
                            <div style={{height: '85vh', display: 'flex', alignItems: 'flex-start', justifyContent: 'center'}}>
                                <div className="chatrooms" style={{marginTop: '5vh'}}>
                                    <p style={{fontSize: 'clamp(0.9rem, 1.5vw, 3rem)', fontWeight: 'bold', color: 'white'}}>ChatRooms</p>
                                    <ul>
                                        <Link to="/rooms/ChatA" style={{textDecoration: 'none', color: 'white'}}><li>ChatA</li></Link>
                                        <Link to="/rooms/ChatB" style={{textDecoration: 'none', color: 'white'}}><li>ChatB</li></Link>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-9 remove-padding col-chatzone">
                            <div className="header">
                                <h1>CyberChat</h1>
                            </div>
                            <Switch>
                                <Route exact path="/">
                                    <div style={{height: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                        <h1>Welcome <span style={{color: 'B527e7'}}>{user1}!😃</span></h1>
                                    </div>
                                </Route>
                                <Route exact path="/rooms/:chatID">
                                    <ChatRoom db={db} auth={auth}/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>

                
                {/*<div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 remove-padding col-chatzone">
                            <div className="header">
                                <h2>Chat Room No#1</h2>
                            </div>
                            <div className="body">
                                <div className=" messages">
                                    <div className="msg" >
                                        <h6 className="user" >Ruwaid Muntajim</h6>
                                        <hr id="hr" />
                                        <p>Hi I'm Ruwaid
                                            dffvdsd
                                            sfsfsdf
                                            sfsdfs
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="footer">
                                <form  className="form">
                                    <div className="input-group  flex">
                                        <input type="text" className="form-control" placeholder="Say something nice"/>
                                        <button className="btn btn-success">🦅</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>*/}
            </div>
        </Router>    
     );
}
 
export default Home;

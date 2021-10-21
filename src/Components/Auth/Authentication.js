import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './Authentication.css';
import Login from './Login';
import Signup from './Signup';

const Authentication = ({db, auth}) => {


    useEffect(() => {
        console.log("In authentication")
    })

    return ( 
        <Router>
            <div className="auth-page">
                <div className="container-fluid text-center">
                    <div className="row" style={{height: '100vh'}}>
                        <div className="col-md-6 poster" style={{height: '100%'}}>
                            <div className="card">
                                <div className="card-body">
                                    <p style={{fontSize: 'clamp(3rem, 7vw, 7rem)'}}>CyberChat</p>
                                </div>
                                <div className="card-title">
                                    <p style={{fontSize: 'clamp(1.5rem, 3vw, 7rem)'}}>Connect with people</p>
                                </div>
                            </div>
                            <a className="btn btn-primary btn-poster" href="#login">Log In</a>
                        </div>
                        <div className="col-md-6 form-container" style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Switch>
                                <Route exact path="/signup">
                                    <Signup db={db} auth={auth}/>
                                </Route>
                                <Route exact path={["/", "*"]}>
                                    <Login auth={auth}/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </Router>
     );
}
 
export default Authentication;
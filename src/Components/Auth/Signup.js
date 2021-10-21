import './Login.css'
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
const Signup = ({db, auth}) => {
    const history = useHistory();
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const signUp = (e) => {

        e.preventDefault();
        
        auth.createUserWithEmailAndPassword(email, password).then((cred) => {
            db.collection('users').doc(cred.user.uid).set({username: user});
            console.log(cred);
        }).then(() => {
            history.replace('/')
        })
        setUser('');
        setEmail('');
        setPassword('');

    }


    useEffect(() => {
        console.log("in singin")
    })

    return ( 
        <form className="form">
            <h1 style={{color: '#B527e7'}} className="mb-5">Sign Up</h1>
            <label htmlFor="username" style={{color: '#B527e7'}}>Username</label>
            <div className="input-group mb-4">
                <input type="text" 
                className="form-control" 
                placeholder="User Name" 
                required
                id="username"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                />
            </div>
            <label htmlFor="email" style={{color: '#B527e7'}}>Email</label>
            <div className="input-group mb-4">
                <input type="email" 
                className="form-control" 
                id="email" 
                placeholder="name@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <label htmlFor="password" style={{color: '#B527e7'}}>Password</label>
            <div className="input-group mb-4">
                
                <input type="password" 
                className="form-control" 
                id="password" 
                placeholder="Keep it private {^-^}"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button 
            className="btn btn-primary mb-2" 
            type="submit"
            onClick={signUp}
            >Sign Up</button>
            <p>Already have an <span style={{color: '#B527e7'}}>account?</span><Link to="/" style={{color: 'black', textDecoration: 'underline', textDecorationColor: '#B527e7'}}> Log <span style={{color: '#B527e7'}}>In</span></Link></p>
            {/*<div className="login-page">
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
                        </div>
                        <div className="col-md-6 form-container" style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <form className="form">
                                <h1 style={{color: '#B527e7'}} className="mb-5">Sign Up</h1>
                                {/*<label htmlFor="username" style={{color: '#B527e7'}}>Username</label>
                                <div className="input-group mb-4">
                                    <input type="text" className="form-control" placeholder="User Name" id="username"/>
                                </div>
                                <label htmlFor="email" style={{color: '#B527e7'}}>Email</label>
                                <div className="input-group mb-4">
                                    <input type="email" 
                                    className="form-control" 
                                    id="email" 
                                    placeholder="name@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <label htmlFor="password" style={{color: '#B527e7'}}>Password</label>
                                <div className="input-group mb-4">
                                    
                                    <input type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Keep it private {^-^}"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <button 
                                className="btn btn-primary mb-2" 
                                type="submit"
                                onClick={signUp}
                                >Sign Up</button>
                                <p>Already have an <span style={{color: '#B527e7'}}>account?</span><Link to="/" style={{color: 'black', textDecoration: 'underline', textDecorationColor: '#B527e7'}}> Log <span style={{color: '#B527e7'}}>In</span></Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>*/}
        </form>
        
     );
}
 
export default Signup;
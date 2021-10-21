import './Login.css'
import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
const Login = ({auth}) => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    
    const logIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password).then((cred) => {
            console.log(cred);
        }).then(() => {
            history.replace('/');
        });
        setEmail('');
        setPassword('');
    }


    useEffect(() => {
        console.log('in log in');
    }, [])
    
    
    return (
        
        <form className="form" id="login">
            <h1 style={{color: '#B527e7'}} className="mb-5">Log In</h1>
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
            <button className="btn btn-primary mb-2" 
            type="submit"
            onClick={logIn}
            >Log In</button>
            <p>Don't have an 
                <span 
                    style={{color: '#B527e7'}}
                    >account?
                </span>
                <Link 
                    to="/signup" 
                    style={{color: 'black', 
                        textDecoration: 'underline', 
                        textDecorationColor: '#B527e7'
                    }}
                >
                 Sign 
                 <span style={{color: '#B527e7'}}
                 >Up</span>
                 </Link>
            </p>
        </form>


            
    );
}
 
export default Login;
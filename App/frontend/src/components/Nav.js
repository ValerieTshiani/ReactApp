import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';

function Nav() {
    const [isLoggedIn, setIsLoggedIn]=useState(false)
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.getItem("isLoggedIn") && JSON.parse(sessionStorage.getItem("UserObject")) ){
            setIsLoggedIn(true)
            const userObject = JSON.parse(sessionStorage.getItem('UserObject'))
            setUserName (userObject.username)
            console.log('userObject.username', userObject.username)
         } else {
            setIsLoggedIn(false)
          }
    } )
     
    const logOut =  (() => {
        sessionStorage.clear()
        navigate('/');
    })
    
    

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark top">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navMainMenu" aria-controls="navMainMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div id="navMainMenu" className="navbar-collapse collapse">
                <div className="navbar-nav ml-auto">
                    <Link to='/' className="nav-item nav-link active">Home</Link>
                    <Link to='/tweets' className="nav-item nav-link">Tweets</Link>
                    <Link to='/users' className="nav-item nav-link">Users</Link>
                    {!isLoggedIn  && <Link to='/login' className="nav-item nav-link">Log-in</Link>}
                    {isLoggedIn && <Link   onClick = {logOut}  className="nav-item nav-link">Log-Out</Link>}
                    {isLoggedIn  && <Link    className="nav-item nav-link">User Logged in as  : {userName} </Link>} 
                    
                </div>
            </div>
        </nav>
    );
}

export default Nav;

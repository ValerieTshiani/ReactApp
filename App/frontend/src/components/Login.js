import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, 
    Route, Redirect,useNavigate} from "react-router-dom";
import axios from 'axios';
//import 'bootstrap/dist/css/bootstrap.min.css';

function Login () {
    const [email, setEmailInput] = useState('');
    const [password, setPasswordInput] = useState('');

    const [isSaved, setIsSaved] = useState(false);
    const [isCleared, setIsCleared] = useState(false);

    const [message, setMessage] = useState('');
    const [visible, setVisible] = useState(false);

    const navigate = useNavigate();

    const handleSubmit =   async (e) => {
        e.preventDefault ();
        sessionStorage.setItem("enter", "enter");
        const email = e.target.email.value;
        const password = e.target.password.value
        const response = [];
        
        try {

            const response = await axios.post('/login', {email,password});
            console.log('response ', response.data.result[0]);

            sessionStorage.setItem('UserObject', JSON.stringify(response.data.result[0]));
            sessionStorage.setItem('isLoggedIn', true);
            setIsSaved(true);

            const UserObject = JSON.parse(sessionStorage.getItem('UserObject'))

            console.log('UserObject', UserObject)
            if (response.data.message === "Login successfully" ){
            //redirect to home page
                console.log('response.data.message,', response.data.message)
                setMessage(response.data.message);
                navigate('/');
            }
            else {
                setMessage(response.data.message);
                //display login has failed
            }

        }
        catch (error) {
            console.log('it is here', error)
            setMessage(error.message);

        }
    };

     //timer for the message
     useEffect(() => {
        if (message) {
          setVisible(true);
          const timer = setTimeout(() => {
            setVisible(false);
          }, 3000); // 5000 milliseconds = 5 seconds
    
          return () => {
            clearTimeout(timer);
          };
        }
      }, [message]);

    return (
        <section>
            <div className="container-fluid">
                <div className = 'd-flex vh-100 justify-content-center align-items-center bg-primary' >
                    <div className=' p-3 bg-white w-25' >
                        <form onSubmit = {handleSubmit} >
                            <div className='mb-3'>
                                <label htmlFor = "email"> Email </label>
                                <input type="email" name = "email" placeholder = "Enter Email" className = "form-control"
                                value= {email} onChange={(e) => setEmailInput(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label htmlFor = "password"> Password </label>
                                <input type="password" name = "password" placeholder = "Enter Password" className = "form-control"
                                    value ={password} onChange={(e) => setPasswordInput(e.target.value)}
                                >

                                </input>
                            </div>
                            <button className = 'btn btn-success'> Login </button>
                        </form>
                        {visible && message && message.trim() !== '' && (
                                    <p className="alert alert-info rounded-pill">
                                    {message}
                                    </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login;
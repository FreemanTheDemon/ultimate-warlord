import React, {useState} from 'react';
import axios from 'axios';
import './component-styles/login.css';

const baseURL = 'http://localhost:4004'

function Login({setLogin, setUsername}) {
    const [loginInputs, setLoginInputs] = useState({});
    const [registerInputs, setRegisterInputs] = useState({});

    const handleLoginChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLoginInputs(values => ({...values, [name]: value}));
        setUsername(loginInputs.username);
    }

    const handleLoginSubmit = (e) => {
        e.preventDefault();

        axios.post(`${baseURL}/login`, loginInputs)
        .then(res => {
            if (res.status === 200) {
                setLogin(false);
            } else if (res.status === 400) {
                alert('Incorrect username/password!');
            }
        })
        .catch(err => alert('Incorrect username/password!'))
    }

    const handleRegisterChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegisterInputs(values => ({...values, [name]: value}));
        setUsername(registerInputs.username);
    }

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        axios.post(`${baseURL}/register`, registerInputs)
        .then(res => {
            if (res.status === 200) {
                setLogin(false);
            } else if (res.status === 400) {
                alert('Invalid username/password!');
            }
        })
        .catch(err => console.log(err));
    }

  return (
    <div className="login">
        <div className="sub-login">
            <h3>Login</h3>
            <form className="form" onSubmit={handleLoginSubmit}>
                <label>Username:&nbsp;
                    <input
                        type="text" 
                        name="username"
                        value={loginInputs.username || ""}
                        onChange={handleLoginChange}
                    />
                </label>
                <label>Password:&nbsp;&nbsp;
                    <input
                        type="password"
                        name="password"
                        value={loginInputs.password || ""}
                        onChange={handleLoginChange} 
                    />
                </label>
                <input type="submit" value="Login" />
            </form>
        </div>

        <div className="sub-login">
            <h3>Register</h3>
            <form className="form" onSubmit={handleRegisterSubmit}>
                <label>Username:&nbsp;
                    <input
                        type="text" 
                        name="username"
                        value={registerInputs.username || ""}
                        onChange={handleRegisterChange}
                    />
                </label>
                <label>Password:&nbsp;&nbsp;
                    <input
                        type="password"
                        name="password"
                        value={registerInputs.password || ""}
                        onChange={handleRegisterChange} 
                    />
                </label>
                <input type="submit" value="Login" />
            </form>
        </div>
    </div>
  );
}

export default Login;

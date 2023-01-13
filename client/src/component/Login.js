import React, { useState } from 'react';
import useInput from '../component/hooks/useInput';
import styles from './login.module.css';
import NavBurger from './Layout/NavBurger';
import Button from './Layout/Button';
import logo from '../logo.png';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    const navigate = useNavigate();
    const onButtonClick = () => {
        navigate('/signup');
    };
    const [noUser, setNoUser] = useState(false);
    const [incorrectPassword, setIncorrectPassword] = useState(false);
    const {
        value: enteredUser,
        isValid: enteredUserIsValid,
        hasError: enteredUserHasError,
        valueChangeHandler: userChangeHandler,
        inputBlurHandler: userBlurHandler,
    } = useInput((value) => value.length > 7);
    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: enteredPasswordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput((value) => value.trim() !== '' && value.length > 7);

    const onLoginClickHandler = (e) => {
        let userData = {
            username: enteredUser,
            password: enteredPassword,
        };
        try {
            const login = async () => {
                try {
                    const response = await axios.post(`${process.env.React_App_api}/api`, userData);
                    console.log(response);
                    if (response.data.success) {
                        console.log('logged in');
                        localStorage.setItem('token', response.data.accessToken);
                        navigate('/jokes');
                    }
                    if (response.data === 'No username found') {
                        setNoUser(true);
                    } else {
                        setNoUser(false);
                    }
                    if (response.data === 'incorrect password') {
                        setIncorrectPassword(true);
                    } else {
                        setIncorrectPassword(false);
                    }
                } catch (error) {
                    console.log(error);
                }
            };
            if (enteredUserIsValid && enteredPasswordIsValid) {
                login();
            }
            login();
        } catch (error) {}
    };
    return (
        <div className={styles.container}>
            <NavBurger type="login" />
            <div className={styles.firstElement}>
                <h1 className={styles.header}>JokesHub</h1>
                <div className={styles.logos}>
                    <img src={logo} alt="logo" className={styles.logo} />
                </div>
            </div>
            <div className={styles.secondElement}>
                <div className={styles.login_container}>
                    <div
                        className={
                            !enteredUserHasError
                                ? styles.loginFormFields
                                : `${styles.loginFormFields} 
                                          ${styles.invalid}`
                        }
                    >
                        <input type="text" id="username" placeholder="Username" value={enteredUser} onChange={userChangeHandler} onBlur={userBlurHandler} />
                    </div>
                    <div
                        className={
                            !enteredPasswordHasError
                                ? styles.loginFormFields
                                : `${styles.loginFormFields} 
                                          ${styles.invalid}`
                        }
                    >
                        <input type="password" id="password" placeholder="Password" value={enteredPassword} onChange={passwordChangeHandler} onBlur={passwordBlurHandler} />
                        {incorrectPassword && <p className={styles.errorMesPW}>Incorrect password</p>}
                        {noUser && <p className={styles.errorMes}>Username does not exist</p>}
                    </div>
                    <Button className={styles.btn} onClick={onLoginClickHandler}>
                        Login
                    </Button>

                    <h4 className={styles.noAccount}>Does not have an account?</h4>
                    <Button className={styles.btn} onClick={onButtonClick}>
                        Create Account
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Login;

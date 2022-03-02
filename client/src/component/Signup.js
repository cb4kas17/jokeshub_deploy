import React, { useState } from 'react';
import styles from './signup.module.css';
import useInput from '../component/hooks/useInput';
import NavBurger from './Layout/NavBurger';
import Button from './Layout/Button';
import Nav from './Layout/Nav';
import Modal from './Layout/Modal';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [notMatch, setNotMatch] = useState(false);
    const [userExist, setUserExist] = useState(false);
    const [modal, setModal] = useState(false);
    const {
        value: enteredUser,
        isValid: enteredUserIsValid,
        hasError: enteredUserHasError,
        valueChangeHandler: userChangeHandler,
        inputBlurHandler: userBlurHandler,
    } = useInput((value) => value.trim() !== '' && value.length > 7);
    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: enteredNameHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
    } = useInput((value) => value.trim() !== '' && !value.isNaN);
    const {
        value: enteredPassword,
        isValid: enteredPasswordIsValid,
        hasError: enteredPasswordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
    } = useInput((value) => value.trim() !== '' && value.length > 7);
    const {
        value: enteredConfirm,
        isValid: enteredConfirmIsValid,
        hasError: enteredConfirmHasError,
        valueChangeHandler: confirmChangeHandler,
        inputBlurHandler: confirmBlurHandler,
    } = useInput((value) => value.trim() !== '' && value.length > 7);

    const onSignupClickHandler = (e) => {
        e.preventDefault();

        let userData = {
            username: enteredUser,
            password: enteredPassword,
            name: enteredName,
        };

        const postData = async () => {
            try {
                const response = await axios.post(`${process.env.React_App_api}/signup`, userData);
                console.log(response.data);
                if (response.data.success) {
                    console.log('data succeed');
                    setModal(true);
                } else {
                    setModal(false);
                }
                if (response.data === 'username exists') {
                    setUserExist(true);
                } else {
                    setUserExist(false);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (enteredPassword !== enteredConfirm) {
            setNotMatch(true);
        } else {
            setNotMatch(false);
            if (enteredPasswordIsValid && enteredNameIsValid && enteredUserIsValid && enteredConfirmIsValid) {
                postData();
            }
        }
    };
    return (
        <div>
            <Nav />
            <NavBurger type="login" />
            <form className={styles.signup_wrapper} onSubmit={onSignupClickHandler}>
                <div className={styles.signup_container}>
                    <div
                        className={
                            !enteredUserHasError
                                ? styles.loginFormFields
                                : `${styles.loginFormFields} 
                                          ${styles.invalid}`
                        }
                    >
                        <input type="text" id="username" placeholder="Username (At least 8 char)" value={enteredUser} onChange={userChangeHandler} onBlur={userBlurHandler} required={true} />
                    </div>
                    <div
                        className={
                            !enteredNameHasError
                                ? styles.loginFormFields
                                : `${styles.loginFormFields} 
                                          ${styles.invalid}`
                        }
                    >
                        <input type="text" id="name" placeholder="Display Name" value={enteredName} onChange={nameChangeHandler} onBlur={nameBlurHandler} required={true} />
                        {userExist && <p className={styles.errorMes}>Username already exist</p>}
                    </div>

                    <div
                        className={
                            !enteredPasswordHasError
                                ? styles.loginFormFields
                                : `${styles.loginFormFields} 
                                          ${styles.invalid}`
                        }
                    >
                        <input
                            type="password"
                            id="password"
                            placeholder="Password (At least 8 char)"
                            value={enteredPassword}
                            onChange={passwordChangeHandler}
                            onBlur={passwordBlurHandler}
                            required={true}
                        />
                    </div>
                    <div
                        className={
                            !enteredConfirmHasError
                                ? styles.loginFormFields
                                : `${styles.loginFormFields} 
                                          ${styles.invalid}`
                        }
                    >
                        <input
                            type="password"
                            id="confirm-password"
                            placeholder="Confirm Password"
                            value={enteredConfirm}
                            onChange={confirmChangeHandler}
                            onBlur={confirmBlurHandler}
                            required={true}
                        />
                        {notMatch && <p className={styles.errorMes}>Password not matched</p>}
                    </div>

                    <Button className={styles.btn} type={'submit'}>
                        Create account
                    </Button>

                    {modal && (
                        <Modal className={styles.modalDesign}>
                            <div className={styles.messageContainer}>
                                <h2 className={styles.messageHeader}>Account Created</h2>
                                <Button
                                    className={styles.modalButton}
                                    onClick={() => {
                                        navigate('/login');
                                    }}
                                >
                                    Go Login Page
                                </Button>
                            </div>
                        </Modal>
                    )}
                </div>
            </form>
        </div>
    );
}

export default Signup;

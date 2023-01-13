import React, { useState, useEffect } from 'react';
import styles from './editProfile.module.css';
import NavBurger from './Layout/NavBurger';
import Button from './Layout/Button';
import Nav from './Layout/Nav';
import axios from 'axios';
import Modal from './Layout/Modal';
import { useNavigate } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
function EditProfile() {
    const navigate = useNavigate();

    const [enteredName, setEnteredName] = useState('');
    const [enteredOldPW, setEnteredOldPW] = useState('');
    const [enteredNewPW, setEnteredNewPW] = useState('');
    const [user, setUser] = useState([]);
    const [updatedUser, setUpdatedUser] = useState(false);
    const [pwChanged, setPwChanged] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errorPrompt, setErrorPrompt] = useState(false);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API}/getUser`, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                    },
                });
                const data = await response.data.user;
                console.log(data);
                setUser(data);
                setEnteredName(data.fullName);
                setLoading(false);
                // if (response.data === 'login again') {
                //     navigate('/');
                // }
            } catch (error) {
                console.log(error);
                navigate('/');
            }
        }
        fetchData();
    }, [updatedUser, pwChanged, navigate]);

    const updateButtonHandler = async (e) => {
        let data = {
            name: enteredName,
        };
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API}/updateProfile/${user.userName}`,
                data,
                {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                    },
                }
            );
            const updatedData = await response.data.userData;
            console.log('data' + updatedData);
            console.log(response);
            if (response.data.success) {
                console.log('updated succcessfully');
                setUpdatedUser(true);
            } else {
                console.log('user not updated');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const changePWButtonHandler = async (e) => {
        let data = {
            oldPassword: enteredOldPW,
            newPassword: enteredNewPW,
        };
        if (enteredNewPW.length > 7) {
            try {
                const response = await axios.put(
                    `${process.env.REACT_APP_API}/changePassword/${user.userName}`,
                    data,
                    {
                        headers: {
                            'x-access-token': localStorage.getItem('token'),
                        },
                    }
                );
                const updatedPW = await response.data.updatedUser;
                console.log('log' + updatedPW);
                if (response.data.success) {
                    console.log('PW changed successfully');
                    setPwChanged(true);
                } else {
                    console.log('PW not updated');
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            setErrorPrompt(true);
        }
    };
    return (
        <div className={styles.container}>
            <Nav />
            <NavBurger type="jokes" />
            {loading ? (
                <div className={styles.loadingContainer}>
                    <ClipLoader size={100} color={'#F1C815'} loading={loading} />
                </div>
            ) : (
                <div>
                    <div className={styles.content_container}>
                        <h1 className={styles.header}>Edit Profile</h1>
                        <div className={styles.first_content}>
                            <h4 className={styles.name}>Display Name:</h4>
                            <div className={styles.input_fields}>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Full Name"
                                    value={enteredName}
                                    onChange={(e) => {
                                        setEnteredName(e.target.value);
                                    }}
                                />
                            </div>
                            <div>
                                <Button onClick={updateButtonHandler}>Update</Button>
                            </div>
                        </div>
                        <div className={styles.second_content}>
                            <div className={styles.input_fields}>
                                <input
                                    type="password"
                                    id="old-password"
                                    placeholder="Old Password"
                                    value={enteredOldPW}
                                    onChange={(e) => {
                                        setEnteredOldPW(e.target.value);
                                    }}
                                />
                                <input
                                    type="password"
                                    id="new-password"
                                    placeholder="New Password"
                                    value={enteredNewPW}
                                    onChange={(e) => {
                                        setEnteredNewPW(e.target.value);
                                    }}
                                />
                                {errorPrompt && (
                                    <p className={styles.errorMes}>
                                        Password should be at least 8 characters long
                                    </p>
                                )}
                            </div>
                            <div>
                                <Button onClick={changePWButtonHandler}>Change Password</Button>
                            </div>
                        </div>
                        {updatedUser && (
                            <Modal className={styles.modalDesign}>
                                <div className={styles.messageContainer}>
                                    <h2 className={styles.messageHeader}>User details updated</h2>
                                    <div className={styles.button_container}>
                                        <Button
                                            className={styles.modalButton}
                                            onClick={() => {
                                                setUpdatedUser(false);
                                            }}
                                        >
                                            Okay
                                        </Button>
                                    </div>
                                </div>
                            </Modal>
                        )}
                        {pwChanged && (
                            <Modal className={styles.modalDesign}>
                                <div className={styles.messageContainer}>
                                    <h2 className={styles.messageHeader}>
                                        Password successfully changed
                                    </h2>
                                    <div className={styles.button_container}>
                                        <Button
                                            className={styles.modalButton}
                                            onClick={() => {
                                                navigate('/login');
                                            }}
                                        >
                                            Okay
                                        </Button>
                                    </div>
                                </div>
                            </Modal>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditProfile;

import React, { useState, useEffect } from 'react';
import styles from './editJoke.module.css';
import NavBurger from './Layout/NavBurger';
import Button from './Layout/Button';
import Nav from './Layout/Nav';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from './Layout/Modal';
import ClipLoader from 'react-spinners/ClipLoader';

function EditJoke() {
    const { jokeID } = useParams();
    const navigate = useNavigate();
    const [joke, setJoke] = useState('');
    const [confirmation, setConfirmation] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`api/allJokes/${jokeID}`, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                    },
                });
                const data = await response.data.joke;
                console.log(data);
                console.log(response);
                setJoke(data.content);
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
    }, [jokeID, navigate]);

    const onUpdateHandler = (e) => {
        let content = { content: joke };
        async function updateData() {
            try {
                const response = await axios.put(`api/EditJokes/${jokeID}`, content, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                    },
                });
                const data = await response.data.joke;
                console.log(data);
                navigate('/myJokes');
            } catch (error) {
                console.log(error);
            }
        }
        updateData();
    };
    const onDeleteHandler = async (e) => {
        try {
            const response = await axios.delete(`api/EditJokes/${jokeID}`, {
                headers: {
                    'x-access-token': localStorage.getItem('token'),
                },
            });
            const data = await response.data.joke;
            console.log(data);
            if (response.data.success) {
                navigate('/myJokes');
            } else {
                console.log('Not successful');
            }
        } catch (error) {
            console.log(error);
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
                    {' '}
                    <div className={styles.content_container}>
                        <h1 className={styles.header}>Edit your joke</h1>
                        <textarea
                            type="text"
                            className={styles.joke_input}
                            placeholder="Enter your joke"
                            value={joke}
                            onChange={(e) => {
                                setJoke(e.target.value);
                            }}
                        />
                        <div className={styles.button_container}>
                            <Button className={styles.btn} onClick={onUpdateHandler}>
                                Update
                            </Button>
                            <Button
                                className={styles.btn}
                                onClick={() => {
                                    setConfirmation(true);
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                    {confirmation && (
                        <Modal className={styles.modalDesign}>
                            <div className={styles.messageContainer}>
                                <h2 className={styles.messageHeader}>
                                    Are you sure you want to delete this joke?
                                </h2>
                                <div className={styles.button_container}>
                                    <Button
                                        className={styles.modalButton}
                                        onClick={onDeleteHandler}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        className={styles.modalButton}
                                        onClick={() => {
                                            setConfirmation(false);
                                        }}
                                    >
                                        No
                                    </Button>
                                </div>
                            </div>
                        </Modal>
                    )}
                </div>
            )}
        </div>
    );
}

export default EditJoke;

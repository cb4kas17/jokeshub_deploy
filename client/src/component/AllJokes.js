import React, { useState, useEffect } from 'react';
import styles from './allJokes.module.css';
import NavBurger from './Layout/NavBurger';
import Button from './Layout/Button';
import Nav from './Layout/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from './Layout/Card';
import { faEye, faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NoJokesFound from './NoJokesFound';
import ClipLoader from 'react-spinners/ClipLoader';

function AllJokes() {
    const navigate = useNavigate();
    const [jokes, setJokes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`api/allJokes`, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                    },
                });
                const data = await response.data.jokes;
                console.log(data);
                console.log(response);
                setJokes(data);
                setLoading(false);
                // if (response.data === 'login again') {
                //     navigate('/');
                // }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [navigate]);

    const onViewHandler = (id) => {
        navigate(`/jokes/${id}`);
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
                    {jokes && (
                        <ul className={styles.all_jokes_container}>
                            {jokes.length !== 0 ? (
                                jokes.map((item, i) => (
                                    <Card className={styles.single_joke_container} key={i}>
                                        <div className={styles.joke_content_container}>
                                            <div className={styles.date}>
                                                {item.createdAt.toLocaleString().slice(0, 10)}
                                            </div>
                                            <div className={styles.joke_author}>
                                                By: {item.author}
                                            </div>
                                            <div className={styles.joke_content}>
                                                <FontAwesomeIcon
                                                    icon={faQuoteLeft}
                                                    size="sm"
                                                    className={styles.quoteLeft}
                                                />
                                                {item.content}{' '}
                                                <FontAwesomeIcon
                                                    icon={faQuoteRight}
                                                    size="sm"
                                                    className={styles.quoteRight}
                                                />
                                            </div>
                                        </div>

                                        <div className={styles.joke_button}>
                                            <Button
                                                onClick={() => {
                                                    onViewHandler(item._id);
                                                }}
                                            >
                                                <FontAwesomeIcon icon={faEye} size="lg" />
                                            </Button>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <NoJokesFound />
                            )}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}

export default AllJokes;

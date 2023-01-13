import React, { useState, useEffect } from 'react';
import NavBurger from './Layout/NavBurger';
import Button from './Layout/Button';
import Nav from './Layout/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Card from './Layout/Card';
import {
    faPaperPlane,
    faQuoteLeft,
    faQuoteRight,
    faComment,
} from '@fortawesome/free-solid-svg-icons';
import styles from './viewJoke.module.css';
import NoComments from './NoComments';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';

function ViewJoke() {
    const navigate = useNavigate();
    const [joke, setJoke] = useState([]);
    const [comment, setComment] = useState([]);
    const [commentContent, setCommentContent] = useState('');
    const [user, setUser] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const { jokeID } = useParams();
    const [loading, setLoading] = useState(true);
    const [commentLoading, setCommentLoading] = useState(true);

    useEffect(() => {
        async function fetchJoke() {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API}/allJokes/${jokeID}`,
                    {
                        headers: {
                            'x-access-token': localStorage.getItem('token'),
                        },
                    }
                );
                const data = await response.data.joke;
                console.log(response.data);
                setJoke(data);
                setLoading(false);
                // if (response.data === 'login again') {
                //     navigate('/');
                // }
            } catch (error) {
                console.log(error);
            }
        }
        async function fetchComment() {
            try {
                const responsex = await axios.get(
                    `${process.env.REACT_APP_API}/jokes/comment/${jokeID}`,
                    {
                        headers: {
                            'x-access-token': localStorage.getItem('token'),
                        },
                    }
                );
                const commentData = await responsex.data.comment;
                setComment(commentData);
                console.log(commentData);
                setCommentLoading(false);
                setRefresh(false);
            } catch (error) {
                console.log(error);
            }
        }
        async function fetchUser() {
            try {
                const responsey = await axios.get(`${process.env.REACT_APP_API}/getUser`, {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                    },
                });
                const userData = await responsey.data.user;
                setUser(userData);
                console.log('user data: ' + userData.userName);
            } catch (error) {
                console.log(error);
            }
        }
        fetchJoke();
        fetchComment();
        fetchUser();
    }, [navigate, refresh, jokeID]);

    const postComment = async () => {
        const commentData = {
            author: user.fullName,
            comment: commentContent,
        };
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API}/jokes/comment/${jokeID}`,
                commentData,
                {
                    headers: {
                        'x-access-token': localStorage.getItem('token'),
                    },
                }
            );
            const data = await response.data.comment;
            setCommentContent('');
            setRefresh(true);
            console.log(data);
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
                    {joke && (
                        <div className={styles.content_container}>
                            <Card>
                                <div className={styles.joke_content_container}>
                                    <div className={styles.joke_author}>By: {joke.author}</div>
                                    <div className={styles.joke_content}>
                                        <FontAwesomeIcon
                                            icon={faQuoteLeft}
                                            size="sm"
                                            className={styles.quoteLeft}
                                        />
                                        {joke.content}{' '}
                                        <FontAwesomeIcon
                                            icon={faQuoteRight}
                                            size="sm"
                                            className={styles.quoteRight}
                                        />
                                    </div>
                                </div>
                            </Card>
                            <div className={styles.comment_input_container}>
                                <textarea
                                    type="text"
                                    className={styles.comment_input}
                                    placeholder="Enter comment"
                                    onChange={(e) => {
                                        setCommentContent(e.target.value);
                                    }}
                                    value={commentContent}
                                />
                                <Button className={styles.btn} onClick={postComment}>
                                    <FontAwesomeIcon
                                        icon={faPaperPlane}
                                        size="xl"
                                        className={styles.send}
                                    />
                                </Button>
                            </div>
                            <div className={styles.comment_section_container}>
                                <h1 className={styles.header}>
                                    Comments{' '}
                                    <FontAwesomeIcon
                                        icon={faComment}
                                        size="sm"
                                        className={styles.commentIcon}
                                    />
                                </h1>
                                {commentLoading ? (
                                    <div className={styles.loadingContainer}>
                                        <ClipLoader
                                            size={100}
                                            color={'#F1C815'}
                                            loading={loading}
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        {comment.length === 0 && <NoComments />}
                                        {comment.map((item, i) => (
                                            <div className={styles.comment_container} key={i}>
                                                <div className={styles.comment_author}>
                                                    From: {item.author}
                                                </div>
                                                <div className={styles.comment}>{item.comment}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default ViewJoke;

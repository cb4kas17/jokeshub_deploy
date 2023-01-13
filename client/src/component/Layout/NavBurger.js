import React, { useState } from 'react';
import styles from './navBurger.module.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function NavBurger(props) {
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false);

    const logoutHanlder = async () => {
        const response = await axios.get(`${process.env.REACT_APP_API}/logout`, {
            headers: {
                'x-access-token': localStorage.getItem('token'),
            },
        });

        if (response.data.success) {
            localStorage.removeItem('token');
            navigate('/login');
        } else {
            setClicked(false);
            console.log('logout error');
        }
    };
    return (
        <div className={styles.nav}>
            <input
                type="checkbox"
                className={styles.nav_checkbox}
                id="navi-toggle"
                checked={clicked}
                onChange={() => {
                    setClicked(!clicked);
                }}
            />
            <label htmlFor="navi-toggle" className={styles.nav_button}>
                {clicked ? (
                    <span className={styles.nav_icon}>
                        <FontAwesomeIcon icon={faXmark} />
                    </span>
                ) : (
                    <span className={styles.nav_icon}>
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                )}
            </label>
            <div className={styles.nav_background}>&nbsp;</div>

            <nav className={styles.nav_nav}>
                {props.type === 'login' && (
                    <ul className={styles.nav_list}>
                        <li className={styles.nav_item}>
                            <NavLink to="/" className={styles.nav_link}>
                                Home
                            </NavLink>
                        </li>
                        <li className={styles.nav_item}>
                            <NavLink to="/login" className={styles.nav_link}>
                                Login
                            </NavLink>
                        </li>
                        <li className={styles.nav_item}>
                            <NavLink to="/signup" className={styles.nav_link}>
                                Signup
                            </NavLink>
                        </li>
                    </ul>
                )}
                {props.type === 'jokes' && (
                    <ul className={styles.nav_list}>
                        <li className={styles.nav_item}>
                            <NavLink to="/jokes" className={styles.nav_link}>
                                All Jokes
                            </NavLink>
                        </li>
                        <li className={styles.nav_item}>
                            <NavLink to="/createJoke" className={styles.nav_link}>
                                Create Joke
                            </NavLink>
                        </li>
                        <li className={styles.nav_item}>
                            <NavLink to="/myJokes" className={styles.nav_link}>
                                My Jokes
                            </NavLink>
                        </li>
                        <li className={styles.nav_item}>
                            <NavLink to="/editProfile" className={styles.nav_link}>
                                Edit Profile
                            </NavLink>
                        </li>
                        <li className={styles.nav_item}>
                            <NavLink
                                to="/login"
                                className={styles.nav_link}
                                onClick={logoutHanlder}
                            >
                                Logout
                            </NavLink>
                        </li>
                    </ul>
                )}
            </nav>
        </div>
    );
}

export default NavBurger;

import React from 'react';
import styles from './nav.module.css';
import logo from '../../logo-mini.png';
import { useNavigate } from 'react-router-dom';
function Nav() {
    const navigate = useNavigate();
    return (
        <>
            <div className={styles.logos}>
                <img
                    src={logo}
                    alt="logo"
                    className={styles.logo}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        navigate('/jokes');
                    }}
                />
                <h1
                    className={styles.header}
                    onClick={() => {
                        navigate('/jokes');
                    }}
                    style={{ cursor: 'pointer' }}
                >
                    JokesHub
                </h1>
            </div>
        </>
    );
}

export default Nav;

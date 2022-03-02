import React from 'react';
import styles from '../component/homePage.module.css';
import Button from './Layout/Button';
import logo from '../logo.png';
import NavBurger from './Layout/NavBurger';
import { useNavigate } from 'react-router-dom';
function HomePage() {
    const navigate = useNavigate();
    const onButtonClick = () => {
        navigate('/login');
    };
    return (
        <div className={styles.container}>
            <NavBurger type="login" />
            <div className={styles.firstElement}>
                <div className={styles.logos}>
                    <img src={logo} alt="logo" />
                </div>
            </div>
            <div className={styles.secondElement}>
                <h1 className={styles.header}>JokesHub</h1>
                <h4 className={styles.secondaryHeader}>Share your best jokes and laugh with us</h4>
                <Button className={styles.btn} onClick={onButtonClick}>
                    Join us now
                </Button>
            </div>
        </div>
    );
}

export default HomePage;

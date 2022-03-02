import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import Button from '../component/Layout/Button';

function ErrorPage() {
    let navigate = useNavigate();

    const onButtonClick = () => {
        navigate('/');
    };
    return (
        <div style={{ 'font-size': '10rem', 'text-align': 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ fontSize: '10rem' }}>
                <FontAwesomeIcon icon={faCircleExclamation} size="lg" />
            </div>
            <div style={{ marginBottom: '5rem' }}>Page not found</div>
            <Button onClick={onButtonClick}>Go to home page</Button>
        </div>
    );
}

export default ErrorPage;

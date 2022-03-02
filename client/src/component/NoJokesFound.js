import React from 'react';
import style from './noJokesFound.module.css';
import Button from './Layout/Button';
import { useNavigate } from 'react-router-dom';
function NoJokesFound() {
    const navigate = useNavigate();
    return (
        <>
            <div className={style.header}>No Jokes Found. Please create one</div>;
            <Button
                onClick={() => {
                    navigate('/createJoke');
                }}
            >
                Create Joke
            </Button>
        </>
    );
}

export default NoJokesFound;

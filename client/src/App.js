import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import WelcomePage from '../src/pages/WelcomePage';
import LoginPage from '../src/pages/LoginPage';
import SignupPage from '../src/pages/SignupPage';
import AllJokesPage from '../src/pages/AllJokesPage';
import ViewJokePage from '../src/pages/ViewJokePage';
import CreateJokePage from '../src/pages/CreateJokePage';
import MyJokesPage from '../src/pages/MyJokesPage';
import EditJokePage from '../src/pages/EditJokePage';
import EditProfilePage from '../src/pages/EditProfilePage';
import ErrorPage from '../src/pages/ErrorPage';
import Container from '../src/component/Layout/Container';
function App() {
    return (
        <Container>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<ErrorPage />} />
                    <Route path="/" element={<WelcomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/jokes" exact element={<AllJokesPage />} />
                    <Route path="/jokes/:jokeID" element={<ViewJokePage />} />
                    <Route path="/createJoke" element={<CreateJokePage />} />
                    <Route path="/myJokes" element={<MyJokesPage />} />
                    <Route path="/editJoke/:jokeID" element={<EditJokePage />} />
                    <Route path="/editProfile" element={<EditProfilePage />} />
                </Routes>
            </BrowserRouter>
        </Container>
    );
}

export default App;

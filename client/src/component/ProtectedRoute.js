import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
function ProtectedRoute() {
    let user = false;
    const useAuth = () => {
        const token = localStorage.getItem('token');
        try {
            if (token || token.length !== 0) {
                user = true;
                console.log(user);
                return user;
            } else {
                user = false;
                return user;
            }
        } catch (error) {
            user = false;
            return user;
        }
    };
    const isAuth = useAuth();
    return isAuth ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { useUser } from '../contexts/UserContext';

const Login = () => {
    const { handleSignIn } = useUser(); // Get handleSignIn from context
    const navigate = useNavigate();

    return (
        <Authenticator>
            {({ user, signOut }) => {
                if (user) {
                    handleSignIn(user); // Update user context with logged-in user data
                    navigate('/');  // Redirect to home after successful login
                }

                return null;  // Render nothing while loading or during login
            }}
        </Authenticator>
    );
};

export default Login;

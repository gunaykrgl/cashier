import React, { useState } from 'react';
import styles from "./Login.module.scss";

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:9000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
                credentials: 'include', // Include cookies in the request
            });

            if (response.status === 200) {
                window.location.href = '/';
            }


                // Handle the response here
            } catch (error) {
                // Handle any errors here
            }
        };

        return (
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <label>Username
                    <input type="text" value={username} placeholder='Enter Username' onChange={handleUsernameChange} />
                </label>
                <label>Password
                    <input type="password" value={password} placeholder='Enter Password' onChange={handlePasswordChange} />
                </label>
                <button type="submit">Submit</button>
            </form>
        );
    };

    export default Login;

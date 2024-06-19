// fe/client/src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        console.log('Fetching data from backend...');
        axios.get('http://localhost:5001/api')
            .then(response => {
                console.log('Response from backend:', response.data);
                setMessage(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the data!', error);
                setError('Failed to fetch data from backend.');
            });
    }, []);

    return (
        <div>
            <h1>Hello from React!</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Message from backend: {message}</p>
        </div>
    );
};

export default App;

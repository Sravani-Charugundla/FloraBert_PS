import React, { useState } from 'react';
import './Home.css'; // Import a CSS file for styling (create this file)

function Home() {
    const [inputSequence, setInputSequence] = useState('');
    const [prediction, setPrediction] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const predict = () => {
        setLoading(true);
        fetch('http://localhost:5000/predict_gene_expression', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sequence: inputSequence }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setPrediction(data.prediction);
        })
        .catch(error => {
            console.error('Error predicting:', error);
            setError('An error occurred during prediction. Please try again.');
        })
        .finally(() => setLoading(false));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        predict();
    };

    const logout = () => {
        // Perform logout actions, such as clearing the access token from localStorage
        localStorage.removeItem('accessToken');

        // Redirect the user to the login page
        window.location.href = '/';
    };

    return (
        <div className="center-container">
            <br/>
            <br/>
            <br/>
            <div className="logout-container">
                <button onClick={logout} className="btn btn-danger">Logout</button>
            </div>

            <form onSubmit={handleSubmit} className="input-form">
                <label htmlFor="sequence">Input Sequence:</label>
                <input
                    type="text"
                    id="sequence"
                    name="sequence"
                    value={inputSequence}
                    onChange={e => setInputSequence(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    ) : (
                        'Predict'
                    )}
                </button>
            </form>

            {loading && (
                <div className="text-center">
                    <span className="spinner-border" role="status" aria-hidden="true"></span>
                    <p>Loading...</p>
                </div>
            )}
            
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {prediction.length > 0 && (
                <div className="prediction-container">
                    <h2>Prediction:</h2>
                    <table className="table table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>Label</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prediction.map((value, index) => (
                                <tr key={index}>
                                    <td>{`Label ${index + 1}`}</td>
                                    <td>{value}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Home;

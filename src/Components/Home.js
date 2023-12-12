import React, { useState } from 'react';
import BarGraph from './BarGraph';

function Home() {
    const [inputSequence, setInputSequence] = useState('');
    const [prediction, setPrediction] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [labels2] = useState(["Tassel", "Base", "Anther", "Middle", "Ear", "Shoot", "Tip", "Root"]);

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
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
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
                </div>

                <div className="col-md-6">
                    {prediction.length > 0 && (
                        <div className="prediction-container">
                            <h2>Prediction:</h2>
                            <BarGraph
  data={prediction.map((value, index) => ({ name: labels2[index], pv: value }))}
  colors={['#8884d8', '#82ca9d', '#ff7300', '#00c49f', '#0088fe', '#00bfff', '#bfff00', '#ff0080']}
/>
           </div>
                    )}
                </div>
            </div>

            {prediction.length > 0 && (
                <div className="prediction-container mt-4">
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
                                    <td>{`${labels2[index]}`}</td>
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

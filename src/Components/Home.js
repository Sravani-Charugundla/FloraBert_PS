// Home.js
import React, { useState } from 'react';

function Home() {
    const [inputSequence, setInputSequence] = useState('');
    const [prediction, setPrediction] = useState([]);

    const predict = () => {
        fetch('http://localhost:5000/predict_gene_expression', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sequence: inputSequence }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setPrediction(data.prediction); // Assuming the response has a 'prediction' field
        })
        .catch(error => console.error('Error predicting:', error));
    };

    return (
        <div>
            <label htmlFor="sequence">Input Sequence:</label>
            <textarea
                id="sequence"
                name="sequence"
                rows="4"
                cols="50"
                value={inputSequence}
                onChange={e => setInputSequence(e.target.value)}
            ></textarea>
            <button onClick={predict}>Predict</button>
            {prediction.length > 0 && (
                <div>
                    <h2>Prediction:</h2>
                    <table>
                        <thead>
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

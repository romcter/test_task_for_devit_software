import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [concurrency, setConcurrency] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [results, setResults] = useState([]);

  const handleStart = async () => {
    setIsFetching(true);
    setResults([]);
    const limit = parseInt(concurrency);

    let activeRequests = 0;
    let index = 1;

    const sendRequest = async (i) => {
      if (activeRequests < limit) {
        activeRequests++;
        try {
          const response = await axios.get(`/api?index=${i}`);
          setResults((prevResults) => [...prevResults, response.data.index]);
        } catch (error) {
          console.error(error);
        } finally {
          activeRequests--;
          if (index <= 1000) {
            sendRequest(index++);
          }
        }
      }
    };

    for (let i = 0; i < limit; i++) {
      sendRequest(index++);
    }
  };

  return (
      <div className="container">
        <input
            type="number"
            value={concurrency}
            onChange={(e) => setConcurrency(e.target.value)}
            min="0"
            max="100"
            required
        />
        <button onClick={handleStart} disabled={isFetching}>Start</button>
        <ul>
          {results.map((result, idx) => (
              <li key={idx}>{result}</li>
          ))}
        </ul>
      </div>
  );
}

export default App;

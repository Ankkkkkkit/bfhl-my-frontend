import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const data = JSON.parse(input);
      const res = await axios.post('http://localhost:8080/bfhl', data);
      setResponse(res.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON format');
    }
  };

  const handleSelect = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_lowercase_alphabet } = response;
    const result = {};

    if (selectedOptions.includes('Numbers')) result.numbers = numbers;
    if (selectedOptions.includes('Alphabets')) result.alphabets = alphabets;
    if (selectedOptions.includes('Highest lowercase alphabet')) result.highest_lowercase_alphabet = highest_lowercase_alphabet;

    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div>
      <h1>Input JSON</h1>
      <textarea
        rows="4"
        cols="50"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select multiple onChange={handleSelect}>
        <option value="Numbers">Numbers</option>
        <option value="Alphabets">Alphabets</option>
        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
      </select>
      {renderResponse()}
    </div>
  );
}

export default App;

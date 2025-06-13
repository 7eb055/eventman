import React, { useState } from 'react';
import { testConnection, sendTestData } from '../services/api';

const TestApi = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleTestConnection = async () => {
    try {
      const data = await testConnection();
      setResponse(data);
      setError(null);
    } catch (err) {
      setError('Connection failed');
      setResponse(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await sendTestData(formData);
      setResponse(result);
      setError(null);
    } catch (err) {
      setError('Failed to send data');
      setResponse(null);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">API Connection Test</h2>
      
      <button
        onClick={handleTestConnection}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Test Connection
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block">Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Send Test Data
        </button>
      </form>

      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {response && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TestApi;
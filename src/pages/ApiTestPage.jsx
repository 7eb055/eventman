import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ServerStatus from '../components/ServerStatus';

const ApiTestPage = () => {
  const [testingRegistration, setTestingRegistration] = useState(false);
  const [testRegistrationResult, setTestRegistrationResult] = useState(null);
  const [testingLogin, setTestingLogin] = useState(false);
  const [testLoginResult, setTestLoginResult] = useState(null);

  const testEndpoint = async (endpoint, method = 'GET', data = null) => {
    try {
      const options = {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(`http://localhost:8000/api/${endpoint}`, options);
      const resultData = await response.json();

      return {
        success: response.ok,
        status: response.status,
        statusText: response.statusText,
        data: resultData
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  };

  const testRegistration = async () => {
    setTestingRegistration(true);
    try {
      // First try to get CSRF token
      let csrfResult;
      try {
        const csrfResponse = await fetch('http://localhost:8000/sanctum/csrf-cookie', {
          method: 'GET',
          credentials: 'include'
        });
        csrfResult = {
          success: csrfResponse.ok,
          status: csrfResponse.status
        };
      } catch (error) {
        csrfResult = {
          success: false,
          error: error.message
        };
      }

      // Then try registration
      const testData = {
        name: `Test User ${Date.now()}`,
        email: `test${Date.now()}@example.com`,
        password: 'password123',
        password_confirmation: 'password123',
        role: 'attendee'
      };

      const registrationResult = await testEndpoint('register', 'POST', testData);

      setTestRegistrationResult({
        csrf: csrfResult,
        registration: registrationResult
      });
    } catch (error) {
      setTestRegistrationResult({
        error: error.message
      });
    } finally {
      setTestingRegistration(false);
    }
  };

  const testLogin = async () => {
    setTestingLogin(true);
    try {
      // First try to get CSRF token
      let csrfResult;
      try {
        const csrfResponse = await fetch('http://localhost:8000/sanctum/csrf-cookie', {
          method: 'GET',
          credentials: 'include'
        });
        csrfResult = {
          success: csrfResponse.ok,
          status: csrfResponse.status
        };
      } catch (error) {
        csrfResult = {
          success: false,
          error: error.message
        };
      }

      // Then try login with a test account
      // You might want to replace this with valid credentials
      const testData = {
        email: 'test@example.com',
        password: 'password123'
      };

      const loginResult = await testEndpoint('login', 'POST', testData);

      setTestLoginResult({
        csrf: csrfResult,
        login: loginResult
      });
    } catch (error) {
      setTestLoginResult({
        error: error.message
      });
    } finally {
      setTestingLogin(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>API Connection Test</h1>
      <p>Use this page to diagnose connection issues with the Laravel backend.</p>

      <ServerStatus />

      <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
        <button 
          onClick={testRegistration} 
          disabled={testingRegistration}
          style={{
            padding: '10px 15px',
            backgroundColor: '#4a6cf7',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: testingRegistration ? 'not-allowed' : 'pointer',
            opacity: testingRegistration ? 0.7 : 1
          }}
        >
          {testingRegistration ? 'Testing...' : 'Test Registration API'}
        </button>

        <button 
          onClick={testLogin} 
          disabled={testingLogin}
          style={{
            padding: '10px 15px',
            backgroundColor: '#4a6cf7',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: testingLogin ? 'not-allowed' : 'pointer',
            opacity: testingLogin ? 0.7 : 1
          }}
        >
          {testingLogin ? 'Testing...' : 'Test Login API'}
        </button>
      </div>

      {testRegistrationResult && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          border: '1px solid #ccc', 
          borderRadius: '5px',
          backgroundColor: testRegistrationResult.registration?.success ? '#e7f5e7' : '#ffeaea' 
        }}>
          <h3>Registration Test Results</h3>
          
          <h4>CSRF Token:</h4>
          {testRegistrationResult.csrf?.success ? (
            <p style={{ color: 'green' }}>✅ CSRF Token fetched successfully</p>
          ) : (
            <p style={{ color: 'red' }}>❌ CSRF Token error: {testRegistrationResult.csrf?.error || 'Unknown error'}</p>
          )}
          
          <h4>Registration API:</h4>
          {testRegistrationResult.registration?.success ? (
            <p style={{ color: 'green' }}>✅ Registration successful</p>
          ) : (
            <p style={{ color: 'red' }}>❌ Registration error: {
              testRegistrationResult.registration?.error || 
              (testRegistrationResult.registration?.data?.message) || 
              'Unknown error'
            }</p>
          )}
          
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '3px',
            overflow: 'auto',
            maxHeight: '200px' 
          }}>
            {JSON.stringify(testRegistrationResult, null, 2)}
          </pre>
        </div>
      )}

      {testLoginResult && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          border: '1px solid #ccc', 
          borderRadius: '5px',
          backgroundColor: testLoginResult.login?.success ? '#e7f5e7' : '#ffeaea'
        }}>
          <h3>Login Test Results</h3>
          
          <h4>CSRF Token:</h4>
          {testLoginResult.csrf?.success ? (
            <p style={{ color: 'green' }}>✅ CSRF Token fetched successfully</p>
          ) : (
            <p style={{ color: 'red' }}>❌ CSRF Token error: {testLoginResult.csrf?.error || 'Unknown error'}</p>
          )}
          
          <h4>Login API:</h4>
          {testLoginResult.login?.success ? (
            <p style={{ color: 'green' }}>✅ Login successful</p>
          ) : (
            <p style={{ color: 'red' }}>❌ Login error: {
              testLoginResult.login?.error || 
              (testLoginResult.login?.data?.message) || 
              'Unknown error'
            }</p>
          )}
          
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '3px',
            overflow: 'auto',
            maxHeight: '200px'
          }}>
            {JSON.stringify(testLoginResult, null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <h2>Troubleshooting Steps</h2>
        <ol>
          <li>
            <strong>Make sure Laravel server is running:</strong><br />
            Navigate to your Laravel project directory and run:<br />
            <code>php artisan serve</code>
          </li>
          <li>
            <strong>Check database connection:</strong><br />
            Make sure your database is running and correctly configured in the <code>.env</code> file.
          </li>
          <li>
            <strong>Run migrations:</strong><br />
            <code>php artisan migrate</code>
          </li>
          <li>
            <strong>Check Laravel logs:</strong><br />
            <code>storage/logs/laravel.log</code> for detailed error messages.
          </li>
          <li>
            <strong>CORS Configuration:</strong><br />
            Make sure your <code>config/cors.php</code> file includes the correct frontend URL.
          </li>
          <li>
            <strong>Clear Laravel cache:</strong><br />
            <code>php artisan config:clear</code><br />
            <code>php artisan cache:clear</code><br />
            <code>php artisan route:clear</code>
          </li>
        </ol>
      </div>

      <div style={{ marginTop: '20px' }}>
        <Link to="/sign-up" style={{ color: '#4a6cf7' }}>Back to Sign Up</Link>
      </div>
    </div>
  );
};

export default ApiTestPage;

import React, { useState, useEffect } from 'react';

const ServerStatus = () => {
  const [status, setStatus] = useState('Checking...');
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const checkServer = async () => {
      // Only check valid API endpoints that should exist on the backend
      const endpoints = [
        // Backend API health check endpoints
        { url: 'http://localhost:8000/health', name: 'Root Health Check' },
        { url: 'http://localhost:8000/api/status', name: 'API Status' },
        { url: 'http://localhost:8000/api/api-health-check', name: 'API Health Check' },
        { url: 'http://localhost:8000/api/debug', name: 'API Debug Endpoint' },
        { url: 'http://localhost:8000/sanctum/csrf-cookie', name: 'CSRF Token' },

        // Don't check the root URL as it might cause unnecessary 404 errors
        // { url: 'http://localhost:8000', name: 'Laravel Root' },

        // No need to check frontend URLs in a component that tests backend connectivity
        // { url: 'http://localhost:5173', name: 'React Dev Server' }
      ];

      const results = [];
      let allOk = true;

      for (const endpoint of endpoints) {
        try {
          const startTime = performance.now();

          // Using a controller to add a timeout since fetch doesn't natively support it
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3000);

          try {
            const response = await fetch(endpoint.url, {
              method: 'GET',
              cache: 'no-cache',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
              },
              credentials: 'include', // Important for CORS with credentials
              signal: controller.signal,
              mode: 'cors' // Explicitly set CORS mode
            });

            const endTime = performance.now();
            clearTimeout(timeoutId);

            let details = 'Connection successful';
            try {
              // Try to parse response as JSON if possible
              const data = await response.text();
              if (data) {
                try {
                  const jsonData = JSON.parse(data);
                  details = `Status: ${response.status}, Message: ${jsonData.message || JSON.stringify(jsonData).substring(0, 50)}`;
                } catch {
                  details = `Status: ${response.status}, Response: ${data.substring(0, 50)}`;
                }
              }
            } catch (e) {
              // Continue if we can't parse the response
            }

            results.push({
              endpoint: endpoint.name,
              status: response.ok ? 'Online' : `Error ${response.status}`,
              latency: `${(endTime - startTime).toFixed(0)}ms`,
              details: details
            });

            if (!response.ok) {
              allOk = false;
            }
          } catch (fetchError) {
            clearTimeout(timeoutId);
            throw fetchError;
          }
        } catch (error) {
          console.error(`Error checking ${endpoint.name}:`, error);
          results.push({
            endpoint: endpoint.name,
            status: 'Offline',
            latency: 'N/A',
            details: error.name === 'AbortError' ? 'Connection timed out' : error.message
          });
          allOk = false;
        }
      }

      setStatus(allOk ? 'All Systems Online' : 'Service Issues Detected');
      setDetails(results);
    };

    checkServer();
    const interval = setInterval(checkServer, 30000); // Recheck every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '15px',
      margin: '20px 0',
      backgroundColor: status === 'Checking...' ? '#f8f9fa'
        : status === 'All Systems Online' ? '#e7f5e7'
        : '#ffeaea'
    }}>
      <h3 style={{
        margin: '0 0 15px 0',
        color: status === 'Checking...' ? '#6c757d'
          : status === 'All Systems Online' ? '#28a745'
          : '#dc3545'
      }}>
        Backend Server Status: {status}
      </h3>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #dee2e6' }}>
              <th style={{ padding: '8px', textAlign: 'left' }}>Endpoint</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Status</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Latency</th>
              <th style={{ padding: '8px', textAlign: 'left' }}>Details</th>
            </tr>
          </thead>
          <tbody>
            {details.map((item, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #dee2e6' }}>
                <td style={{ padding: '8px' }}>{item.endpoint}</td>
                <td style={{ padding: '8px', color: item.status === 'Online' ? '#28a745' : '#dc3545' }}>
                  {item.status}
                </td>
                <td style={{ padding: '8px' }}>{item.latency}</td>
                <td style={{ padding: '8px', maxWidth: '300px', overflowWrap: 'break-word' }}>{item.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: '15px',
        padding: '10px',
        backgroundColor: '#f8f9fa',
        borderRadius: '4px',
        fontSize: '0.9em'
      }}>
        <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Troubleshooting Steps:</p>
        <ol style={{ margin: '0', paddingLeft: '20px' }}>
          <li>Make sure Laravel server is running: <code>cd eventman-apis && php artisan serve</code></li>
          <li>Check that the API endpoints exist in <code>routes/api.php</code> (or create them)</li>
          <li>Verify CORS is configured correctly in <code>config/cors.php</code></li>
          <li>Make sure database connection details are correct in <code>.env</code> file</li>
          <li>Run pending migrations: <code>php artisan migrate</code></li>
          <li>Check Laravel logs for errors: <code>storage/logs/laravel.log</code></li>
        </ol>
      </div>

      {status !== 'All Systems Online' && (
        <div style={{
          marginTop: '10px',
          padding: '10px',
          backgroundColor: '#fff3cd',
          borderRadius: '4px',
          borderLeft: '4px solid #ffc107',
          fontSize: '0.9em'
        }}>
          <p style={{ margin: '0 0 5px 0', fontWeight: 'bold' }}>Quick Fix:</p>
          <p style={{ margin: '0' }}>
            Add these routes to <code>routes/api.php</code> in your Laravel project:
          </p>
          <pre style={{
            backgroundColor: '#f8f9fa',
            padding: '8px',
            borderRadius: '4px',
            fontSize: '0.8em',
            overflow: 'auto',
            margin: '5px 0'
          }}>
{`// Debug endpoints
Route::get('/debug', function(Request $request) {
    return response()->json([
        'message' => 'API is running',
        'timestamp' => now()->toIso8601String(),
        'status' => 'ok'
    ]);
});

Route::get('/api-health-check', function() {
    return response()->json([
        'status' => 'healthy',
        'version' => app()->version(),
        'php' => PHP_VERSION
    ]);
});`}
          </pre>
          <p style={{ margin: '5px 0 0 0' }}>Don't forget to add <code>use Illuminate\\Http\\Request;</code> at the top of the file.</p>
        </div>
      )}
    </div>
  );
};

export default ServerStatus;

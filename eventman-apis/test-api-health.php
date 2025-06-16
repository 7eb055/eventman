<?php
/**
 * API Health Check Test Script
 * 
 * Run this script from the command line to test all health check endpoints:
 * php test-api-health.php
 */

$baseUrl = 'http://localhost:8000';
$endpoints = [
    // Web routes
    '/health',
    '/api-health-check',
    
    // API routes
    '/api/status',
    '/api/debug',
    '/api/api-health-check',
    '/api/echo',
];

echo "===== API Health Check Test =====\n";
echo "Testing endpoints on $baseUrl\n";
echo "================================\n\n";

$allSuccess = true;
$results = [];

foreach ($endpoints as $endpoint) {
    echo "Testing $endpoint... ";
    
    // Use cURL to make the request
    $ch = curl_init("$baseUrl$endpoint");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    
    // Set method to POST for echo endpoint
    if ($endpoint === '/api/echo') {
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['test' => 'data']));
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    }
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    if ($error) {
        echo "ERROR: $error\n";
        $allSuccess = false;
        $results[$endpoint] = [
            'success' => false,
            'error' => $error,
        ];
    } else if ($httpCode >= 200 && $httpCode < 300) {
        echo "OK ($httpCode)\n";
        $results[$endpoint] = [
            'success' => true,
            'status_code' => $httpCode,
            'response' => json_decode($response, true)
        ];
    } else {
        echo "FAILED ($httpCode)\n";
        $allSuccess = false;
        $results[$endpoint] = [
            'success' => false,
            'status_code' => $httpCode,
            'response' => $response
        ];
    }
}

echo "\n===== Test Results =====\n";
echo $allSuccess ? "✅ All endpoints are working correctly!\n" : "❌ Some endpoints failed!\n";
echo "=======================\n\n";

echo "Detailed Results:\n";
foreach ($results as $endpoint => $result) {
    echo "\n$endpoint: " . ($result['success'] ? "✅ Success" : "❌ Failed") . "\n";
    
    if (isset($result['status_code'])) {
        echo "  Status: " . $result['status_code'] . "\n";
    }
    
    if (isset($result['error'])) {
        echo "  Error: " . $result['error'] . "\n";
    }
    
    if (isset($result['response']) && is_array($result['response'])) {
        echo "  Response: " . json_encode($result['response'], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES) . "\n";
    }
}

const API_URL = 'http://localhost:8000/api';

export const testConnection = async () => {
    try {
        const response = await fetch(`${API_URL}/test`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

export const sendTestData = async (data) => {
  try {
    const response = await fetch(`${API_URL}/test`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
import React, { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startConversation = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/createConversation', {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok && data.conversation_url) {
        window.location.href = data.conversation_url;
      } else {
        throw new Error(data.error || 'Failed to create conversation.');
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Start a Tavus Conversation</h1>
      <button onClick={startConversation} disabled={loading}>
        {loading ? 'Starting...' : 'Start Conversation'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;

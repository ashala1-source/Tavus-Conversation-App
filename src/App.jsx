import React, { useState } from 'react';

const TAVUS_API_KEY = "fa999107b41342fa8bc5255cc8c9dfe6";
const REPLICA_ID = "rf4703150052";
const PERSONA_ID = "pa6975faa9dc";

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startConversation = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.tavus.io/v2/conversations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": TAVUS_API_KEY,
        },
        body: JSON.stringify({
          replica_id: REPLICA_ID,
          persona_id: PERSONA_ID,
        }),
      });

      const data = await response.json();

      if (response.ok && data.conversation_url) {
        window.location.href = data.conversation_url;
      } else {
        throw new Error(data.message || "Failed to create conversation.");
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
        {loading ? "Starting..." : "Start Conversation"}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;

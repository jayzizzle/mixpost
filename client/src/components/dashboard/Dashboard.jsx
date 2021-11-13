import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';

export const Dashboard = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState('');
  const [tempQuote, setTempQuote] = useState('');

  async function populateQuote() {
    const req = await fetch('/api/quote', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });

    const data = await req.json();
    if (data.status === 'ok') {
      setQuote(data.quote);
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
      } else {
        populateQuote();
      }
    }
  }, []);

  async function updateQuote(e) {
    e.preventDefault();
    const req = await fetch('/api/quote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({
        quote: tempQuote,
      }),
    });

    const data = await req.json();
    if (data.status === 'ok') {
      setQuote(tempQuote);
      setTempQuote('');
    } else {
      alert(data.error);
    }
  }

  return (
    <div>
      <h1>Your Quote: {quote || 'No Quote Found'}</h1>
      <form onSubmit={updateQuote}>
        <input
          type='text'
          placeholder='Quote'
          value={tempQuote}
          onChange={(e) => setTempQuote(e.target.value)}
        />
        <button>Update Quote</button>
      </form>
    </div>
  );
};

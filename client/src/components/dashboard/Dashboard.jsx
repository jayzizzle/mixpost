import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';

export const Dashboard = () => {
  const history = useNavigate();

  async function populateQuote() {
    const req = await fetch('/api/quote', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    });

    const data = req.json();
    console.log(data);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token);
      if (!user) {
        localStorage.removeItem('token');
        history.replace('/login');
      } else {
      }
    }
  }, []);

  return (
    <div>
      <h1>Hello World!</h1>
    </div>
  );
};

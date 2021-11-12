import { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function loginUser(e) {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      alert('Login Successful');
      window.location.href = '/dashboard';
    } else {
      alert('Invalid Username/Password');
    }
  }

  return (
    <div>
      <h1>Log In</h1>
      <form onSubmit={loginUser}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type='text'
          placeholder='Username'
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          placeholder='Password'
        />
        <br />
        <button>Log In</button>
      </form>
    </div>
  );
}

export default Login;

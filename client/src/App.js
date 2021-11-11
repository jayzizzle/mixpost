import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <h1>Register</h1>
      <form>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type='text'
          placeholder='Username'
        />
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='text'
          placeholder='Email'
        />
        <br />
        <input
          value={password}
          onChange={(e) => setEmail(e.target.value)}
          type='password'
          placeholder='Password'
        />
        <br />
        <button>Register</button>
      </form>
    </div>
  );
}

export default App;

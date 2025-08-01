import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const handleSearch = () => {
    axios.get(`https://api.github.com/users/${username}`)
      .then((res) => {
        setUserData(res.data);
      })
      .catch(() => {
        setUserData(null);
      });
  }

  return (
    <>
      <h1 className="title">GitHub Search</h1>
      <input
        type="text"
        className="input-text"
        placeholder="Enter Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button className="click" onClick={handleSearch}>Search</button>

      {userData && (
        <div style={{ marginTop: '20px' }}>
          <img src={userData.avatar_url} width="100" style={{ borderRadius: '50%' }} />
          <p style={{ color: 'white', fontWeight: 'bold' }}>{userData.login}</p>
        </div>
      )}
    </>
  );
}

export default App

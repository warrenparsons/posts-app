import { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then(response => setPosts(response.data))
      .catch(err => setError(err.message));
  }, []);

  return (
    <div className="App">
      <h1>Posts</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {posts.length > 0 ? (
        <ul>
          {posts.map(post => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

import { useState, useEffect } from "react";
import axios from 'axios';
import "./App.css";

// Define the Post type
interface Post {
  id: number;
  title: string;
  body: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
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

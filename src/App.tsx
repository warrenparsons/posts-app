import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Define the Post type
interface Post {
  id: number;
  title: string;
  body: string;
}

function Post({ post }: { post: Post }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li onClick={toggleExpand} className="post-item">
      <h3>{post.title}</h3>
      <p className={`post-body ${isExpanded ? "expanded" : "collapsed"}`}>
        {post.body}
      </p>
    </li>
  );
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Post[]>("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setPosts(response.data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="App">
      <h1>Posts</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;

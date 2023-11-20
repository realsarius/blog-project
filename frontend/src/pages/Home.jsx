import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/posts")
      .then((response) => {
        setPosts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const renderPosts = (postContent) => {
    const sanitizedPostContent = DOMPurify.sanitize(postContent);

    return sanitizedPostContent;
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 max-w-7xl">
      <h1 className="text-3xl font-semibold mb-8">My Blog</h1>

      {/* Loop through blog posts */}
      {posts.map((post, index) => (
        <div key={index} className="bg-white p-4 mb-8 rounded-lg shadow-md">
          <h1 className="text-xl font-semibold mb-2">{post.title}</h1>
          <p
            dangerouslySetInnerHTML={{ __html: renderPosts(post.content) }}
            className="text-gray-700 mb-4"
          />

          {/* Display tags */}
          <div className="flex">
            {post.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;

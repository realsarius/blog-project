import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import {
  renderDates,
  renderPostsLimitedCharacters,
} from "../components/util/util";

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

  return (
    <div className="bg-gray-100 min-h-screen max-w-7xl">
      {/* <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-semibold text-center">My Blog</h1>
        <Link to={"/posts/create"}>
          <MdOutlineAddBox className="text-4xl text-sky-800" />
        </Link>
      </div> */}

      <Navigation />

      {/* Loop through blog posts */}
      {loading ? (
        <Spinner />
      ) : (
        posts.map((post, index) => (
          <div
            key={index}
            className="bg-white p-6 px-8 mb-8 rounded-lg shadow-md"
          >
            <div className="text-gray-600 text-xs uppercase tracking-widest">
              {renderDates(post.createdAt)}
            </div>
            <Link to={`/posts/details/${post._id}`} className="flex gap-2">
              <h1 className="text-3xl text-gray-900 uppercase">{post.title}</h1>
            </Link>

            <p
              dangerouslySetInnerHTML={{
                __html: renderPostsLimitedCharacters(post.content),
              }}
              className="text-gray-900 mb-4"
            />

            {/* Display tags */}
            <div className="flex justify-between">
              <div className="flex items-center italic text-gray-600">
                Tags:
                {post.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="px-2 py-1 mr-2 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              {/* Admin controls */}
              <div className="flex gap-4 justify-center">
                <Link to={`/posts/details/${post._id}`} className="flex gap-2">
                  <BsInfoCircle
                    className="text-2xl text-green-800"
                    aria-label="info-button"
                  />
                  Info
                </Link>
                <Link to={`/posts/edit/${post._id}`} className="flex gap-2">
                  <AiOutlineEdit
                    className="text-2xl text-yellow-600"
                    aria-label="edit-button"
                  />
                  Edit
                </Link>
                <Link to={`/posts/delete/${post._id}`} className="flex gap-2">
                  <MdOutlineDelete
                    className="text-2xl text-red-600"
                    aria-label="delete-button"
                  />
                  Delete
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;

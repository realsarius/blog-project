import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import Navigation from "../components/Navigation";
import { renderDates, renderTags } from "../components/util/util";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const ShowPost = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/posts/${id}`)
      .then((response) => {
        setPost(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Navigation />
      {/* <BackButton /> */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="bg-gray-100 min-h-screen max-w-7xl">
          <div
            key={post._id}
            className="bg-white p-6 px-8 mb-8 rounded-lg shadow-md"
          >
            <div className="text-gray-600 text-xs uppercase tracking-widest">
              {post.createdAt === undefined
                ? "undefined"
                : renderDates(post.createdAt)}
            </div>
            <h1 className="text-3xl text-gray-900 uppercase">{post.title}</h1>

            <p
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="text-gray-900 mb-4"
            />

            {/* Display tags */}
            <div className="flex justify-between">
              <div className="flex items-center italic text-gray-600">
                Tags:
                {post.tags === undefined ? "Loading" : renderTags(post.tags)}
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
        </div>
      )}
    </div>
  );
};

export default ShowPost;

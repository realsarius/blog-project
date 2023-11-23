import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  renderDates,
  renderPostsLimitedCharacters,
  renderTags,
} from "../components/util/util";
import PropTypes from "prop-types";
import BackButton from "./BackButton";

const Posts = ({ posts }) => {
  const checkPostOrPosts = () => {
    if (posts.constructor == Object) {
      return (
        <div className="bg-gray-100 min-h-screen max-w-7xl">
          <div
            key={posts._id}
            className="bg-white p-6 px-8 mb-8 rounded-lg shadow-md"
          >
            <div className="text-gray-600 text-xs uppercase tracking-widest">
              {posts.createdAt === undefined
                ? "undefined"
                : renderDates(posts.createdAt)}
            </div>
            <div className="flex items-center gap-4">
              <BackButton />
              <h1 className="text-3xl text-gray-900 uppercase">
                {posts.title}
              </h1>
            </div>

            <p
              dangerouslySetInnerHTML={{ __html: posts.content }}
              className="text-gray-900 mb-4"
            />

            {/* Display tags */}
            <div className="flex justify-between">
              <div className="flex items-center italic text-gray-600">
                Tags:
                {posts.tags === undefined ? "Loading" : renderTags(posts.tags)}
              </div>
              {/* Admin controls */}
              <div className="flex gap-4 justify-center">
                <Link to={`/posts/details/${posts._id}`} className="flex gap-2">
                  <BsInfoCircle
                    className="text-2xl text-green-800"
                    aria-label="info-button"
                  />
                  Info
                </Link>
                <Link to={`/posts/edit/${posts._id}`} className="flex gap-2">
                  <AiOutlineEdit
                    className="text-2xl text-yellow-600"
                    aria-label="edit-button"
                  />
                  Edit
                </Link>
                <Link to={`/posts/delete/${posts._id}`} className="flex gap-2">
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
      );
    }
    if (posts.constructor == Array) {
      return posts.map((post, index) => (
        <div
          key={index}
          className="bg-white p-6 px-8 mb-8 rounded-lg shadow-md"
        >
          <div className="text-gray-600 text-xs uppercase tracking-widest flex gap-4">
            <p className="m-0">
              {post.createdAt === undefined
                ? "undefined"
                : renderDates(post.createdAt)}
            </p>
            |
            <p className="m-0">
              {post.author === undefined ? "undefined" : post.author}
            </p>
          </div>
          <Link to={`/posts/${post._id}`} className="flex gap-2">
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
              {post.tags === undefined ? "Loading" : renderTags(post.tags)}
            </div>
            {/* Admin controls */}
            {/* <div className="flex gap-4 justify-center">
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
            </div> */}
          </div>
        </div>
      ));
    }
  };

  return (
    <>{checkPostOrPosts() === undefined ? "Loading" : checkPostOrPosts()}</>
  );
};

Posts.propTypes = {
  posts: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

export default Posts;

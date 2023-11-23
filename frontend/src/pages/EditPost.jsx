import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  renderPost,
  renderTags,
  quillModules,
  quillFormats,
} from "../components/util/util";
import { useSnackbar } from "notistack";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const classes = {
    container: "p-4 min-h-screen w-screen max-w-7xl",
    label: "text-xl mr-4 text-gray-700",
    button: "py-2 px-6 bg-gray-800 text-gray-100 font-bold w-fit",
    input: "border-2 border-gray-500 px-4 py-2 w-full",
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/posts/${id}`)
      .then((response) => {
        setTitle(response.data.data.title);
        setAuthor(response.data.data.author);
        setContent(response.data.data.content);
        setTags(response.data.data.tags);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert("An error happened. Please check the console");
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      content,
      tags: renderTags(tags),
    };

    setLoading(true);
    axios
      .put(`http://localhost:5555/posts/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Post edited successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // alert("An error happened. Please check the console");
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className={classes.container}>
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="text-3xl my-4">Edit Post</h1>
      </div>
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full p-4 mx-auto">
        <div className="flex gap-4 justify-between w-full">
          <div className="my-4 w-6/12">
            <label htmlFor="postTitle" className={classes.label}>
              Title
            </label>
            <input
              id="postTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={classes.input}
            />
          </div>
          <div className="my-4 w-6/12">
            <label htmlFor="postAuthor" className={classes.label}>
              Author
            </label>
            <input
              id="postAuthor"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className={classes.input}
            />
          </div>
        </div>
        <div className="my-4">
          <label htmlFor="Content" className={classes.label}>
            Content
          </label>
          <ReactQuill
            theme="snow"
            modules={quillModules}
            value={content}
            onChange={setContent}
            formats={quillFormats}
          />
          <p>Preview</p>
          <p
            dangerouslySetInnerHTML={{
              __html: renderPost(content),
            }}
            className="text-gray-900 mb-4"
          />
        </div>
        {loading ? <Spinner /> : ""}
        <div className="my-4 w-full">
          <label htmlFor="postTags" className={classes.label}>
            Tags
            <span className="ml-4 text-sm">(Seperate it with comma , )</span>
          </label>
          <input
            id="postTags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className={classes.input}
          />
        </div>
        <button className={classes.button} onClick={handleEditBook}>
          Post
        </button>
      </div>
    </div>
  );
};

export default EditPost;

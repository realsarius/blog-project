import { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { renderPost } from "../components/util/util";
import Navigation from "../components/Navigation";
import { useSnackbar } from "notistack";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const quillModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const quillFormats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    setLoading(true);
    axios
      .post("http://localhost:5555/posts", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Post created Successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // alert("An error happened. Please check the console");
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  console.log(content);

  return (
    <div className="min-h-screen w-screen max-w-7xl">
      <Navigation />
      <div className="flex items-center gap-4">
        <BackButton />
        <h1 className="text-3xl my-4">Create Post</h1>
      </div>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-full p-4 mx-auto">
        <div className="flex gap-4 justify-between w-full">
          <div className="my-4 w-6/12">
            <label htmlFor="postTitle" className="text-xl mr-4 text-gray-700">
              Title
            </label>
            <input
              id="postTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
          <div className="my-4 w-6/12">
            <label htmlFor="postAuthor" className="text-xl mr-4 text-gray-700">
              Author
            </label>
            <input
              id="postAuthor"
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="border-2 border-gray-500 px-4 py-2 w-full"
            />
          </div>
        </div>
        <div className="my-4">
          <label htmlFor="Content" className="text-xl mr-4 text-gray-700">
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
        <div className="my-4 w-full">
          <label htmlFor="postTags" className="text-xl mr-4 text-gray-700">
            Tags
          </label>
          <input
            id="postTags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button
          className="py-2 px-6 bg-gray-800 text-gray-100 font-bold w-fit"
          onClick={handleSaveBook}
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;

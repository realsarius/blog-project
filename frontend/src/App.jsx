import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import ShowPost from "./pages/ShowPost";
import DeletePost from "./pages/DeletePost";
import EditPost from "./pages/EditPost";
import About from "./pages/About";

function App() {
  // const [data, setData] = useState({});

  // useEffect(() => {
  //   const fecthData = async () => {
  //     const data = await fetch("http://localhost:5555/posts");

  //     const result = await data.json();

  //     setData(result);
  //   };

  //   fecthData();
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:id" element={<ShowPost />} />
      <Route path="/posts/create" element={<CreatePost />} />
      <Route path="/posts/edit/:id" element={<EditPost />} />
      <Route path="/posts/delete/:id" element={<DeletePost />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;

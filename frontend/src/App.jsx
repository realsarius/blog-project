import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fecthData = async () => {
      const data = await fetch("http://localhost:5555/posts");

      const result = await data.json();

      setData(result);
    };

    fecthData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;

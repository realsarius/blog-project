import { useEffect, useState } from "react";
import "./App.css";

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
    <>
      <h1>asd</h1>
    </>
  );
}

export default App;

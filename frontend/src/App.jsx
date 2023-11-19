import { useEffect, useState } from "react";

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
      <h1 className="font-bold text-3xl text-red-500 text-center mt-5">asd</h1>
    </>
  );
}

export default App;

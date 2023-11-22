import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import Navigation from "../components/Navigation";
import Posts from "../components/Posts";

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
      <Navigation />
      <div className="w-full flex gap-4">
        <div className="w-9/12">
          {/* Loop through blog posts */}
          {loading ? <Spinner /> : <Posts posts={posts} />}
        </div>
        <div className="w-3/12">Sidebar</div>
      </div>
    </div>
  );
};

export default Home;

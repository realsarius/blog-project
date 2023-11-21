import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Navigation from "../components/Navigation";
import Posts from "../components/Posts";

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
      {loading ? <Spinner /> : <Posts posts={post} />}
    </div>
  );
};

export default ShowPost;

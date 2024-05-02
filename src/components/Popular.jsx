import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
const Popular = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState();
  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular`
        );
        // const response2 = await api.get(
        //   `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        // );
        // console.log(response2);
        if (response.status === 200) {
          setData(response.data.blogs);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(error.message);
      }
    };
    fetchPost();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div> Error in fatching favourite blogs {error?.message}</div>;
  }
  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>

      <ul className="space-y-5 my-5">
        {data && data.length ? (
          data.map((d) => (
            <li key={d.id}>
              <Link to={`/blogDetails/${d.id}`}>
                <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                  {d.title}
                </h3>
              </Link>

              <p className="text-slate-600 text-sm">
                by
                <Link to={`/profile/${d.author.id}`}>
                  {" "}
                  {d.author.firstName} {d.author.lastName}{" "}
                </Link>
                <span>·</span> {d.likes.length} Likes
              </p>
            </li>
          ))
        ) : (
          <p>No Popular Blogs Found</p>
        )}
      </ul>
    </div>
  );
};

export default Popular;

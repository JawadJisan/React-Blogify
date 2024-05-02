import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";
const Favourite = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [logedInData, setLogedInData] = useState();
  const { api } = useAxios();

  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      try {
        // const response = await api.get(
        //   `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
        // );
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
        );
        console.log(response);
        if (response.status === 200) {
          setLogedInData(response.data.blogs);
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
        Your Favourites ❤️
      </h3>

      {!auth?.user && (
        <p className="text-center font-bold text-xl">
          Login First to see Your Favourite Blogs
        </p>
      )}

      <ul className="space-y-5 my-5">
        {auth?.user && logedInData?.length ? (
          logedInData.map((data) => (
            <li key={data.id}>
              <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
                How to Auto Deploy a Next.js App on Ubuntu from GitHub
              </h3>
              <p className="text-slate-600 text-sm">
                #tailwindcss, #server, #ubuntu
              </p>
            </li>
          ))
        ) : (
          <p className="text-center font-bold text-xl">
            No Favourite Blogs Found
          </p>
        )}
      </ul>
    </div>
  );
};

export default Favourite;

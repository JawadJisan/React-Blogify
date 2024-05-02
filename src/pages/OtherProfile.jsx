import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

import { formatDate } from "../utils";
import { useParams } from "react-router-dom";

const OtherProfile = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState();
  const { api } = useAxios();

  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${id}`
        );
        console.log(response);
        if (response.status === 200) {
          setData(response.data);
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
    return <div> Error in fatching profile data</div>;
  }

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        {/* <!-- profile info --> */}
        <div className="flex flex-col items-center py-8 text-center">
          <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
              <img
                className="max-w-full rounded-full"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
                  data?.avatar
                }`}
                alt={data?.firstName.substring(0, 1)}
              />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              {" "}
              {data?.firstName} {data?.lastName}{" "}
            </h3>
            <p className="leading-[231%] lg:text-lg">{data?.email}</p>
          </div>

          <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
              <p className="leading-[188%] text-gray-400 lg:text-lg">
                {data?.bio}
              </p>
            </div>
          </div>
          <div className="w-3/4 border-b border-[#3F3F3F] py-6 lg:py-8"></div>
        </div>
        {/* <!-- end profile info --> */}

        <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">Your Blogs</h4>
        <div className="my-6 space-y-4">
          {data?.blogs && data.blogs.length ? (
            data.blogs.map((blog) => (
              <div key={blog.id} className="blog-card">
                <img
                  className="blog-thumb"
                  src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
                    blog.thumbnail
                  }`}
                  alt="Thumbnail"
                />
                <div className="mt-2">
                  <h3 className="text-slate-300 text-xl lg:text-2xl">
                    {blog.title}
                  </h3>
                  <p className="mb-6 text-base text-slate-500 mt-1">
                    {blog.content.substring(0, 200)}
                  </p>

                  {/* <!-- Meta Informations --> */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center capitalize space-x-2">
                      <div className="avater-img bg-indigo-600 text-white">
                        <span className="">
                          {blog.author?.firstName.substring(0, 1)}
                        </span>
                      </div>

                      <div>
                        <h5 className="text-slate-500 text-sm">
                          {" "}
                          {blog.author.firstName} {blog.author.lastName}{" "}
                        </h5>
                        <div className="flex items-center text-xs text-slate-700">
                          <span> {formatDate(blog.createdAt)} </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm px-2 py-1 text-slate-700">
                      <span>{blog.likes.length} Likes</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No Blogs Found of The User </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default OtherProfile;

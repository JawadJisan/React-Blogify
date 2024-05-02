import { useAuth } from "../hooks/useAuth";
import { useEffect, useState, useRef } from "react";
import useAxios from "../hooks/useAxios";
import edit from "../assets/icons/edit.svg";
import check from "../assets/icons/check.svg";
import { formatDate } from "../utils";

const Profile = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState();
  const { api } = useAxios();
  const fileUploaderRef = useRef();
  const [bio, setBio] = useState(data?.bio);
  const [editMode, setEditMode] = useState(false);

  const handleImageUpload = (event) => {
    event.preventDefault();

    fileUploaderRef.current.addEventListener("change", updateImageDisplay);
    fileUploaderRef.current.click();
  };

  const updateImageDisplay = async () => {
    try {
      const formData = new FormData();
      for (const file of fileUploaderRef.current.files) {
        formData.append("avatar", file);
      }

      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile/avatar`,
        formData
      );
      if (response.status === 200) {
      }
    } catch (error) {}
  };

  const handleBioEdit = async () => {
    // dispatch({ type: actions.profile.DATA_FETCHING });

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/profile`,
        { bio }
      );

      if (response.status === 200) {
        // dispatch({
        //   type: actions.profile.USER_DATA_EDITED,
        //   data: response.data,
        // });
      }
      setEditMode(false);
    } catch (err) {
      // dispatch({
      //   type: actions.profile.DATA_FETCH_ERROR,
      //   error: err.message,
      // });
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchPost = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/profile/${auth?.user?.id}`
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
    return <div> Error in fatching data {error?.message}</div>;
  }

  return (
    <main className="mx-auto max-w-[1020px] py-8">
      <div className="container">
        {/* <!-- profile info --> */}
        <div className="flex flex-col items-center py-8 text-center">
          {/* <!-- profile image --> */}
          <div className="relative mb-8 max-h-[180px] max-w-[180px] h-[120px] w-[120px] rounded-full lg:mb-11 lg:max-h-[218px] lg:max-w-[218px]">
            <div className="w-full h-full bg-orange-600 text-white grid place-items-center text-5xl rounded-full">
              {/* <!-- User's first name initial --> */}
              {/* <span className="">{data?.firstName.substring(0, 1)}</span> */}
              <img
                className="max-w-full rounded-full"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
                  data?.avatar
                }`}
                alt={data?.firstName.substring(0, 1)}
              />
            </div>

            <form id="form" encType="multipart/form-data">
              <button
                onClick={handleImageUpload}
                type="submit"
                className="grid place-items-center absolute bottom-0 right-0 h-7 w-7 rounded-full bg-slate-700 hover:bg-slate-700/80"
              >
                <img src={edit} alt="Edit" />
              </button>
              <input id="file" type="file" ref={fileUploaderRef} hidden />
            </form>
          </div>
          {/* <!-- name , email --> */}
          <div>
            <h3 className="text-2xl font-semibold text-white lg:text-[28px]">
              {" "}
              {data?.firstName} {data?.lastName}{" "}
            </h3>
            <p className="leading-[231%] lg:text-lg">{data?.email}</p>
          </div>

          {/* <!-- bio --> */}
          <div className="mt-4 flex items-start gap-2 lg:mt-6">
            <div className="flex-1">
              {!editMode ? (
                <p className="leading-[188%] text-gray-400 lg:text-lg">
                  {data?.bio}
                </p>
              ) : (
                <textarea
                  className='p-2 className="leading-[188%] text-gray-600 lg:text-lg rounded-md'
                  value={bio}
                  rows={4}
                  cols={55}
                  onChange={(e) => setBio(e.target.value)}
                />
              )}
            </div>
            {!editMode ? (
              <button
                className="flex-center h-7 w-7 rounded-full"
                onClick={() => setEditMode(true)}
              >
                <img src={edit} alt="Edit" />
              </button>
            ) : (
              <button
                className="flex-center h-7 w-7 rounded-full"
                onClick={handleBioEdit}
              >
                <img src={check} alt="Check" />
              </button>
            )}
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
            <p>No Blogs Found</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Profile;

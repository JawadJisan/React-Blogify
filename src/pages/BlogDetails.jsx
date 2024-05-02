/* eslint-disable react/no-unescaped-entities */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import like from "../assets/icons/like.svg";
import comment from "../assets/icons/comment.svg";
import heart from "../assets/icons/heart.svg";
import useAxios from "../hooks/useAxios";
import { formatDate } from "../utils";
import { useAuth } from "../hooks/useAuth";

const BlogDetails = () => {
  const { id } = useParams();
  const [commentInput, setCommentInput] = useState("");
  const [liked, setLiked] = useState(false);
  const [favorited, setFavorited] = useState(false);
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
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${id}`
        );
        // const response = await api.get(`http://localhost:3000/blogs/${id}`);
        // console.log(response);
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
  }, [id]);

  console.log(data);

  const handleCommentChange = (event) => {
    setCommentInput(event.target.value);
  };

  const postComment = async (e) => {
    e.preventDefault();
    console.log("clicked the ");
    if (!auth.user) {
      alert("Please log in to comment.");
      return;
    }
    try {
      setLoading(true);
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${id}/comment`,
        {
          content: commentInput,
        }
      );
      console.log(response.data.comments, "resdata");
      // Update the comments state with the new comment
      setData((prevData) => ({
        ...prevData,
        comments: [...prevData.comments, response.data],
      }));
    } catch (error) {
      console.log(error);
      setError(error.message || "Error posting comment");
    }
    setLoading(false);
  };

  const handleLike = async () => {
    try {
      // Send API request to toggle like status
      // Update liked state based on API response
    } catch (error) {
      setError(error.message || "Error liking post");
    }
  };

  const handleFavorite = async () => {
    try {
      // Send API request to toggle favorite status
      // Update favorited state based on API response
    } catch (error) {
      setError(error.message || "Error favoriting post");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  // if (error) {
  //   return <div> Error in fatching blog {error?.message}</div>;
  // }

  return (
    <>
      {data && (
        <main>
          {/* <!-- Begin Blogs --> */}
          <section>
            <div className="container text-center py-8">
              <h1 className="font-bold text-3xl md:text-5xl">{data.title}</h1>
              <div className="flex justify-center items-center my-4 gap-4">
                <div className="flex items-center capitalize space-x-2">
                  <div className="avater-img bg-indigo-600 text-white">
                    <span className="">S</span>
                  </div>
                  <h5 className="text-slate-500 text-sm">
                    {" "}
                    {data.author.firstName} {data.author.lastName}{" "}
                  </h5>
                </div>
                <span className="text-sm text-slate-700 dot">
                  {formatDate(data.createdAt)}
                </span>

                <span className="text-sm text-slate-700 dot">
                  {data.likes.length} Likes
                </span>
              </div>
              <img
                className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
                  data.thumbnail
                }`}
                alt="Thumbnail"
              />

              {/* <!-- Tags --> */}
              <ul className="tags">
                {data.tags.split(",").map((d, index) => (
                  <li key={index}>{d}</li>
                ))}
              </ul>

              {/* <!-- Content --> */}
              <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
                {data.content}
              </div>
            </div>
          </section>
          {/* <!-- End Blogs --> */}

          {/* <!-- Begin Comments --> */}
          <section id="comments">
            <div className="mx-auto w-full md:w-10/12 container">
              <h2 className="text-3xl font-bold my-8">
                Comments ({data.comments.length})
              </h2>
              <div className="flex items -center space-x-4">
                <div className="avater-img bg-indigo-600 text-white">
                  <span className="">S</span>
                </div>
                <div className="w-full">
                  <textarea
                    onChange={handleCommentChange}
                    value={commentInput}
                    className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
                    placeholder="Write a comment"
                  ></textarea>
                  <div className="flex justify-end mt-4">
                    <button
                      // type="submit"
                      // onSubmit={postComment}
                      onClick={postComment}
                      className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>

              {/* <!-- Comment One --> */}
              {data.comments.map((c) => (
                <div key={c.id} className="flex items-start space-x-4 my-8">
                  <div className="avater-img bg-orange-600 text-white">
                    <span className="">S</span>
                  </div>
                  <div className="w-full">
                    <h5 className="text-slate -500 font-bold">
                      {" "}
                      {c.author?.firstName} {c.author?.lastName}{" "}
                    </h5>
                    <p className="text-slate-300">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
      {/* <!-- End main --> */}

      {/* <!-- Floating Actions--> */}
      <div className="floating-action">
        <ul className="floating-action-menus">
          <li>
            <img src={like} alt="like" />
            <span>10</span>
          </li>

          <li>
            {/* <!-- There is heart-filled.svg in the icons folder --> */}
            <img src={heart} alt="Favourite" />
          </li>
          <a href="#comments">
            <li>
              <img src={comment} alt="Comments" />
              <span>3</span>
            </li>
          </a>
        </ul>
      </div>
    </>
  );
};

export default BlogDetails;

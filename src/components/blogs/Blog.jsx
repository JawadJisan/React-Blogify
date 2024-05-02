/* eslint-disable react/prop-types */
import more from "../../assets/icons/3dots.svg";
import edit from "../../assets/icons/edit.svg";
import deletebtn from "../../assets/icons/delete.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { formatDate } from "../../utils";
import { useAuth } from "../../hooks/useAuth";

const Blog = ({ blog }) => {
  const { auth } = useAuth();
  const { title, content, thumbnail, author, likes, id, createdAt } = blog;
  const [open, setOpen] = useState(false);

  return (
    <div className="blog-card">
      <img
        className="blog-thumb"
        src={`${
          import.meta.env.VITE_SERVER_BASE_URL
        }/uploads/blog/${thumbnail}`}
        alt="Blog Thumbnail"
      />
      <div className="mt-2 relative">
        <Link to={`/blogDetails/${id}`}>
          <h3 className="text-slate-300 text-xl lg:text-2xl">
            <Link to={`/blogDetails/${id}`}>{title} </Link>
          </h3>
        </Link>
        <p className="mb-6 text-base text-slate-500 mt-1">{content}</p>

        {/* <!-- Meta Informations --> */}
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <div className="avater-img bg-indigo-600 text-white">
              <span className="">{author?.firstName.substring(0, 1)}</span>
              {/* <img
                className="max-w-full rounded-full"
                src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
                  author?.avatar
                }`}
                alt={author?.firstName.substring(0, 1)}
              /> */}
            </div>

            <div>
              <h5 className="text-slate-500 text-sm">
                <Link to={`/profile/${author.id}`}>
                  {" "}
                  {author.firstName} {author.lastName}{" "}
                </Link>
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span> {formatDate(createdAt)} </span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-slate-700">
            <span>{likes.length} Likes</span>
          </div>
        </div>

        {/* <!-- action dot --> */}
        <div className="absolute right-0 top-0">
          {auth?.user?.id === author?.id && (
            <button onClick={() => setOpen(!open)}>
              <img src={more} alt="3dots of Action" />
            </button>
          )}

          {/* <!-- Action Menus Popup --> */}
          {open && (
            <div className="action-modal-container">
              <button className="action-menu-item hover:text-lwsGreen">
                <img src={edit} alt="Edit" />
                Edit
              </button>
              <button className="action-menu-item hover:text-red-500">
                <img src={deletebtn} alt="Delete" />
                Delete
              </button>
            </div>
          )}
        </div>
        {/* <!-- action dot ends --> */}
      </div>
    </div>
  );
};

export default Blog;

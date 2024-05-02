import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxios from "../hooks/useAxios";
import { useState } from "react";

const CreateBlog = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const { api } = useAxios();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const submitForm = async (formData) => {
    const data = new FormData();
    data.append("title", formData.title);
    data.append("tags", formData.tags);
    data.append("content", formData.content);
    if (image) {
      data.append("thumbnail", image);
    }
    try {
      let response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs`,
        data
      );
      console.log(response);
      if (response.status === 201) {
        navigate(`/blogDetails/${response.data.blog.id}`);
      }
    } catch (error) {
      console.error(error);
      setError("root.random", {
        type: "random",
        message: `Something went wrong: ${error.message}`,
      });
    }
  };
  return (
    <>
      <main>
        <section>
          <div className="container">
            {/* <!-- Form Input field for creating Blog Post --> */}
            <form onSubmit={handleSubmit(submitForm)} className="createBlog">
              <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4 relative">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="Uploaded Image"
                    className="absolute inset-0 w-full h-full object-cover rounded-md"
                  />
                )}
                <label
                  htmlFor="thumbnail"
                  className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                  </svg>
                  <p>Upload Your Image</p>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="thumbnail"
                  name="thumbnail"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div className="mb-6">
                <input
                  {...register("title", {
                    required: "Title is Required",
                  })}
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter your blog title"
                />
                {!!errors.title && (
                  <div role="alert" className="text-red-600">
                    {errors.title.message}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <input
                  {...register("tags", {
                    required: "Tags is Required",
                  })}
                  type="text"
                  id="tags"
                  name="tags"
                  placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
                />
                {!!errors.tags && (
                  <div role="alert" className="text-red-600">
                    {errors.tags.message}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <textarea
                  {...register("content", {
                    required: "Content is Required",
                  })}
                  id="content"
                  name="content"
                  placeholder="Write your blog content"
                  rows="8"
                ></textarea>
                {!!errors.content && (
                  <div role="alert" className="text-red-600">
                    {errors.content.message}
                  </div>
                )}
              </div>
              <p className="text-center text-red-500">
                {errors?.root?.random?.message}
              </p>

              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
              >
                Create Blog
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default CreateBlog;

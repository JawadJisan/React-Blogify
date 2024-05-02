import { useEffect, useRef, useState } from "react";
import BlogsSideBar from "../BlogsSideBar";
import useAxios from "../../hooks/useAxios";
import Blog from "./Blog";

const blogsPerPage = 10;

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);
  const { api } = useAxios();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs?page=${page}`
        );
        const newBlogs = response.data.blogs;
        if (newBlogs.length === 0) {
          setHasMore(false);
        } else {
          setBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
          setPage((prevPage) => prevPage + 1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setHasMore(false); // Stop fetching on error
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const loaderItem = entries[0];
        if (loaderItem.isIntersecting && hasMore) {
          fetchPosts();
        }
      },
      { threshold: 0.5 } // Adjust threshold as needed
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [api, hasMore, page]);

  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {/* <!-- Blog Contents --> */}
          <div className="space-y-3 md:col-span-5">
            {blogs.map((blog) => (
              <Blog blog={blog} key={blog.id} />
            ))}
            {hasMore && (
              <div ref={loaderRef} className="text-center">
                Loading more blogs...
              </div>
            )}
            {!hasMore && (
              <div className="text-center font-bold text-xl text-green-900">
                No more blogs to load.
              </div>
            )}
          </div>

          {/* <!-- Sidebar --> */}
          <BlogsSideBar />
        </div>
      </div>
    </section>
  );
};

export default BlogList;

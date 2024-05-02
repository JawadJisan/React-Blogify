import Popular from "./Popular";
import Favourite from "./Favourite";

const BlogsSideBar = () => {
  return (
    <div className="md:col-span-2 h-full w-full space-y-5">
      <Popular />
      <Favourite />
    </div>
  );
};

export default BlogsSideBar;

import logo from "../../assets/logo.svg";
import search from "../../assets/icons/search.svg";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import Search from "../../pages/Search";

const Header = () => {
  const { auth, setAuth } = useAuth();
  const [open, setOpen] = useState(false);
  // console.log(auth);

  const handleLogout = () => {
    // Remove user information from Local Storage
    localStorage.removeItem("LogedInUser");
    setAuth(null);
  };

  return (
    <>
      <header>
        <nav className="container">
          {/* <!-- Logo --> */}
          <div>
            <Link to="/">
              <img className="w-32" src={logo} alt="lws" />
            </Link>
          </div>

          {/* <!-- Actions - Login, Write, Home, Search --> */}
          {/* <!-- Notes for Developers --> */}
          {/* <!-- For Logged in User - Write, Profile, Logout Menu --> */}
          {/* <!-- For Not Logged in User - Login Menu --> */}
          <div>
            <ul className="flex items-center space-x-5">
              <li>
                <Link
                  to="/createBlog"
                  className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Write
                </Link>
              </li>
              {/* {auth?.user && (
              <li>
                <Link
                  to="/createBlog"
                  className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
                >
                  Write
                </Link>
              </li>
            )} */}
              {auth?.user && (
                <li>
                  <button
                    onClick={() => setOpen(!open)}
                    // href="./search.html"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <img src={search} alt="Search" />
                    <span>Search</span>
                  </button>
                </li>
              )}
              {auth?.user ? (
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-white/50 hover:text-white transition-all duration-200"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="text-white/50 hover:text-white transition-all duration-200"
                  >
                    Login
                  </Link>
                </li>
              )}
              {auth?.user && (
                <li className="flex items-center">
                  {/* <!-- Circular Div with background color --> */}
                  <div className="avater-img bg-orange-600 text-white">
                    <span className="">
                      {auth?.user.firstName.substring(0, 2)}
                    </span>
                    {/* <!-- User's first name initial --> */}
                  </div>

                  {/* <!-- Logged-in user's name --> */}
                  <Link to="/profile">
                    <span className="text-white ml-2">
                      {" "}
                      {auth?.user.firstName} {auth?.user.lastName}{" "}
                    </span>
                  </Link>
                  {/* <!-- Profile Image --> */}
                </li>
              )}
            </ul>
          </div>
        </nav>
      </header>
      {open && <Search onOpen={setOpen} />}
    </>
  );
};

export default Header;

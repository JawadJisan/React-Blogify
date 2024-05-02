import close from "../assets/icons/close.svg";
import { useState } from "react";
import useAxios from "../hooks/useAxios";
import useDebounce from "../hooks/useDebounce";

const Search = ({ onOpen }) => {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const { api } = useAxios();

  const doSearch = useDebounce(async (searchTerm) => {
    try {
      setLoading(true);
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/search?q=${query}`
      );
      console.log(response.data.data);
      setResults(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error.message || error);
      console.error("Error fetching data:", error);
      setLoading(false);
      setResults([]);
    }

    console.log(searchTerm);
  }, 1000);

  const handleChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    doSearch(value);
  };

  return (
    <>
      <section className="absolute left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
        {/* <!-- Search Container --> */}
        <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
          {/* <!-- Search --> */}
          <div>
            <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
              Search for Your Desire Blogs
            </h3>
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Start Typing to Search"
              className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
            />
          </div>

          {/* <!-- Search Result --> */}
          <div className="">
            <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
            <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
              {loading && <div>Loading...</div>}
              {results.length && query.length ? (
                results.map((r) => (
                  <div key={r.id} className="flex gap-6 py-2">
                    <img
                      className="h-28 object-contain"
                      src={`${
                        import.meta.env.VITE_SERVER_BASE_URL
                      }/uploads/blog/${r.thumbnail}`}
                      alt="Thumbnail"
                    />
                    <div className="mt-2">
                      <h3 className="text-slate-300 text-xl font-bold">
                        {r.title}
                      </h3>
                      {/* <!-- Meta Informations --> */}
                      <p className="mb-6 text-sm text-slate-500 mt-1">
                        {r.content.substring(0, 100)}
                        {"..."}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-red-400 font-bold">
                  No Result Found
                </p>
              )}
            </div>
          </div>

          <div>
            <img
              onClick={() => onOpen(!open)}
              src={close}
              alt="Close"
              className="absolute right-2 top-2 cursor-pointer w-8 h-8"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;

import { AiOutlineClose } from "react-icons/ai";
import { BsYoutube } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { useNavigate } from "react-router-dom";
import {
  fetchYoutubePopular,
  homeVideoDataSelector,
} from "../redux/features/youtube/youtubeSlice";
import { useState } from "react";
const Navbar = () => {
  const homeVideoSelector = useAppSelector(homeVideoDataSelector);
  const nextPageToken = homeVideoSelector.pageToken;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/search?query=${searchInput}`);
    } else {
      navigate("/");
    }
  };
  return (
    <div className="sticky top-0 z-50 w-full bg-[#0c0c0c]">
      <div className="flex md:gap-0 gap-2 justify-between h-14 w-[95%] mx-auto">
        <div className="flex items-center md:gap-8 gap-3">
          <a
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample"
          >
            <RxHamburgerMenu className="sm:text-xl text-lg" />
          </a>

          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              dispatch(
                fetchYoutubePopular({
                  categoryId: null,
                  pageToken: nextPageToken,
                })
              );
              navigate("/");
            }}
          >
            <BsYoutube className="sm:text-3xl text-2xl text-red-600" />
            <span className="sm:text-xl text-lg">Youtube</span>
          </div>
        </div>
        <div className="flex items-center">
          <form onSubmit={handleSearch}>
            <div className="flex items-center sm:h-10 h-9 border-[0.6px] border-neutral-700 rounded-full overflow-hidden">
              <div className="flex items-center sm:pr-5 pr-3">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput}
                  className="h-full md:w-96 w-full px-3 sm:text-lg text-md text-zinc-300 bg-[#0c0c0c] focus:outline-none"
                />
                <AiOutlineClose
                  className="sm:text-lg text-md cursor-pointer text-neutral-400"
                  onClick={() => setSearchInput("")}
                />
              </div>
              <button className="w-16">
                <CiSearch className="text-2xl text-neutral-200" />
              </button>
            </div>
          </form>
        </div>
        <div className="lg:block hidden">{/* empty */}</div>
      </div>
    </div>
  );
};

export default Navbar;

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
const Navbar = () => {
  const homeVideoSelector = useAppSelector(homeVideoDataSelector);
  const nextPageToken = homeVideoSelector.pageToken;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className="w-full bg-[#0c0c0c]">
      <div className="flex justify-between h-14 w-[95%] mx-auto">
        <div className="flex items-center gap-8">
          <a
            data-bs-toggle="offcanvas"
            href="#offcanvasExample"
            role="button"
            aria-controls="offcanvasExample"
          >
            <RxHamburgerMenu className="text-xl" />
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
            <BsYoutube className="text-3xl text-red-600" />
            <span className="text-xl">Youtube</span>
          </div>
        </div>
        <div className="flex items-center">
          <form action="">
            <div className="flex items-center h-10 border-[0.6px] border-neutral-700 rounded-full overflow-hidden">
              <div className="flex items-center pr-5">
                <input
                  type="text"
                  placeholder="Search"
                  className="h-full w-96 px-3 text-lg text-zinc-300 bg-[#0c0c0c] focus:outline-none"
                />
                <AiOutlineClose className="text-lg cursor-pointer text-neutral-400" />
              </div>
              <button className="w-16">
                <CiSearch className="text-2xl text-neutral-200" />
              </button>
            </div>
          </form>
        </div>
        <div>{/* empty */}</div>
      </div>
    </div>
  );
};

export default Navbar;

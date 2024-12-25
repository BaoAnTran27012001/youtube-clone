import { RxHamburgerMenu } from "react-icons/rx";
import { BsYoutube } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
const Navbar = () => {
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

          <Link to={"/"} className="flex items-center gap-2">
            <BsYoutube className="text-3xl text-red-600" />
            <span className="text-xl">Youtube</span>
          </Link>
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

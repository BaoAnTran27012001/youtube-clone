import { BiMoviePlay } from "react-icons/bi";
import { BsYoutube } from "react-icons/bs";
import { FaRegNewspaper } from "react-icons/fa";
import {
  MdHomeFilled,
  MdOutlineLightbulb,
  MdOutlineSportsVolleyball,
} from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import { TbDeviceGamepad2, TbHanger, TbMusic } from "react-icons/tb";
import {
  fetchCategories,
  categoryDataSelector,
} from "../redux/features/youtube/youtubeCategoriesSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { useEffect } from "react";
import {
  fetchYoutubePopular,
  homeVideoDataSelector,
  toggleSwitchCategory,
} from "../redux/features/youtube/youtubeSlice";
import { Link, useNavigate } from "react-router-dom";
const Sidebar = ({
  filter,
  setFilter,
  setCategoryId,
}: {
  filter: string;
  setFilter: (filter: string) => void;
  setCategoryId: (categoryId: string | null) => void;
}) => {
  const homeVideoSelector = useAppSelector(homeVideoDataSelector);
  const nextPageToken = homeVideoSelector.pageToken;
  const categorySelector = useAppSelector(categoryDataSelector);
  const categoriesData = categorySelector.homeCategories?.data?.items;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  const mainLinks = [
    {
      icon: <MdHomeFilled className="text-xl" />,
      name: "Home",
      filterTag: "home",
      categoryId: null,
    },
  ];
  const categoriesLinks = [
    {
      icon: <TbMusic className="text-xl" />,
      name: "Music",
      filterTag: "music",
      categoryId: categoriesData?.find(
        (item: { snippet: { title: string } }) => item.snippet.title === "Music"
      )?.id,
    },
    {
      icon: <MdOutlineSportsVolleyball className="text-xl" />,
      name: "Sports",
      filterTag: "sports",
      categoryId: categoriesData?.find(
        (item: { snippet: { title: string } }) =>
          item.snippet.title === "Sports"
      )?.id,
    },
    {
      icon: <TbDeviceGamepad2 className="text-xl" />,
      name: "Gaming",
      filterTag: "gaming",
      categoryId: categoriesData?.find(
        (item: { snippet: { title: string } }) =>
          item.snippet.title === "Gaming"
      )?.id,
    },
    {
      icon: <BiMoviePlay className="text-xl" />,
      name: "Movies",
      filterTag: "movies",
      categoryId: categoriesData?.find(
        (item: { snippet: { title: string } }) =>
          item.snippet.title === "Movies"
      )?.id,
    },
    {
      icon: <FaRegNewspaper className="text-xl" />,
      name: "News",
      filterTag: "news",
      categoryId: categoriesData?.find(
        (item: { snippet: { title: string } }) =>
          item.snippet.title === "News & Politics"
      )?.id,
    },
    {
      icon: <TbHanger className="text-xl" />,
      name: "Fashion",
      filterTag: "fashion",
      categoryId: categoriesData?.find(
        (item: { snippet: { title: string } }) =>
          item.snippet.title === "Howto & Style"
      )?.id,
    },
    {
      icon: <MdOutlineLightbulb className="text-xl" />,
      name: "Course",
      filterTag: "course",
      categoryId: categoriesData?.find(
        (item: { snippet: { title: string } }) =>
          item.snippet.title === "Education"
      )?.id,
    },
  ];
  const toggleFilter = (tag: string, categoryId: string | null) => {
    setFilter(tag);
    setCategoryId(categoryId);
    dispatch(toggleSwitchCategory(true));
    dispatch(fetchYoutubePopular({ categoryId, pageToken: nextPageToken }));
    navigate("/");
  };

  return (
    <div className="w-full h-full bg-[#0c0c0c] text-white">
      <div className="flex items-center gap-8 w-[85%] mx-auto h-14">
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

      <ul className="border-b border-zinc-700">
        {mainLinks.map((item, index) => {
          return (
            <li
              key={index}
              className="pl-7 py-3 list-none hover:bg-neutral-800 cursor-pointer w-full"
              onClick={() => toggleFilter(item.filterTag, item.categoryId)}
            >
              <h1 className="flex items-center gap-2">
                {item.icon}
                <span>{item.name}</span>
              </h1>
            </li>
          );
        })}
      </ul>

      <ul className="border-b border-zinc-700">
        {categoriesLinks.map((item, index) => {
          return (
            <li
              key={index}
              className={`pl-7 py-3 list-none hover:bg-neutral-800 cursor-pointer ${
                filter === item.filterTag ? "bg-neutral-800" : null
              }`}
              onClick={() => toggleFilter(item.filterTag, item.categoryId)}
            >
              <h1 className="flex items-center gap-2">
                {item.icon}
                <span>{item.name}</span>
              </h1>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;

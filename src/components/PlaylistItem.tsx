import { Link } from "react-router-dom";

const PlaylistItem = (props) => {
  return (
    <Link to={`/watch/${props.id}`}>
      <div className="col flex flex-col gap-4 mb-2 hover:scale-[101%] duration-200 ease-in-out">
        <div className="relative">
          <div className="absolute bg-[#0c0c0cd0] py-0.5 px-2 h-full left-0 top-0 flex items-center gap-2 w-20">
            <h3 className="text-center w-full text-xl">{props.index + 1}</h3>
          </div>
          <div className="">
            <img
              src={props.thumbnail}
              alt="playListItem Picture"
              className="object-cover aspect-[16/9] rounded"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="text-md line-clamp-1 font-semibold">{props.title}</h1>
        </div>
      </div>
    </Link>
  );
};

export default PlaylistItem;

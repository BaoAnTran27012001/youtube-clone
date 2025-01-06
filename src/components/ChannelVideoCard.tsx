import { Link } from "react-router-dom";
import {
  convertVideoDuration,
  formatNumber,
  formatVideoDate,
} from "../utils/functions";
import { IMiniCard } from "../utils/types";

const ChannelVideoCard = (props: IMiniCard) => {
  return (
    <Link to={`/watch/${props.id}`}>
      <div className="container p-0">
        <div className="col flex flex-col gap-2 mb-2 hover:scale-[101%] duration-200 ease-in-out">
          <div className="relative">
            <div className="absolute bg-[#0c0c0cd0] md:py-0.5 md:px-2 py-0 px-0 rounded right-6 bottom-2">
              {convertVideoDuration(props.contentDetails.duration)}
            </div>
            <div className="w-full rounded">
              <img
                src={props.snippet.thumbnails.standard?.url}
                alt="minicard image"
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-md line-clamp-1 font-semibold">
              {props.snippet.title}
            </h1>
            <div className="flex gap-3 text-sm text-gray-400">
              <h2>{formatNumber(props.statistics.viewCount)} views</h2>
              <h2>{formatVideoDate(props.snippet.publishedAt)}</h2>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ChannelVideoCard;

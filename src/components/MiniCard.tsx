import { Link } from "react-router-dom";
import {
  convertVideoDuration,
  formatNumber,
  formatVideoDate,
} from "../utils/functions";
import { IMiniCard } from "../utils/types";

const MiniCard = (props: IMiniCard) => {
  return (
    <Link to={`/watch/${props.id}`}>
      <div className="flex gap-3 items-center cursor-pointer hover:scale-[101%]">
        <div className="min-w-40 rounded relative">
          <img
            src={props.snippet.thumbnails.default.url}
            alt="minicard image"
            className="w-full h-full object-cover"
          />
          <span className="bg-black/70 py-1 px-2 rounded absolute right-1 bottom-1 text-xs">
            {convertVideoDuration(props.contentDetails.duration)}
          </span>
        </div>
        <div className="">
          <h1 className="text-md">{props.snippet.title}</h1>
          <div className="text-sm text-gray-400">
            <h2>{props.snippet.channelTitle}</h2>
            <div className="flex gap-1 items-center">
              <h2>{formatNumber(props.statistics.viewCount)}</h2>
              <span className="w-1 h-1 rounded-full bg-white"></span>
              <h2>{formatVideoDate(props.snippet.publishedAt)}</h2>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MiniCard;

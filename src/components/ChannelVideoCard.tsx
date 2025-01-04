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
      <div className="col flex flex-col gap-2 mb-2">
        <div className="relative">
          <div className="absolute bg-[#0c0c0cd0] py-0.5 px-2 rounded right-6 bottom-2">
            {convertVideoDuration(props.contentDetails.duration)}
          </div>
          <div className="aspect-[16/9] w-[300px] rounded">
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
    </Link>
  );
};

export default ChannelVideoCard;

import { Link } from "react-router-dom";
import defaultThumnail from "../assets/default_thumbnail.png";
import {
  convertVideoDuration,
  formatNumber,
  formatVideoDate,
} from "../utils/functions";

const Card = (props) => {
  const title = props.snippet?.title;
  const url =
    props.snippet?.thumbnails?.standard?.url ||
    props.snippet?.thumbnails?.high?.url;
  const duration = props.contentDetails?.duration;
  const viewCount = props.statistics?.viewCount;
  const videoAge = props.snippet?.publishedAt;
  const channelID = props.snippet?.channelId;
  const videoID = props.id;
  const channelThumbnail = props.channelInfo?.image;
  const channelName = props.snippet?.channelTitle;
  return (
    <div className="flex flex-col gap-2 hover:scale-[101%] duration-200 ease-in-out">
      <div className="relative">
        <Link to={`/watch/${videoID}`} className="h-[220px] rounded-xl">
          <img
            src={url ? url : defaultThumnail}
            alt="thumbnail"
            className="object-cover h-full w-full overflow-hidden rounded-xl"
          />
        </Link>
        <div className="absolute bottom-3 right-3 bg-[#0c0c0c] opacity-70 px-2 py-1 text-sm rounded">
          {convertVideoDuration(duration)}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <div className="aspect-[1/1] h-12 w-12 rounded-full">
          <Link to={`/channel/${channelID}`}>
            <img
              src={channelThumbnail}
              alt="channelImage"
              className="w-full h-full object-cover rounded-full hover:scale-[108%] duration-200 ease-in-out"
            />
          </Link>
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg">{title.substring(0, 65) + " ... "}</h3>
          <div className="text-md">
            <h4>{channelName}</h4>
            <div className="flex gap-1">
              <span>{formatNumber(viewCount)} views</span>
              <span>.</span>
              <span>{formatVideoDate(videoAge)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

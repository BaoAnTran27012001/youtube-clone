import {
  convertVideoDuration,
  formatNumber,
  formatVideoDate,
} from "../utils/functions";
interface IMiniCardProps {
  contentDetails: { duration: string };
  snippet: {
    publishedAt: string;
    title: string;
    channelTitle: string;
    thumbnails: { default: { url: string } };
  };
  statistics: { viewCount: string };
}
const MiniCard = (props: IMiniCardProps) => {

  return (
    <div className="flex gap-3 items-center cursor-pointer">
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
  );
};

export default MiniCard;

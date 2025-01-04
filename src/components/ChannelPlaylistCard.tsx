import { FaList } from "react-icons/fa";
import { IChannelPlaylist } from "../utils/types";
import { formatNumber } from "../utils/functions";
import { Link } from "react-router-dom";

const ChannelPlaylistCard = (props: IChannelPlaylist) => {
  console.log("check props ", props);

  return (
    <Link to={`/playlist/${props?.channelId}/${props?.id}`}>
      <div className="col flex flex-col gap-2 mb-2">
        <div className="relative">
          <div className="absolute bg-[#0c0c0cd0] py-0.5 px-2 rounded right-6 bottom-2 flex items-center gap-2">
            {/* {convertVideoDuration(props.contentDetails.duration)} */}
            <FaList />
            <h3>{formatNumber(props?.videoCount)} videos</h3>
          </div>
          <div className=" aspect-[16/9] w-[300px] rounded">
            <img
              src={props?.thumbnail}
              alt="minicard image"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-md line-clamp-1 font-semibold">{props?.title}</h1>
        </div>
      </div>
    </Link>
  );
};

export default ChannelPlaylistCard;

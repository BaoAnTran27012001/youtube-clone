import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChannelPlaylist from "../components/ChannelPlaylist";
import ChannelVideoList from "../components/ChannelVideoList";
import {
  fetchYoutubeChannels,
  homeVideoDataSelector,
} from "../redux/features/youtube/youtubeSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { formatNumber } from "../utils/functions";

const Channel = () => {
  const params = useParams();
  const { channelId } = params;
  const homeVideoSelector = useAppSelector(homeVideoDataSelector);
  const homeChannelsData = homeVideoSelector.channels;

  const [isShowDetail, setIsShowDetail] = useState(false);
  const [category, setCategory] = useState("videos");
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchYoutubeChannels(channelId));
  }, [channelId]);
  const channelInfoData = homeChannelsData?.map((item: any) => {
    return {
      id: item.id,
      thumbnail: item.snippet?.thumbnails.high.url,
      title: item.snippet?.title,
      customUrl: item.snippet?.customUrl,
      subCount: item.statistics?.subscriberCount,
      description: item.snippet?.description,
      videoCount: item.statistics?.videoCount,
    };
  })[0];

  return (
    <div className="relative">
      {isShowDetail && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 overflow-hidden w-full h-screen z-20"
          onClick={() => setIsShowDetail(false)}
        >
          <div className="bg-neutral-800 rounded-xl w-[600px] p-8 flex flex-col gap-2 items-center max-h-[300px] overflow-y-auto absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 ">
            <p className="text-lg whitespace-pre-line">
              {channelInfoData?.description}
            </p>
          </div>
        </div>
      )}
      <div className="w-[90%] mx-auto md:mt-8 mt-6 overflow-hidden">
        <div className="row row-cols-2">
          {/* image */}
          <div className="col-4">
            <div className="md:w-52 sm:w-40 w-36 aspect-[1/1] rounded-full mx-auto">
              <img
                src={channelInfoData?.thumbnail}
                alt="channel thumbnail"
                className="w-full h-full object-cover rounded-full overflow-hidden"
              />
            </div>
          </div>
          {/* details */}
          <div className="col-8 flex flex-col gap-2">
            <h1 className="md:text-4xl sm:text-3xl text-2xl font-semibold">
              {channelInfoData?.title}
            </h1>
            <div className="sm:flex gap-4 sm:text-lg text-md text-neutral-400 mt-2">
              <h2>{channelInfoData?.customUrl}</h2>
              <h2>{formatNumber(channelInfoData?.subCount)} subscribers</h2>
              <h2>{channelInfoData?.videoCount} videos</h2>
            </div>
            <div className="">
              <p className="w-[600px] line-clamp-3 text-neutral-400 whitespace-pre-line">
                {channelInfoData?.description !== "" ? (
                  channelInfoData?.description.length < 60 ? (
                    channelInfoData?.description
                  ) : (
                    channelInfoData?.description.substring(0, 61) + " ... "
                  )
                ) : (
                  <div>
                    <p>No Description</p>
                  </div>
                )}
                {channelInfoData?.description.length > 100 && (
                  <button
                    className="font-semibold"
                    onClick={() => setIsShowDetail(true)}
                  >
                    Show more
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="my-3">
          <button
            onClick={() => setCategory("videos")}
            className={`w-44 text-xl py-2 font-semibold ${
              category === "videos" ? "border-b" : ""
            }`}
          >
            Videos
          </button>
          <button
            onClick={() => setCategory("playlists")}
            className={`w-44 text-xl py-2 font-semibold ${
              category === "playlists" ? "border-b" : ""
            }`}
          >
            Playlists
          </button>
          <hr className="h-1" />
        </div>
        {category === "videos" ? (
          <ChannelVideoList channelId={channelId} />
        ) : (
          <ChannelPlaylist channelId={channelId} />
        )}
      </div>
    </div>
  );
};

export default Channel;

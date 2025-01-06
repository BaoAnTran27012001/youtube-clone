import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../redux/hooks/hooks";
import {
  fetchSearchVideos,
  searchSelector,
} from "../redux/features/youtube/searchVideo";
import {
  fetchYoutubeChannels,
  homeVideoDataSelector,
} from "../redux/features/youtube/youtubeSlice";
import Card from "../components/Card";
import {
  fetchWatchPageListVideos,
  youtubeWatchPageSelector,
} from "../redux/features/youtube/youtubeWatchPageSlice";
const Search = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("query");
  const searchVideoSelector = useAppSelector(searchSelector);
  const watchPageVideoSelector = useAppSelector(youtubeWatchPageSelector);
  const homeVideoSelector = useAppSelector(homeVideoDataSelector);
  const searchChannelsData = homeVideoSelector.channels;
  const searchVideosData = searchVideoSelector.searchVideos;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchSearchVideos(searchQuery!));
  }, [searchQuery]);

  const channelIds: string[] = [];
  const videoIds: string[] = [];
  searchVideosData?.data?.items?.forEach(
    (item: { id: { videoId?: string } }) => {
      if (item.id.videoId && item.snippet.channelId) {
        channelIds.push(item.snippet.channelId);
        videoIds.push(item.id.videoId);
      }
    }
  );

  const channelsString = channelIds?.join(",");
  const videoString = videoIds?.join(",");
  useEffect(() => {
    dispatch(fetchYoutubeChannels(channelsString));
  }, [channelsString]);
  useEffect(() => {
    dispatch(fetchWatchPageListVideos(videoString));
  }, [videoString]);

  const watchPageListData = watchPageVideoSelector.minicardlist;

  const channelData = {};

  searchChannelsData?.forEach((channel) => {
    //channelImage: channel?.snippet?.thumbnails?.default?.url,
    channelData[channel.id] = {
      id: channel.id,
      image: channel?.snippet?.thumbnails?.default?.url,
    };
  });
  const mergedResult = watchPageListData?.map((video) => {
    return {
      ...video,
      channelInfo: {
        image: channelData[video?.snippet?.channelId]?.image,
      },
    };
  });
  console.log("check mergedResult ", mergedResult);

  return (
    <div className="row w-[95%] mx-auto mt-6">
      {mergedResult?.map((item, index) => {
        return (
          <div key={`${item.id}-${index}`} className="col-4 mb-4">
            <Card {...item} />
          </div>
        );
      })}
    </div>
  );
};

export default Search;

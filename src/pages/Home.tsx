import { useEffect, useState } from "react";
import Card from "../components/Card";
import {
  fetchYoutubePopular,
  fetchYoutubeChannels,
  homeVideoDataSelector,
  toggleSwitchCategory,
} from "../redux/features/youtube/youtubeSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import Spinner from "../components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
const Home = ({
  categoryId,
  filter,
}: {
  categoryId: string | null;
  filter: string;
}) => {
  const homeVideoSelector = useAppSelector(homeVideoDataSelector);
  const homeVideoData = homeVideoSelector.data;
  const homeChannelsData = homeVideoSelector.channels;
  const { error, loading } = homeVideoSelector;
  const nextPageToken = homeVideoSelector.pageToken;
  // get channel thumbnail

  const channelIds = homeVideoData
    ?.map((video, _) => {
      return video?.snippet?.channelId;
    })
    .join(",");

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchYoutubePopular({ categoryId, pageToken: nextPageToken }));
  }, []);
  useEffect(() => {
    dispatch(fetchYoutubeChannels(channelIds));
  }, [channelIds]);

  // append channel information
  const channelData = {};
  homeChannelsData?.forEach((channel) => {
    //channelImage: channel?.snippet?.thumbnails?.default?.url,
    channelData[channel.id] = {
      id: channel.id,
      image: channel?.snippet?.thumbnails?.default?.url,
    };
  });
  // homeVideoData = [...homeVideoData, ...channelData];
  let videos = [];
  if (homeVideoData?.length > 0) {
    videos = homeVideoData.map((video) => {
      return {
        ...video,
        channelInfo: {
          image: channelData[video?.snippet?.channelId]?.image,
        },
      };
    });
  }
  const fetchVideosByScroll = () => {
    dispatch(toggleSwitchCategory(false));
    dispatch(fetchYoutubePopular({ categoryId, pageToken: nextPageToken }));
  };

  if (error) {
    return <div className="text-center text-red-700">Error: {error}</div>;
  }
  return (
    <InfiniteScroll
      next={() => fetchVideosByScroll()}
      hasMore={true}
      dataLength={videos.length}
      loader={<Spinner />}
    >
      {loading && (
        <div className="w-screen h-screen flex items-center justify-center">
          <Spinner />
        </div>
      )}

      <div className="row w-[95%] mx-auto mt-6">
        {videos?.map((item, index) => {
          return (
            <div
              key={`${item.id}-${index}`}
              className="col-12 col-md-6 col-lg-4 mb-4"
            >
              <Card {...item} />
            </div>
          );
        })}
      </div>
    </InfiniteScroll>
  );
};

export default Home;

import { useEffect } from "react";
import {
  fetchActivities,
  fetchWatchPageListVideos,
  youtubeWatchPageSelector,
} from "../redux/features/youtube/youtubeWatchPageSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import ChannelVideoCard from "./ChannelVideoCard";

const ChannelVideoList = (props: { channelId: string | undefined }) => {
  const watchPageVideoSelector = useAppSelector(youtubeWatchPageSelector);
  const activitiesData = watchPageVideoSelector.activities;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchActivities(props.channelId));
  }, [props.channelId]);

  const videoIds: string[] = [];
  activitiesData?.forEach(
    (item: {
      contentDetails: {
        upload?: { videoId: string };
        playlistItem?: { resourceId: { videoId: string } };
      };
    }) => {
      if (item.contentDetails.upload) {
        videoIds.push(item.contentDetails.upload?.videoId);
      } else if (item.contentDetails.playlistItem) {
        videoIds.push(item.contentDetails.playlistItem.resourceId.videoId);
      }
    }
  );
  const videoIdsString: string = videoIds.join(",");
  useEffect(() => {
    dispatch(fetchWatchPageListVideos(videoIdsString));
  }, [videoIdsString]);
  const channelVideosList = watchPageVideoSelector.minicardlist;
  return (
    <>
      <div className="row row-cols-lg-4 row-cols-md-3">
        {channelVideosList?.map((video, index) => {
          return <ChannelVideoCard key={`${video.id}--${index}`} {...video} />;
        })}
      </div>
    </>
  );
};

export default ChannelVideoList;

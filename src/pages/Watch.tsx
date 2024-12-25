import React, { useEffect } from "react";
import VideoDetail from "../components/VideoDetail";
import MiniCard from "../components/MiniCard";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
  fetchActivities,
  fetchWatchPage,
  fetchWatchPageListVideos,
  youtubeWatchPageSelector,
} from "../redux/features/youtube/youtubeWatchPageSlice";
import {
  fetchYoutubeChannels,
  homeVideoDataSelector,
} from "../redux/features/youtube/youtubeSlice";
import { IHomeChannelData, IVideoDetail, IWatchPageData } from "../utils/types";
import Comment from "../components/Comment";

const Watch = () => {
  const { videoId } = useParams();
  const watchPageVideoSelector = useAppSelector(youtubeWatchPageSelector);
  const homeVideoSelector = useAppSelector(homeVideoDataSelector);
  const homeChannelsData: IHomeChannelData[] = homeVideoSelector.channels;
  const watchPageData: IWatchPageData = watchPageVideoSelector.data;
  const activitiesData = watchPageVideoSelector.activities;

  const videoTitle = watchPageData?.snippet?.title;
  const videoDescription = watchPageData?.snippet?.description;
  const videoThumbnails = watchPageData?.snippet?.thumbnails?.standard?.url;
  const channelThumbnail = homeChannelsData
    ? homeChannelsData[0]?.snippet?.thumbnails?.default?.url
    : "";
  const subcriberCount = homeChannelsData
    ? homeChannelsData[0]?.statistics?.subscriberCount
    : "";
  const channelTitle = watchPageData?.snippet?.channelTitle;
  const channelId = watchPageData?.snippet?.channelId;
  const commentCount = watchPageData?.statistics?.commentCount;
  const likeCount = watchPageData?.statistics?.likeCount;
  const viewCount = watchPageData?.statistics?.viewCount;
  const duration = watchPageData?.statistics?.contentDetails?.duration;
  const publishedAt = watchPageData?.snippet?.publishedAt;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchWatchPage(videoId));
  }, [videoId]);
  useEffect(() => {
    dispatch(fetchYoutubeChannels(channelId));
  }, [channelId]);
  const videoDetailData: IVideoDetail = {
    videoId,
    videoTitle,
    videoDescription,
    videoThumbnails,
    channelThumbnail,
    channelTitle,
    channelId,
    commentCount,
    likeCount,
    viewCount,
    duration,
    publishedAt,
    subcriberCount,
  };
  useEffect(() => {
    dispatch(fetchActivities(channelId));
  }, [channelId]);
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
  const watchPageListData = watchPageVideoSelector.minicardlist;

  return (
    <div className="w-[95%] mx-auto mt-6">
      <div className="row">
        <div className="col-8">
          <div className="w-full aspect-[16/9]">
            {/* <img
              src={videoDetailData.videoThumbnails}
              alt="videoThumbnails"
              className="w-full h-full object-cover rounded-lg overflow-hidden"
            /> */}
            <iframe
              className="w-full h-full aspect-[16/9] object-cover rounded-lg overflow-hidden"
              title="Youtube player video"
              allow="autoplay; picture-inpicture;"
              allowFullScreen
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            ></iframe>
          </div>
          <VideoDetail {...videoDetailData} />
          <Comment videoId={videoId} />
        </div>
        <div className="col-4 flex flex-col gap-3">
          {watchPageListData?.map((item, index) => {
            return <MiniCard key={index} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Watch;

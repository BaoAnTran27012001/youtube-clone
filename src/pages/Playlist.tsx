import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
  fetchPlaylistVideos,
  playlistDataSelector,
} from "../redux/features/youtube/playlistSlice";
import { IPlaylisInfo } from "../utils/types";
const Playlist = () => {
  const params = useParams();
  const { channelId, playlistId } = params;
  const playlistSelector = useAppSelector(playlistDataSelector);
  const playlistVideosData = playlistSelector.playlistvideos;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPlaylistVideos(playlistId));
  }, [playlistId]);
  const playListData = playlistVideosData?.data?.items?.map(
    (item: IPlaylisInfo) => {
      return {
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.standard.url,
      };
    }
  );
  console.log("check data ", playListData);

  return (
    <div className="w-[95%] mx-auto mt-8 bg-neutral-800 p-8 rounded-md">
      <div className="row row-cols-2">
        {/* image */}
        <div className="col-4 h-[240px]">
          <div className="bg-red-400 w-full h-full">
            <img
              src={playListData[0]?.thumbnail}
              alt="channel thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* details */}
        <div className="col-8 flex flex-col gap-2">
          <h1 className="text-4xl font-semibold">{playListData[0]?.title}</h1>
          <div className="flex gap-4 text-lg text-neutral-400 mt-2">
            <h2>{playListData[0]?.description}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  fetchPlaylistVideoItems,
  fetchPlaylistVideos,
  playlistDataSelector,
} from "../redux/features/youtube/playlistSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import { IPlaylisInfo, IPlaylistItem } from "../utils/types";
import PlaylistItem from "../components/PlaylistItem";
const Playlist = () => {
  const params = useParams();
  const { channelId, playlistId } = params;
  const playlistSelector = useAppSelector(playlistDataSelector);
  const playlistVideosData = playlistSelector.playlistvideos;
  const playlistVideoItemsData = playlistSelector.playlistvideoitems;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPlaylistVideos(playlistId));
  }, [playlistId]);
  useEffect(() => {
    dispatch(fetchPlaylistVideoItems(playlistId));
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
  )[0];
  const playListItemsData = playlistVideoItemsData?.data?.items?.map(
    (item: IPlaylistItem) => {
      return {
        id: item?.snippet?.resourceId?.videoId,
        title: item?.snippet?.title,
        thumbnail: item?.snippet?.thumbnails?.high?.url,
      };
    }
  );

  return (
    <div className="w-[95%] mx-auto md:mt-8 mt-4 p-8 rounded-md">
      <div className="row row-cols-2 bg-neutral-800 w-full md:p-6 p-3 rounded-md">
        {/* image */}
        <div className="col-md-4 col-12 h-[240px]">
          <div className="bg-red-400 w-full h-full">
            <img
              src={playListData?.thumbnail}
              alt="channel thumbnail"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        {/* details */}
        <div className="col-md-8 col-12 flex flex-col gap-3">
          <h1 className="md:text-4xl sm:text-3xl text-xl font-semibold">
            {playListData?.title}
          </h1>
          <div className="flex gap-4 text-lg text-neutral-400 mt-2">
            <h2>{playListData?.description}</h2>
          </div>
        </div>
      </div>
      <div className="row row-cols-md-4 row-cols-sm-3 row-cols-2 mt-6">
        {playListItemsData?.map((item, index) => {
          return <PlaylistItem key={item?.id} {...item} index={index} />;
        })}
      </div>
    </div>
  );
};

export default Playlist;

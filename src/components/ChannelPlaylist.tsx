import React, { useEffect } from "react";
import ChannelPlaylistCard from "./ChannelPlaylistCard";
import { useAppSelector, useAppDispatch } from "../redux/hooks/hooks";
import {
  fetchPlaylists,
  playlistDataSelector,
} from "../redux/features/youtube/playlistSlice";

const ChannelPlaylist = (props: { channelId: string | undefined }) => {
  const playlistSelector = useAppSelector(playlistDataSelector);
  const playlistData = playlistSelector.playlists;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchPlaylists({ channelId: props.channelId }));
  }, [props.channelId]);

  const playlistDataList = playlistData?.data?.items?.map((playlist) => {
    return {
      id: playlist.id,
      title: playlist.snippet.title,
      thumbnail:
        playlist.snippet.thumbnails.high?.url ||
        playlist.snippet.thumbnails.standard?.url,
      videoCount: playlist.contentDetails.itemCount,
    };
  });

  return (
    <div className="row row-cols-lg-4 row-cols-md-3 row-cols-1 py-3">
      {playlistDataList?.length > 0 &&
        playlistDataList?.map((item, index) => {
          return (
            <ChannelPlaylistCard
              channelId={props.channelId}
              key={`${item.id}--${index}`}
              {...item}
            />
          );
        })}
    </div>
  );
};

export default ChannelPlaylist;

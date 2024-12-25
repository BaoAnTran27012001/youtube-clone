import React, { useState } from "react";
import { BiLike } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { formatNumber, formatVideoDate } from "../utils/functions";
import { IVideoDetail } from "../utils/types";

const VideoDetail = (props: IVideoDetail) => {
  const [isShowDescription, setIsShowDescription] = useState(false);
  return (
    <div className="flex flex-col gap-2 mt-2 mx-1">
      {/* VideoTitle
      
      Channel img , channel name , likes , share button

      description */}
      <h1 className="text-2xl font-semibold">{props.videoTitle}</h1>
      <div className="flex justify-between">
        {/* channel info */}
        <div className="flex gap-3">
          <div className="w-12 aspect-[1/1] rounded-full">
            <img
              src={props.channelThumbnail}
              alt="channel thumbnail"
              className="w-full h-full rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="font-semibold text-lg">{props.channelTitle}</h2>
            <h2 className="text-sm">
              {formatNumber(props.subcriberCount)} subcribers
            </h2>
          </div>
        </div>
        {/* btns */}
        <div className="flex text-lg gap-3 cursor-pointer">
          <div className="flex items-center gap-2 bg-neutral-800 rounded-full px-3">
            <BiLike />
            <span className="h-6 border"></span>
            <span>{formatNumber(props.likeCount)} likes</span>
          </div>
          <div className="flex items-center gap-2 bg-neutral-800 rounded-full px-3">
            <FaShare />
            <span>share</span>
          </div>
        </div>
      </div>
      <div className="text-lg bg-neutral-700 px-3 py-2 rounded-xl">
        <div className="flex gap-4 text-[16px]">
          <span>{formatNumber(props.viewCount)} views</span>
          <span>{formatVideoDate(props.publishedAt)}</span>
        </div>
        <p
          className={`whitespace-pre-line inline ${
            isShowDescription ? "" : "line-clamp-3"
          }`}
        >
          {isShowDescription
            ? props.videoDescription
            : props.videoDescription?.substring(0, 60) + "..."}
        </p>
        <button
          className="hover:underline ml-2 text-gray-400"
          onClick={() => setIsShowDescription(!isShowDescription)}
        >
          {isShowDescription ? "Hide" : "See more"}
        </button>
      </div>
    </div>
  );
};

export default VideoDetail;

import anonymous from "../assets/anonymous.png";
import { BiLike } from "react-icons/bi";
import { ICommentThread } from "../utils/types";
import { useAppSelector } from "../redux/hooks/hooks";
import { youtubeWatchPageSelector } from "../redux/features/youtube/youtubeWatchPageSlice";
import Spinner from "./Spinner";
import { useState } from "react";
const CommentBody = (props: ICommentThread) => {
  const watchPageSelector = useAppSelector(youtubeWatchPageSelector);
  const { loading } = watchPageSelector.commentThreats;
  const [isShowCommentText, setIsShowCommentText] = useState(false);
  return (
    <div className="flex gap-2">
      <div className="max-h-10 max-w-10 rounded-full">
        {loading ? (
          <Spinner />
        ) : (
          <img
            src={!loading ? props?.authorProfile : anonymous}
            alt="comment image"
            className="w-full h-full rounded-full object-cover overflow-hidden"
          />
        )}
      </div>
      <div className="">
        <h1 className="text-md">{props?.authorName}</h1>
        <h2 className="text-neutral-300 whitespace-pre-line">
          {props?.commentText.length < 100
            ? props?.commentText
            : props?.commentText.substring(0, 100) + " ... "}
        </h2>
        <div className="flex items-center gap-1 text-neutral-400">
          <BiLike className="cursor-pointer" />
          {props?.commentLike}
        </div>
      </div>
    </div>
  );
};

export default CommentBody;

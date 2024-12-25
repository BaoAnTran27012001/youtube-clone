import CommentBody from "./CommentBody";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import {
  fetchCommentThreats,
  youtubeWatchPageSelector,
} from "../redux/features/youtube/youtubeWatchPageSlice";
import { useEffect } from "react";

const Comment = (props: { videoId: string | undefined }) => {
  const watchPageSelector = useAppSelector(youtubeWatchPageSelector);
  const commentThreatsData = watchPageSelector.commentThreats;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCommentThreats(props.videoId));
  }, [props.videoId]);
  const commentsDataList = commentThreatsData?.map((comment) => {
    return {
      commentId: comment.id,
      authorChannelId:
        comment.snippet.topLevelComment.snippet.authorChannelId.value,
      authorProfile:
        comment.snippet.topLevelComment.snippet.authorProfileImageUrl,
      authorName: comment.snippet.topLevelComment.snippet.authorDisplayName,
      commentText: comment.snippet.topLevelComment.snippet.textOriginal,
      commentLike: comment.snippet.topLevelComment.snippet.likeCount,
    };
  });

  return (
    <div className="mt-4 flex flex-col gap-2">
      <h1 className="text-2xl font-semibold px-4">Comments</h1>
      {commentsDataList?.map((item) => {
        return <CommentBody />;
      })}
    </div>
  );
};

export default Comment;

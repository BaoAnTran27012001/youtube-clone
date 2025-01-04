import { useEffect } from "react";
import {
  fetchCommentThreats,
  toggleIsShowMoreComments,
  youtubeWatchPageSelector,
} from "../redux/features/youtube/youtubeWatchPageSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
import CommentCard from "./CommentCard";
import Spinner from "./Spinner";

const Comment = (props: { videoId: string | undefined }) => {
  const watchPageSelector = useAppSelector(youtubeWatchPageSelector);
  const commentThreatsData = watchPageSelector.commentThreats.data;
  const commentThreatsNextPageToken =
    watchPageSelector.commentThreadsNextPageToken;
  const { loading } = watchPageSelector.commentThreats;

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (props.videoId) {
      dispatch(toggleIsShowMoreComments(false));
      dispatch(
        fetchCommentThreats({
          videoId: props.videoId,
          nextPageToken: commentThreatsNextPageToken,
        })
      );
    }
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
      commentRepliesCount: comment.snippet.totalReplyCount,
    };
  });

  return (
    <div className="mt-4 flex flex-col gap-2">
      <h1 className="text-2xl font-semibold px-4">Comments</h1>
      {loading && (
        <div className="w-full h-full flex justify-between items-center">
          <Spinner />
        </div>
      )}

      {!loading &&
        commentsDataList.length > 0 &&
        commentsDataList?.map((comment) => {
          return <CommentCard key={comment.commentId} {...comment} />;
        })}
      <button
        className="text-gray-400 hover:underline"
        onClick={() => {
          dispatch(toggleIsShowMoreComments(true));
          dispatch(
            fetchCommentThreats({
              videoId: props.videoId,
              nextPageToken: commentThreatsNextPageToken,
            })
          );
        }}
      >
        Show more ...
      </button>
    </div>
  );
};

export default Comment;

import { ICommentThread } from "../utils/types";
import CommentBody from "./CommentBody";
import { useAppSelector, useAppDispatch } from "../redux/hooks/hooks";
import {
  fetchCommentsReplies,
  youtubeWatchPageSelector,
} from "../redux/features/youtube/youtubeWatchPageSlice";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
const CommentCard = (props: ICommentThread) => {
  const watchPageSelector = useAppSelector(youtubeWatchPageSelector);
  const commentRepliesData = watchPageSelector.commentReplies.data;
  const isRepliesLoading = watchPageSelector.commentReplies.loading;
  const [isShowReplies, setIsShowReplies] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (props?.commentRepliesCount > 0) {
      dispatch(fetchCommentsReplies(props.commentId));
    }
  }, [isRepliesLoading]);
  const repliesData =
    commentRepliesData &&
    commentRepliesData?.map((reply) => {
      return {
        commentId: reply.id,
        authorChannelId: reply.snippet.authorChannelId.value,
        authorProfile: reply.snippet.authorProfileImageUrl,
        authorName: reply.snippet.authorDisplayName,
        commentText: reply.snippet.textOriginal,
        commentLike: reply.snippet.likeCount,
      };
    });
  return (
    <div className="flex flex-col gap-2">
      {!isRepliesLoading && (
        <>
          <CommentBody {...props} />
          {isShowReplies ? (
            <div className="px-14">
              {repliesData.length > 0 &&
                repliesData?.map((item) => {
                  return <CommentBody {...item} />;
                })}
              <div
                className="text-blue-600 flex gap-1 items-center px-2 hover:underline cursor-pointer"
                onClick={() => setIsShowReplies(false)}
              >
                Hide
              </div>
            </div>
          ) : (
            <>
              {props.commentRepliesCount > 0 && (
                <div
                  className="text-blue-600 flex gap-1 items-center px-2 hover:underline cursor-pointer"
                  onClick={() => setIsShowReplies(true)}
                >
                  <span>
                    <MdKeyboardArrowDown />
                  </span>
                  <p>{props.commentRepliesCount} replies</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CommentCard;

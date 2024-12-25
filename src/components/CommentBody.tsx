import React from "react";
import { BiLike } from "react-icons/bi";

const CommentBody = () => {
  return (
    <div className="flex gap-2">
      <div className="bg-red-300 h-fit w-10 aspect-[1/1] rounded-full"></div>
      <div className="">
        <h1 className="text-md">channel name</h1>
        <h2 className="text-neutral-300 whitespace-pre-line">comment</h2>
        <div className="flex items-center gap-1 text-neutral-400">
          <BiLike className="cursor-pointer" />
          likecount
        </div>
      </div>
    </div>
  );
};

export default CommentBody;

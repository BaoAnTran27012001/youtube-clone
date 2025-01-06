export interface HomeVideoCard {
  id:string
  videoThumbnail:string
  videoDuaration:string
  videoTitle:string
  videoViews:string
  videoAge:string
  channelInfo:{
    id:string
    image?:string
    name:string
  }
}
export interface IVideoDetail{
  videoId:string|undefined,
  videoTitle:string|undefined,
  videoDescription:string|undefined,
  videoThumbnails:string|undefined,
  channelTitle:string|undefined,
  channelId:string|undefined,
  commentCount:string|undefined,
  likeCount:string|undefined,
  viewCount:string|undefined,
  publishedAt:string|undefined,
  duration:string|undefined,
  channelThumbnail:string|undefined,
  subcriberCount:string|undefined,
}
export interface IHomeChannelData {
  snippet: { thumbnails: { default: { url: string } } };
  statistics: { subscriberCount: string };
}
export interface IWatchPageData {
  snippet: {title:string ,description:string,channelTitle:string,channelId:string,publishedAt:string,thumbnails: { standard: { url: string } } };
  statistics: { commentCount: string ,likeCount:string,viewCount:string,contentDetails:{duration:string}};
}
export interface ICommentThread{ 
  commentId:string,
  authorChannelId:string,
  authorProfile:string,
  authorName:string,
  commentText:string,
  commentLike:string,
  commentRepliesCount?:number
}
export interface IChannelInfo{
  id:string,
  thumbnail:string,
  title:string,
  customUrl:string,
  subCount:string,
  description:string,
  videoCount:string
}
export interface IMiniCard {
  id?:string;
  contentDetails: { duration: string };
  snippet: {
    publishedAt: string;
    title: string;
    channelTitle: string;
    thumbnails: { 
      default: { url: string },
      standard?:{url:string}
   };
  };
  statistics: { viewCount: string };
}

export interface IChannelPlaylist{
  channelId?:string,
  id:string,
  title:string,
  thumbnail:string,
  videoCount:string,
}
export interface IPlaylisInfo{
  id:string,
  title:string,
  description:string,
  thumbnail:string,
}
export interface IPlaylistItem{
  id:string,
  title:string,
  thumbnail:string,
}

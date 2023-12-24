// import React from 'react'
// import { MdThumbDown } from 'react-icons/md'
// const WatchPageData = () => {
//   return (
//     <div>
//       watchpage data
//       <MdThumbDown />
//     </div>
//   )
// }

// export default WatchPageData







import React, { useEffect } from 'react'
import moment from 'moment'
import { formatViews } from '../utils/helper'
import { MdThumbUp, MdThumbDown } from 'react-icons/md'
import { YOUTUBE_VIDEO_DETAILS_API } from '../utils/constants'
import { useSearchParams } from 'react-router-dom'

const VideoMetaData = () => {
   const { channelTitle, description, title, publishedAt } = snippet
   const { viewCount, likeCount, dislikeCount } = statistics
const [searchParams] = useSearchParams()

   useEffect(() => {
       (async function getVideoDetails(){
           try{
            const data = await fetch(YOUTUBE_VIDEO_DETAILS_API + searchParams.get("v") + "&key=" + process.env.REACT_APP_API_KEY);
           const json = await data.json();
           console.log(json);
        }catch(error){
            console.log(error);
        }
        })()
    }, [])

        return (
      <div className='py-2 videoMetaData'>
         <div className='videoMetaData__top'>
            <h5>{title}</h5>
            <div className='py-1 d-flex justify-content-between align-items-center'>
               <span>
                  {formatViews(viewCount)} Views •{' '}
                  {moment(publishedAt).fromNow()}
               </span>

               <div>
                  <span className='mr-3'>
                     <MdThumbUp size={26} /> {formatViews(likeCount)}
                  </span>
                  <span className='mr-3'>
                     <MdThumbDown size={26} />{' '}
                     {formatViews(dislikeCount)}
                  </span>
               </div>
            </div>
         </div>
         <div className='py-3 my-2 videoMetaData__channel d-flex justify-content-between align-items-center'>
            <div className='d-flex'>
               <img
                  src={channelSnippet?.thumbnails?.default?.url}
                  alt=''
                  className='mr-3 rounded-circle'
               />
               <div className='d-flex flex-column'>
                  <span>{channelTitle}</span>
                  <span>
                     {' '}
                     {formatViews(channelStatistics?.subscriberCount)}{' '}
                     Subscribers
                  </span>
               </div>
            </div>

            <button
               className={`p-2 m-2 border-0 btn ${
                  subscriptionStatus && 'btn-gray'
               }`}>
               {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
            </button>
         </div>
         <div className='videoMetaData__description'>
            <ShowMoreText
               lines={3}
               more='SHOW MORE'
               less='SHOW LESS'
               anchorClass='showMoreText'
               expanded={false}>
               {description}
            </ShowMoreText>
         </div>
      </div>
   )
}

export default VideoMetaData
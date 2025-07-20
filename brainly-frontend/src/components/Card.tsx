import { FileIcon } from './icons/FileIcon'
import { ShareIcon } from './icons/ShareIcon'
import { Trash } from './icons/Trash'

interface CardProps {
   type: string
   link: string
   title: string
}

export const Card = ({ type, link, title }: CardProps) => {
   return (
      <div className="bg-white rounded-md  border-gray-200 max-w-72  py-2 px-4 m-20 border h-auto">
         <div className="flex justify-between">
            <div className="flex gap-2 items-center">
               <FileIcon />
               <span className="font-semibold text-base">{title}</span>
            </div>
            <div className="flex gap-2 items-center">
               <ShareIcon size="size-5" color="#374151" />
               <Trash size="size-5" color="#374151" />
            </div>
         </div>

         <div className="mt-5">
            {type === 'youtube' && (
               <iframe
                  className="w-full"
                  src={link}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
               ></iframe>
            )}
            {type === 'tweet' && (
               <blockquote className="twitter-tweet w-full">
                  <a href={link}></a>
               </blockquote>
            )}
         </div>
      </div>
   )
}

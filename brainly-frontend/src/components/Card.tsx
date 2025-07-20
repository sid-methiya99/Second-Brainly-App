import { FileIcon } from './icons/FileIcon'
import { ShareIcon } from './icons/ShareIcon'
import { Trash } from './icons/Trash'

export const Card = () => {
   return (
      <div className="bg-white rounded-md  border-gray-200 max-w-72  py-2 px-4 m-20 border h-auto">
         <div className="flex justify-between">
            <div className="flex gap-2 items-center">
               <FileIcon />
               <span className="font-semibold text-base">Project Ideas</span>
            </div>
            <div className="flex gap-2 items-center">
               <ShareIcon size="size-5" color="#374151" />
               <Trash size="size-5" color="#374151" />
            </div>
         </div>
         {/* <iframe */}
         {/*    className="w-full pt-4" */}
         {/*    src="https://www.youtube.com/embed/O-QS_Cp_zXg?si=9g81NoxfUHkb_EmD" */}
         {/*    title="YouTube video player" */}
         {/*    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" */}
         {/*    referrerPolicy="strict-origin-when-cross-origin" */}
         {/*    allowFullScreen */}
         {/* ></iframe> */}
         <div className="mt-5">
            <blockquote className="twitter-tweet w-full h-fit">
               <a href="https://twitter.com/sriniously/status/1946827845042577589"></a>
            </blockquote>
         </div>
      </div>
   )
}

import { useEffect } from 'react'
import { type CardProps } from '../components/Card'
import { useBrainContext } from '../components/hooks/useBrainContext'
import { useParams } from 'react-router-dom'
import { ShareCard } from '../components/ShareCard'
export const Share = () => {
   const { hash } = useParams()
   const { brainContents, res, username } = useBrainContext(hash!)

   useEffect(() => {
      res()
   }, [])
   return (
      <div className="pt-10">
         <div className="w-full">
            <div className="mx-10 ">
               <div className="flex justify-between ">
                  <div className="flex justify-center items-center">
                     <h1 className="mx-10 font-bold text-3xl">{username}</h1>
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-3 px-10">
               {brainContents?.map(
                  ({ _id, link, type, title, tags, date }: CardProps) => (
                     <ShareCard
                        _id={_id}
                        type={type}
                        link={link}
                        title={title}
                        tags={tags}
                        date={date}
                     />
                  )
               )}
            </div>
         </div>
      </div>
   )
}

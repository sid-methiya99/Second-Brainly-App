import { useEffect } from 'react'
import { Card, type CardProps } from '../components/Card'
import { useContent } from '../components/hooks/useContent'
export const Share = () => {
   const { contents, res, onDelete } = useContent()

   useEffect(() => {
      res()
   }, [])
   return (
      <div className="pt-10">
         <div className="w-full">
            <div className="mx-10 ">
               <div className="flex justify-between ">
                  <div className="flex justify-center items-center">
                     <h1 className="mx-10 font-bold text-3xl">All Notes</h1>
                  </div>
               </div>
            </div>
            {/* Card Component */}
            <div className="grid grid-cols-3 px-10">
               {contents?.map(
                  ({ _id, link, type, title, tags, date }: CardProps) => (
                     <Card
                        _id={_id}
                        type={type}
                        link={link}
                        title={title}
                        tags={tags}
                        date={date}
                        onDelete={onDelete}
                     />
                  )
               )}
            </div>
         </div>
      </div>
   )
}

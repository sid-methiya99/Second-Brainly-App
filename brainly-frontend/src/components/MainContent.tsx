import { useEffect, useState } from 'react'
import { Button } from './Button'
import { CreateContentModal } from './CreateContentModal'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'
import { Card, type CardProps } from './Card'
import { useContent } from './hooks/useContent'
import { useNavigate } from 'react-router-dom'

export const MainContent = () => {
   const [modalOpen, setModelOpen] = useState(false)
   const { contents, res } = useContent()
   const navigate = useNavigate()

   const handleLogout = () => {
      navigate('/')
      localStorage.clear()
   }

   useEffect(() => {
      res()
   }, [modalOpen])
   return (
      <div className="bg-[#F9FBFC]">
         <CreateContentModal
            open={modalOpen}
            onClose={() => {
               setModelOpen(false)
            }}
         />
         <div className=" w-full  h-fit">
            <div className="mt-8 mx-10 ">
               <div className="flex justify-between ">
                  <div className="flex justify-center items-center">
                     <h1 className="font-bold text-3xl">All Notes</h1>
                  </div>
                  <div className="flex gap-3">
                     <Button
                        variant="secondary"
                        text="Share Brain"
                        startIcon={
                           <ShareIcon size="size-5" color="currentColor" />
                        }
                     />
                     <Button
                        variant="primary"
                        text="Add Content"
                        startIcon={<PlusIcon />}
                        onClick={() => {
                           setModelOpen(true)
                        }}
                     />
                     <Button
                        variant="danger"
                        text="Logout"
                        onClick={handleLogout}
                     />
                  </div>
               </div>
            </div>
            {/* Card Component */}
            <div className="grid grid-cols-3 px-10">
               {contents?.map(
                  ({ link, type, title, tags, date }: CardProps) => (
                     <Card
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

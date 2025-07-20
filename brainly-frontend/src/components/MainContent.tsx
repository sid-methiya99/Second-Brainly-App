import { useState } from 'react'
import { Button } from './Button'
import { CreateContentModal } from './CreateContentModal'
import { PlusIcon } from './icons/PlusIcon'
import { ShareIcon } from './icons/ShareIcon'

export const MainContent = () => {
   const [modalOpen, setModelOpen] = useState(false)
   return (
      <div>
         <CreateContentModal
            open={modalOpen}
            onClose={() => {
               setModelOpen(false)
            }}
         />
         <div className=" w-full bg-[#F9FBFC] h-screen ">
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
                  </div>
               </div>
            </div>

            {/* Card Component */}
            <div></div>
         </div>
      </div>
   )
}

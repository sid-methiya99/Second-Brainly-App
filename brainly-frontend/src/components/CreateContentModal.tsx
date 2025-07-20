import { useState } from 'react'
import { Button } from './Button'
import { CrossIcon } from './icons/CrossIcon'
import { Input } from './Input'

interface ModalTypes {
   open: boolean
   onClose?: () => void
}
export const CreateContentModal = ({ open, onClose }: ModalTypes) => {
   const tags: string[] = [
      'Productivity',
      'Tech & Tools',
      'Mindset',
      'Learning & Skills',
      'Workflows',
      'Inspiration',
   ]
   const category: string[] = ['Youtube', 'Twitter', 'Notion']
   const [selectedTag, setSelectedTag] = useState('Productivity')
   const [selectedCategory, setSelectedCategory] = useState('Youtube')
   return (
      <div>
         {open && (
            <div className="w-screen h-screen fixed top-0 left-0 bg-slate-500 opacity-60 flex justify-center items-center">
               <div className="bg-white w-96 py-2 rounded-xl shadow-md">
                  <div className="relative flex items-center justify-end h-12">
                     <h1 className="absolute left-1/2 -translate-x-1/2 text-blue-600 text-xl font-bold">
                        Add Content
                     </h1>
                     <div className="mr-3 cursor-pointer" onClick={onClose}>
                        <CrossIcon />
                     </div>
                  </div>
                  <form className="flex items-center justify-center mt-5 w-full ">
                     <div className="flex flex-col gap-2 items-center">
                        <div className="flex flex-col">
                           <label className="text-base text-blue-600 font-semibold mb-2">
                              Title:
                           </label>
                           <Input type="text" placeholder="Enter title" />
                        </div>
                        <div className="flex flex-col">
                           <label className="text-base text-blue-600 font-semibold mb-2">
                              Link:
                           </label>
                           <Input type="text" placeholder="Enter Link" />
                        </div>
                        <div className="text-center space-y-2 mt-1">
                           <p className="font-semibold">Choose Tag:</p>
                           <div className="flex flex-wrap justify-center gap-2">
                              {tags.map((tag) => (
                                 <button
                                    key={tag}
                                    onClick={() => setSelectedTag(tag)}
                                    className={`px-3 py-1 rounded-full transition font-medium
                                        ${
                                           selectedTag === tag
                                              ? 'bg-blue-700 text-white'
                                              : 'bg-blue-300 text-black hover:bg-blue-400'
                                        }`}
                                 >
                                    {tag}
                                 </button>
                              ))}
                           </div>
                        </div>

                        <div className="text-center space-y-2 my-1">
                           <p className="font-semibold">Choose Category:</p>
                           <div className="flex flex-wrap justify-center gap-2">
                              {category.map((category) => (
                                 <button
                                    key={category}
                                    onClick={() =>
                                       setSelectedCategory(category)
                                    }
                                    className={`px-3 py-1 rounded-full transition font-medium
                                        ${
                                           selectedCategory === category
                                              ? 'bg-blue-700 text-white'
                                              : 'bg-blue-300 text-black hover:bg-blue-400'
                                        }`}
                                 >
                                    {category}
                                 </button>
                              ))}
                           </div>
                        </div>
                        <div className="flex justify-center items-center">
                           <Button variant="primary" text="Submit" />
                        </div>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </div>
   )
}
